import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

import User from '@/models/User'
import Account from '@/models/Account'
import connectToDatabase from '@/lib/mongoose'
import bcrypt from 'bcryptjs'

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET,
		}),
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				await connectToDatabase()
				const user = await User.findOne({ email: credentials.email }).exec()

				if (user && bcrypt.compareSync(credentials.password, user.password)) {
					return { id: user._id.toString(), ...user._doc }
				} else {
					throw new Error('Invalid credentials')
				}
			},
		}),
	],
	pages: {
		signIn: '/login',
	},
	secret: process.env.AUTH_SECRET,
	session: {
		strategy: 'jwt',
		maxAge: 24 * 60 * 60,
	},
	callbacks: {
		async signIn({ user, account }) {
			await connectToDatabase()

			if (account.provider === 'google') {
				const existingUser = await User.findOne({ email: user.email }).exec()

				if (existingUser) {
					await Account.updateOne(
						{ userId: existingUser._id },
						{
							$set: {
								providerAccountId: account.providerAccountId,
								provider: account.provider,
							},
						},
						{ upsert: true }
					)
				} else {
					await User.create({
						name: user.name,
						email: user.email,
						image: user.image,
						createdAt: new Date(),
					})
				}
			}
			return true
		},
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id
			}
			return token
		},
		async session({ session, token }) {
			session.user.id = token.id
			return session
		},
	},
})
