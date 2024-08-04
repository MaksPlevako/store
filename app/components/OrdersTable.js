'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function OrdersTable({ uniqueStatuses, orders }) {
	const [queryParams, setQueryParams] = useState({})
	const searchParams = useSearchParams()
	const statusFromQuery = queryParams.status || ''

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const searchParams = new URLSearchParams(window.location.search)
			const params = {}
			searchParams.forEach((value, key) => {
				params[key] = value
			})
			setQueryParams(params)
		}
	}, [searchParams])

	const sortedOrders = React.useMemo(() => {
		let sortableItems = [...orders]
		if (statusFromQuery) {
			// Перемещаем элементы с заданным статусом в начало
			sortableItems.sort((a, b) => {
				if (a.status === statusFromQuery) return -1
				if (b.status === statusFromQuery) return 1
				return 0
			})
		}
		return sortableItems
	}, [orders, statusFromQuery])

	return (
		<div>
			<div className='flex flex-row justify-between border rounded-lg border-[#DEDEE2] p-2 mb-5'>
				{uniqueStatuses.map((status, index) => (
					<Link
						href={`/profile/order-history?status=${status}`}
						key={index}
						className={`py-2 px-5 border rounded-lg ${
							queryParams.status === status
								? 'bg-[#6B46C1] text-white'
								: 'bg-[#E2E8F0] text-black'
						}`}
					>
						{status}
					</Link>
				))}
			</div>
			<table className='w-full'>
				<thead className='border rounded bg-[#F4F5F6] text-[#55556D] w-full'>
					<tr>
						<th className='py-4 px-5'>Номер заказа</th>
						<th className='py-4 px-5'>Дата заказа</th>
						<th className='py-4 px-5'>Тип доставки</th>
						<th className='py-4 px-5'>Тип оплаты</th>
						<th className='py-4 px-5'>Стоимость</th>
						<th className='py-4 px-5'>Текущий статус</th>
						<th className='py-4 px-5'></th>
					</tr>
				</thead>
				<tbody>
					{sortedOrders.map(order => (
						<tr
							key={order.num}
							className='hover:bg-[#F4F5F6] hover:scale-[101%] transition ease-in-out duration-300 border-b border-[#E3E3E8]'
						>
							<td className='p-5 text-[#6B59CC] font-medium'>№ {order.num}</td>
							<td className='p-5 text-sm'>{order.date.split('T')[0]}</td>
							<td className='p-5 text-sm'>{order.type}</td>
							<td className='p-5 text-sm'>{order.payment_type}</td>
							<td className='p-5 font-medium'>
								{order.price.toLocaleString()} $
							</td>
							<td className='p-5 text-sm font-medium'>
								<span
									className={`py-1.5 px-2.5 rounded-lg bg-opacity-20 ${
										order.status === 'Прийнятий'
											? 'text-green-500 bg-green-300'
											: order.status === 'Опрацьовується'
											? 'text-blue-700 bg-blue-300'
											: order.status === 'Упаковується'
											? 'text-orange-500 bg-orange-300'
											: order.status === 'Відправлений'
											? 'text-purple-500 bg-purple-300'
											: 'text-gray-500 bg-gray-300'
									}`}
								>
									{order.status}
								</span>
							</td>
							<td className='p-5'>
								<Link href={`/profile/order-history/${order.num}`}>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										strokeWidth={1.5}
										stroke='currentColor'
										className='size-8'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
										/>
									</svg>
								</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
