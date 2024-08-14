'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import Link from 'next/link'

export default function Auth() {
	const [error, setError] = useState('')

	const handleGoogleSignIn = async () => {
		try {
			await signIn('google', { callbackUrl: '/profile/personal-info' })
		} catch (error) {
			setError('Ошибка при входе с Google')
		}
	}

	const handleCredentialsSignIn = async event => {
		event.preventDefault()
		const formData = new FormData(event.target)
		const email = formData.get('email')
		const password = formData.get('password')

		const result = await signIn('credentials', {
			redirect: false,
			email,
			password,
		})

		if (result.error) {
			setError(result.error)
		} else {
			window.location.href = '/profile/personal-info'
		}
	}

	return (
		<section className='my-[60px]'>
			<div className='w-1/2 mx-auto border border-[#E3E3E8] rounded-2xl py-5 px-12 shadow-2xl'>
				<div className='text-2xl font-medium text-center'>Вхід</div>
				<div className='w-full border border-[#DEDEE2] mt-5 mb-7' />
				<div className='flex flex-row justify-around'>
					<button
						className='border py-3 px-5 rounded-xl bg-blue-700 text-white'
						onClick={handleGoogleSignIn}
					>
						Google
					</button>
					<button className='border py-3 px-5 rounded-xl bg-blue-700 text-white'>
						Facebook
					</button>
					<button className='border py-3 px-5 rounded-xl bg-blue-700 text-white'>
						GitHub
					</button>
				</div>
				<div className='w-full border border-[#DEDEE2] my-7' />
				<div className='mt-8'>
					<form
						onSubmit={handleCredentialsSignIn}
						className='flex flex-col gap-5'
					>
						{error && (
							<div className='text-red-500 text-center mb-4'>{error}</div>
						)}
						<div className='relative w-full'>
							<input
								type='email'
								name='email'
								placeholder='Електронна почта'
								className='border border-[#55556D] py-[13px] px-5 rounded w-full'
								required
							/>
							<span className='absolute top-1 right-2 text-rose-500 text-2xl'>
								*
							</span>
						</div>
						<div className='relative w-full'>
							<input
								type='password'
								name='password'
								placeholder='Пароль'
								className='border border-[#55556D] py-[13px] px-5 rounded w-full'
								required
							/>
							<span className='absolute top-1 right-2 text-rose-500 text-2xl'>
								*
							</span>
						</div>
						<button
							type='submit'
							className='border rounded bg-[#6B59CC] text-center text-white py-3 font-medium text-[18px]'
						>
							Вхід
						</button>
					</form>
				</div>
				<div className='w-full border border-[#DEDEE2] mt-8 mb-5' />
				<div className='flex flex-row justify-between'>
					<div>
						Не маєте акаунту?
						<Link
							href='/registration'
							className='text-[#6B59CC] hover:underline'
						>
							Реєстрація
						</Link>
					</div>
					<div>
						<Link href='/' className='text-[#6B59CC] hover:underline'>
							Забули пароль?
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}
