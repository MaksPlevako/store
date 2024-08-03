'use client'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import SignOut from './SignOut'

export default function Person() {
	const { data: session } = useSession()

	return (
		<>
			{session ? (
				<div className='flex flex-row gap-2 items-center'>
					<Image src='/img/people.svg' width={20} height={20} alt='people' />
					<div>
						<Link href='/profile/personal-info'>Профіль</Link>
						<span className='mx-2'>/</span> <SignOut />
					</div>
				</div>
			) : (
				<div className='flex flex-row gap-2 items-center'>
					<Image src='/img/people.svg' width={20} height={20} alt='people' />
					<div>
						<Link href='/login' className='mr-2'>
							Вхід
						</Link>
						/
						<Link href='/registration' className='ml-2'>
							Реєстрація
						</Link>
					</div>
				</div>
			)}
		</>
	)
}
