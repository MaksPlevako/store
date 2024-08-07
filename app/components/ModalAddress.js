'use client'

import React, { useState } from 'react'

export default function ModalAddress({ changeModal, email }) {
	const [type, setType] = useState('Дім')
	const [formData, setFormData] = useState({
		city: '',
		address: '',
		street: '',
		apartment_num: '',
		index: '',
		department_number: '',
		addressId: '',
	})

	const handleChange = e => {
		const { name, value } = e.target
		setFormData(prevData => ({ ...prevData, [name]: value }))
	}

	const handleSubmit = async e => {
		e.preventDefault()

		const response = await fetch(`/api/user/address`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ ...formData, type, email }),
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
					Добавити нову адресу
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
					<div className='flex flex-row justify-around text-white'>
						<button
							type='button'
							name='type'
							value='Дім'
							className={`border rounded py-3 px-5 ${
								type === 'Дім' ? 'bg-[#6B59CC]' : 'bg-gray-300'
							}`}
							onClick={() => setType('Дім')}
						>
							Дім
						</button>
						<button
							type='button'
							name='type'
							value='Нова пошта'
							className={`border rounded py-3 px-5 ${
								type === 'Нова пошта' ? 'bg-[#6B59CC]' : 'bg-gray-300'
							}`}
							onClick={() => setType('Нова пошта')}
						>
							Нова пошта
						</button>
					</div>
					<div className='border border-gray-400 w-full my-5' />
					{type === 'Дім' && (
						<div className='flex flex-col gap-5'>
							<div className='relative w-full'>
								<label className='absolute text-sm text-[#55556D] -top-2.5 left-3 z-10 scale-90 bg-white'>
									Місто
								</label>
								<input
									type='text'
									name='city'
									placeholder='Київ'
									className='border border-[#55556D] rounded py-3 px-5 w-full'
									required
									value={formData.city}
									onChange={handleChange}
								/>
							</div>
							<div className='relative w-full'>
								<label className='absolute text-sm text-[#55556D] -top-2.5 left-3 z-10 scale-90 bg-white'>
									Вулиця
								</label>
								<input
									type='text'
									name='address'
									placeholder='Волинська'
									className='border border-[#55556D] rounded py-3 px-5 w-full'
									required
									value={formData.address}
									onChange={handleChange}
								/>
							</div>
							<div className='relative w-full'>
								<label className='absolute text-sm text-[#55556D] -top-2.5 left-3 z-10 scale-90 bg-white'>
									Номер вулиці
								</label>
								<input
									type='text'
									name='street'
									placeholder='6'
									className='border border-[#55556D] rounded py-3 px-5 w-full'
									required
									value={formData.street}
									onChange={handleChange}
								/>
							</div>
							<div className='relative w-full'>
								<label className='absolute text-sm text-[#55556D] -top-2.5 left-3 z-10 scale-90 bg-white'>
									Номер квартири
								</label>
								<input
									type='text'
									name='apartment_num'
									placeholder='48'
									className='border border-[#55556D] rounded py-3 px-5 w-full'
									value={formData.apartment_num}
									onChange={handleChange}
								/>
							</div>
							<div className='relative w-full'>
								<label className='absolute text-sm text-[#55556D] -top-2.5 left-3 z-10 scale-90 bg-white'>
									Індекс
								</label>
								<input
									type='text'
									name='index'
									placeholder='01001'
									className='border border-[#55556D] rounded py-3 px-5 w-full'
									required
									value={formData.index}
									onChange={handleChange}
								/>
							</div>
						</div>
					)}
					{type === 'Нова пошта' && (
						<div className='flex flex-col gap-5'>
							<div className='relative w-full'>
								<label className='absolute text-sm text-[#55556D] -top-2.5 left-3 z-10 scale-90 bg-white'>
									Місто
								</label>
								<input
									type='text'
									name='city'
									placeholder='Київ'
									className='border border-[#55556D] rounded py-3 px-5 w-full'
									required
									value={formData.city}
									onChange={handleChange}
								/>
							</div>
							<div className='relative w-full'>
								<label className='absolute text-sm text-[#55556D] -top-2.5 left-3 z-10 scale-90 bg-white'>
									Вулиця
								</label>
								<input
									type='text'
									name='address'
									placeholder='Чоколівський бульвар'
									className='border border-[#55556D] rounded py-3 px-5 w-full'
									required
									value={formData.address}
									onChange={handleChange}
								/>
							</div>
							<div className='relative w-full'>
								<label className='absolute text-sm text-[#55556D] -top-2.5 left-3 z-10 scale-90 bg-white'>
									Номер вулиці
								</label>
								<input
									type='text'
									name='street'
									placeholder='37'
									className='border border-[#55556D] rounded py-3 px-5 w-full'
									required
									value={formData.street}
									onChange={handleChange}
								/>
							</div>
							<div className='relative w-full'>
								<label className='absolute text-sm text-[#55556D] -top-2.5 left-3 z-10 scale-90 bg-white'>
									Відділення
								</label>
								<input
									type='text'
									name='department_number'
									placeholder='248'
									className='border border-[#55556D] rounded py-3 px-5 w-full'
									required
									value={formData.department_number}
									onChange={handleChange}
								/>
							</div>
						</div>
					)}
					<button
						type='submit'
						className='border rounded w-full py-3 text-[18px] font-medium bg-[#6B59CC] border-[#6B59CC] mt-5 text-white hover:text-black hover:bg-white transition ease-in-out duration-300'
					>
						Добавити адресу
					</button>
				</form>
			</div>
		</div>
	)
}
