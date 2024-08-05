import ProfileLayout from '@/app/components/ProfileLayout'
import Link from 'next/link'

export default async function Order({ params }) {
	const resOrders = await fetch(
		`http://localhost:3000/api/orders/num/${params.num}`,
		{
			next: {
				revalidate: 0,
			},
		}
	)

	const order = await resOrders.json()
	const details = order.details

	if (!order) {
		return <div>Загрузка</div>
	}

	return (
		<ProfileLayout activeTab='order-history'>
			<div className='text-2xl font-medium mb-3.5'>Заказ № {params.num}</div>
			<div className='flex flex-row justify-between items-start border rounded shadow-2xl p-5 bg-white'>
				<div className='grid grid-cols-2 gap-x-10 gap-y-5 text-[18px]'>
					<div className='text-[#55556D]'>Адрес доставки</div>
					<div className='font-medium'>{order.address}</div>
					<div className='text-[#55556D]'>Тип оплаты</div>
					<div className='font-medium'>{order.payment_type}</div>
					<div className='text-[#55556D]'>Тип доставки</div>
					<div className='font-medium'>{order.type}</div>
				</div>
				<button className='border rounded bg-[#6B59CC] font-medium py-2.5 px-5 text-white'>
					Оплатить
				</button>
			</div>
			<div className='border rounded bg-white p-5 shadow-2xl mt-2.5'>
				<div className='font-medium text-[18px] mb-5'>Состав заказа</div>
				<table className='w-full text-left'>
					<thead className='text-[#55556D] text-sm font-normal'>
						<tr>
							<th className='pb-4'>Назва</th>
							<th>Артикль</th>
							<th>Ціна</th>
							<th>Кількість</th>
							<th>Загальна ціна</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{details ? (
							Object.values(details).map((detail, index) => (
								<tr key={index} className='border-t border-[#DEDEE2]'>
									<td className='font-medium text-[#6B59CC] py-5'>
										<Link href='/'>{detail.detail_name}</Link>
									</td>
									<td>{detail.article}</td>
									<td>{detail.price.toLocaleString()} $</td>
									<td>{detail.count}</td>
									<td className='font-medium'>
										{(detail.count * detail.price).toLocaleString()} $
									</td>
									<td></td>
								</tr>
							))
						) : (
							<div>loading</div>
						)}
					</tbody>
				</table>
			</div>
		</ProfileLayout>
	)
}
