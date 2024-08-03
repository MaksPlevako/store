'use client'

import { signOut } from 'next-auth/react'

export default function SignOut() {
	return (
		<button
			className='text-[#F11A22]'
			onClick={() => signOut({ callbackUrl: '/' })}
		>
			Вихід
		</button>
	)
}
