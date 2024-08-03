import Google from 'next-auth/providers/google'

import Credentials from 'next-auth/providers/credentials'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import clientPromise from '@/lib/mongodb'
import NextAuth from 'next-auth'
const bcrypt = require('bcryptjs')

export const { handlers, signIn, signOut, auth } = NextAuth({
	debug: true,
	adapter: MongoDBAdapter(clientPromise),
	providers: [
		Google,
		Credentials({
			credentials: {
				email: {},
				password: {},
			},
			async authorize(credentials) {
				const client = await clientPromise
				const db = client.db('store')
				const user = await db
					.collection('users')
					.findOne({ email: credentials.email })

				if (user && bcrypt.compare(credentials.password, user.password)) {
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
		async signIn({ user, account, profile }) {
			if (account.provider === 'google') {
				const client = await clientPromise
				const db = client.db('store')

				const existingUser = await db
					.collection('users')
					.findOne({ email: user.email })

				if (!existingUser) {
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
	},
})
