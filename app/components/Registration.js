'use client'

import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'

export default function Registration() {
	const [modal, setModal] = useState(null)

	const handleSubmit = async event => {
		event.preventDefault()

		const data = {
			name: event.target.name.value,
			phone: event.target.phone.value,
			email: event.target.email.value,
			password: event.target.password.value,
		}

		const JSONdata = JSON.stringify(data)

		const response = await fetch('/api/registration', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSONdata,
		})

		if (response.status === 201) {
			setModal('success') // Успешный ответ
		} else if (response.status === 409) {
			setModal('exists') // Пользователь уже существует
		}
	}

	const closeModal = () => {
		setModal(null) // Закрыть модальное окно
	}

	return (
		<section className='my-[60px] relative'>
			<div className='w-1/2 mx-auto border border-[#E3E3E8] rounded-2xl py-5 px-12 shadow-2xl'>
				<div className='text-2xl font-medium text-center'>Реєстрація</div>
				<div className='w-full border border-[#DEDEE2] mt-5 mb-7' />
				<div className='flex flex-row justify-around'>
					<button className='border py-3 px-5 rounded-xl bg-[#6B59CC] text-white'>
						Google
					</button>
					<button className='border py-3 px-5 rounded-xl bg-[#6B59CC] text-white'>
						Facebook
					</button>
					<button className='border py-3 px-5 rounded-xl bg-[#6B59CC] text-white'>
						GitHub
					</button>
				</div>
				<div className='w-full border border-[#DEDEE2] my-7' />
				<div className='mt-8'>
					<form className='flex flex-col gap-5' onSubmit={handleSubmit}>
						<div className='relative w-full'>
							<input
								type='text'
								name='name'
								placeholder="Ім'я"
								className='border border-[#55556D] py-[13px] px-5 rounded w-full'
								required
							/>
							<span className='absolute top-1 right-2 text-rose-500 text-2xl'>
								*
							</span>
						</div>
						<div className='relative w-full'>
							<input
								type='tel'
								name='phone'
								placeholder='Телефон'
								className='border border-[#55556D] py-[13px] px-5 rounded w-full'
								required
							/>
							<span className='absolute top-1 right-2 text-rose-500 text-2xl'>
								*
							</span>
						</div>
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
							Зареєструватися
						</button>
					</form>
				</div>
				<div className='w-full border border-[#DEDEE2] mt-8 mb-5' />
				<div className='w-full text-center mx-auto '>
					Маєте акаунт?
					<Link href='/login' className='text-[#6B59CC] hover:underline ml-2'>
						Вхід
					</Link>
				</div>
			</div>
			{modal === 'success' && (
				<Modal>
					<div className='flex flex-row justify-around items-center my-5 mx-auto'>
						<Image
							src='/img/success.png'
							alt='success'
							width={100}
							height={100}
						/>
						<div className='text-2xl '>Реєстрація успішна!</div>
						<Link
							href='/login'
							className='text-2xl border rounded bg-[#6B59CC] py-3 px-6 text-white'
						>
							Вхід
						</Link>
					</div>
					<button
						onClick={() => setModal(null)}
						className='absolute top-2 right-2'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='size-10'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M6 18 18 6M6 6l12 12'
							/>
						</svg>
					</button>
				</Modal>
			)}

			{modal === 'exists' && (
				<Modal>
					<div className='flex flex-row justify-around items-center my-5'>
						<Image src='/img/error.png' alt='error' width={100} height={100} />
						<div className='text-2xl'>
							Користувач із цією електронною адресою вже існує.
						</div>
					</div>
					<div className='flex flex-row justify-around item-center'>
						<div className=''>
							Маєте акаунт?
							<Link href='/login' className='text-blue-500 underline ml-2'>
								Вхід
							</Link>
						</div>
						<div>
							<div className=''>
								Забули пароль?
								<Link href='/login' className='text-blue-500 underline ml-2'>
									Відновити
								</Link>
							</div>
						</div>
					</div>
					<button
						onClick={() => setModal(null)}
						className='absolute top-3 right-3'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='size-10 '
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M6 18 18 6M6 6l12 12'
							/>
						</svg>
					</button>
				</Modal>
			)}
		</section>
	)
}

function Modal({ children }) {
	return (
		<div className='absolute top-0 left-0 w-full h-screen'>
			<div className='shadow-2xl top-1/4 left-1/2 -translate-x-1/2 w-2/3 border bg-slate-50 rounded-xl py-5 px-5 relative'>
				{children}
			</div>
		</div>
	)
}
