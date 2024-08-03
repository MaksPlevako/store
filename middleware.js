import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req) {
	const token = await getToken({ req, secret: process.env.AUTH_SECRET })

	if (!token) {
		return NextResponse.redirect(new URL('/login', req.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/profile', '/profile/:path*'], // Настройте маршруты, которые должны быть защищены
}
