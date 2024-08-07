'use client'

import React, { useState } from 'react'

export default function ModalPayment({ email, changeModal }) {
	const [formData, setFormData] = useState({
		card_name: '',
		card_num: '',
	})

	const handleChange = e => {
		const { name, value } = e.target
		setFormData(prevData => ({ ...prevData, [name]: value }))
	}

	const handleSubmit = async e => {
		e.preventDefault()

		const response = await fetch(`/api/user/payment`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ ...formData, email }),
		})

		const result = await response.json()
		if (response.ok) {
			alert(result.message)
			changeModal()
		} else {
			alert(result.error)
		}
	}

	return (
		<div className='fixed top-0 left-0 h-screen w-full bg-[#1B1D1F] bg-opacity-20'>
			<div className='border rounded bg-white absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 px-7 py-6 w-[450px]'>
				<div className='flex flex-row justify-between items-center text-[20px] font-semibold mb-5'>
					Добавити нову карту
					<button onClick={changeModal}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='size-7 hover:animate-spin'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
							/>
						</svg>
					</button>
				</div>
				<form onSubmit={handleSubmit}>
					<div className='flex flex-col gap-5'>
						<div className='relative w-full'>
							<label className='absolute text-sm text-[#55556D] -top-2.5 left-3 z-10 scale-90 bg-white'>
								Назва
							</label>
							<input
								type='text'
								name='card_name'
								placeholder='MonoBank'
								className='border border-[#55556D] rounded py-3 px-5 w-full'
								required
								value={formData.name}
								onChange={handleChange}
							/>
						</div>
						<div className='relative w-full'>
							<label className='absolute text-sm text-[#55556D] -top-2.5 left-3 z-10 scale-90 bg-white'>
								Номер карти
							</label>
							<input
								type='text'
								name='card_num'
								placeholder='111111111111'
								className='border border-[#55556D] rounded py-3 px-5 w-full'
								required
								value={formData.card_num}
								onChange={handleChange}
							/>
						</div>
					</div>
					<button
						type='submit'
						className='border rounded w-full py-3 text-[18px] font-medium bg-[#6B59CC] border-[#6B59CC] mt-5 text-white hover:text-black hover:bg-white transition ease-in-out duration-300'
					>
						Добавити карту
					</button>
				</form>
			</div>
		</div>
	)
}
