import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Rating } from '@mui/material'

export default function ModalFeedback({
	_id,
	changeModal,
	session,
	product_type,
}) {
	const [value, setValue] = useState(0)
	const [formData, setFormData] = useState({
		product_id: _id,
		product_type: product_type,
		user_id: null,
		rating: value,
		comment: '',
	})

	useEffect(() => {
		if (session) {
			const fetchData = async () => {
				try {
					const response = await fetch(
						`http://localhost:3000/api/user/user?email=${session.user.email}`
					)
					if (!response.ok) {
						throw new Error('Ошибка запроса: ' + response.statusText)
					}
					const result = await response.json()
					setFormData(prevFormData => ({
						...prevFormData,
						user_id: result._id,
					}))
				} catch (error) {
					console.error(error)
				}
			}

			fetchData()
		}
	}, [session])

	const handleRatingChange = (event, newValue) => {
		setFormData(prevData => ({
			...prevData,
			rating: newValue,
		}))
	}

	const handleChange = e => {
		const { name, value } = e.target
		setFormData(prevData => ({
			...prevData,
			[name]: value,
		}))
	}

	const handleSubmit = async e => {
		e.preventDefault()

		const response = await fetch('/api/comments', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
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
		<div className='fixed top-0 left-0 w-full h-screen bg-gray-400 bg-opacity-10 z-50'>
			<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border rounded w-2/5 bg-white p-5 shadow-2xl'>
				<div className='flex flex-row justify-between items-center'>
					<div className='text-2xl font-medium'>
						Поставте оцінку цьому товару
					</div>
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
				{session ? (
					<div>
						<Rating
							name='rating'
							size='large'
							value={formData.rating}
							precision={0.5}
							onChange={handleRatingChange}
						/>
						<form onSubmit={handleSubmit}>
							<div className='mb-3 text-lg font-medium'>Коментар</div>
							<textarea
								name='comment'
								rows={10}
								placeholder='Good'
								autoFocus
								className='w-full'
								onChange={handleChange}
								required
							/>
							<button
								type='submit'
								className='border rounded w-full py-3 text-2xl font-medium bg-[#6B59CC] border-[#6B59CC] mt-5 text-white hover:text-black hover:bg-white transition ease-in-out duration-300'
							>
								Відправити
							</button>
						</form>
					</div>
				) : (
					<div className='text-center mt-5 w-full'>
						<div className='text-2xl font-medium mb-5'>
							Щоб залишити оцінку та коментар потрібно ввійти в свій профіль
						</div>
						<Link
							href='/login'
							className='border rounded px-5 py-3 text-2xl font-medium bg-[#6B59CC] border-[#6B59CC] mt-5 text-white hover:text-black hover:bg-white transition ease-in-out duration-300'
						>
							Вхід
						</Link>
					</div>
				)}
			</div>
		</div>
	)
}
