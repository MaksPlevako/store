import ProfileLayout from '@/app/components/ProfileLayout'

export default async function Order({ order }) {
	console.log(order)

	const resOrders = await fetch(`http://localhost:3000/api/orders/${order}`)
	return (
		<ProfileLayout activeTab='order-history'>
			<div></div>
		</ProfileLayout>
	)
}
