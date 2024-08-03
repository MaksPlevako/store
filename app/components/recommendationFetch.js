'use client'

import React, { useEffect, useState } from 'react'
import { Rating } from '@mui/material'
import FetchDetails from './fetchDetails'
import { AiOutlineLoading } from 'react-icons/ai'

export default function RecommendationFetch() {
	const [details, setDetails] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await FetchDetails()
				setDetails(data)
			} catch (err) {
				console.error('err', err)
			}
		}

		fetchData()
	}, [])

	if (details.length === 0) {
		return (
			<div className='flex flex-row gap-5 text-4xl'>
				<AiOutlineLoading className='animate-spin w-7 h-7' />
				Loading
			</div>
		)
	}

	return (
		<div className='flex flex-row gap-5'>
			{details.map(detail => (
				<div
					key={detail.article}
					className='relative border rounded border-[#DEDEE2] w-[300px] pt-10 px-5'
				>
					<img
						src={detail.photo}
						alt={detail.article}
						className=' mx-auto h-1/2'
					/>
					<div className='mt-6'>
						<div className='flex flex-row justify-between'>
							<div className='text-sm text-[#7A7680] mt-1'>
								Артикул: {detail.article}
							</div>
							<div className='text-sm flex flex-row gap-1'>
								<Rating
									name='read-only'
									size='small'
									value={detail.rating}
									precision={0.5}
									readOnly
									className='mt-1'
								/>
								<div>{detail.rating}(52)</div>
							</div>
						</div>
						<div className='font-medium my-3'>{detail.name}</div>
						<div className='flex flex-row'>
							<div className='text-[40px] font-medium'>
								{(
									detail.price -
									detail.price / detail.promotion
								).toLocaleString()}
								$
							</div>
							<div className='text-[#7A7680] ml-2 line-through'>
								{detail.price}$
							</div>
						</div>
						<button className='absolute bottom-5 right-5 border-2 rounded-xl border-[#5946D7] text-[#5946D7] p-2 hover:bg-[#5946D7] transition duration-300 ease-in-out hover:text-white'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={2}
								stroke='currentColor'
								className='size-6 text-inherit'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
								/>
							</svg>
						</button>
					</div>
				</div>
			))}
		</div>
	)
}
