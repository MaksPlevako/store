'use client'

import React, { useState } from 'react'

export default function ChangeAddress({
	email,
	addressId,
	address,
	street,
	index,
	city,
	apartment_num,
	department_number,
	type,
}) {
	const [changeModal, setChangeModal] = useState(false)

	const handleDelete = async e => {
		e.preventDefault()

		const response = await fetch(
			`/api/user/address?addressId=${addressId}&email=${email}`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)

		if (response.ok) {
			alert('Адрес успешно удален')
		} else {
			alert('Не удалось удалить адрес')
		}
	}

	return (
		<div className='absolute top-3 right-3 flex flex-row gap-2'>
			<button onClick={() => setChangeModal(true)}>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='currentColor'
					className='size-6 hover:text-[#6B59CC] transit ease-in-out duration-200'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125'
					/>
				</svg>
			</button>
			{changeModal && (
				<div className='fixed top-0 left-0 w-full h-screen bg-[#1B1D1F] bg-opacity-20 z-50'>
					<div className='absolute border rounded bg-white opacity-100 p-5 top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 w-2/5'>
						<div className='flex flex-row justify-between items-center text-[20px] font-semibold mb-5'>
							Змінити адресу
							<button onClick={() => setChangeModal(false)}>
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
						<form
							method='POST'
							action={'http://localhost:3000/api/user/changeAddress'}
						>
							{type === 'Дім' && (
								<div className='flex flex-col gap-5'>
									<input
										type='hidden'
										name='addressId'
										defaultValue={addressId}
									/>
									<input type='hidden' name='type' defaultValue={type} />
									<input type='hidden' name='email' defaultValue={email} />
									<div className='relative w-full'>
										<label className='absolute text-sm text-[#55556D] -top-2.5 left-3 z-10 scale-90 bg-white'>
											Місто
										</label>
										<input
											type='text'
											name='city'
											placeholder='Київ'
											defaultValue={city}
											className='border border-[#55556D] rounded py-3 px-5 w-full'
											required
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
											defaultValue={address}
											className='border border-[#55556D] rounded py-3 px-5 w-full'
											required
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
											defaultValue={street}
											className='border border-[#55556D] rounded py-3 px-5 w-full'
											required
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
											defaultValue={apartment_num}
											className='border border-[#55556D] rounded py-3 px-5 w-full'
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
											defaultValue={index}
											className='border border-[#55556D] rounded py-3 px-5 w-full'
											required
										/>
									</div>
								</div>
							)}
							{type === 'Нова пошта' && (
								<div className='flex flex-col gap-5'>
									<input
										type='hidden'
										name='addressId'
										defaultValue={addressId}
									/>
									<input type='hidden' name='type' defaultValue={type} />
									<input type='hidden' name='email' defaultValue={email} />
									<div className='relative w-full'>
										<label className='absolute text-sm text-[#55556D] -top-2.5 left-3 z-10 scale-90 bg-white'>
											Місто
										</label>
										<input
											type='text'
											name='city'
											placeholder='Київ'
											defaultValue={city}
											className='border border-[#55556D] rounded py-3 px-5 w-full'
											required
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
											defaultValue={address}
											className='border border-[#55556D] rounded py-3 px-5 w-full'
											required
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
											defaultValue={street}
											className='border border-[#55556D] rounded py-3 px-5 w-full'
											required
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
											defaultValue={department_number}
											className='border border-[#55556D] rounded py-3 px-5 w-full'
											required
										/>
									</div>
								</div>
							)}
							<button
								type='submit'
								className='border rounded-lg border-[#6B59CC] bg-[#6B59CC] px-5 py-3 text-white w-full mt-5 hover:bg-white hover:text-black transition ease-in-out duration-300'
							>
								Зберегти зміни
							</button>
						</form>
					</div>
				</div>
			)}

			<form onSubmit={handleDelete}>
				<button type='submit'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='size-6 hover:text-[#F11A22] transit ease-in-out duration-200'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
						/>
					</svg>
				</button>
			</form>
		</div>
	)
}
