import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '@/lib/mongodb'
import NextAuth from 'next-auth'
const bcrypt = require('bcryptjs')

export default NextAuth({
	adapter: MongoDBAdapter(clientPromise),
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
				const client = await clientPromise
				const db = client.db('store')
				const user = await db
					.collection('users')
					.findOne({ email: credentials.email })

				if (user && bcrypt.compareSync(credentials.password, user.password)) {
					return user
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
			const client = await clientPromise
			const db = client.db('store')

			if (account.provider === 'google') {
				const existingUser = await db
					.collection('users')
					.findOne({ email: user.email })

				if (existingUser) {
					await db.collection('accounts').updateOne(
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
					await db.collection('users').insertOne({
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
