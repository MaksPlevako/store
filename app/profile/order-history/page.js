import ProfileLayout from '@/app/components/ProfileLayout'
import { auth } from '@/config/auth'
import OrdersTable from '@/app/components/OrdersTable'

export default async function OrderHistory() {
	const session = await auth()
	const resUser = await fetch(
		`http://localhost:3000/api/user/${session.user.email}`
	)
	const user = await resUser.json()

	const resOrders = await fetch(`http://localhost:3000/api/orders/${user._id}`)

	const orders = await resOrders.json()
	const uniqueStatuses = [...new Set(orders.map(order => order.status))]

	if (!user) return null

	return (
		<ProfileLayout activeTab='order-history'>
			<div>
				<div className='text-2xl font-medium mb-4'>История заказов</div>
				<div className='border rounded-lg bg-white shadow-2xl px-5 pt-5'>
					<OrdersTable uniqueStatuses={uniqueStatuses} orders={orders} />
				</div>
			</div>
		</ProfileLayout>
	)
}
