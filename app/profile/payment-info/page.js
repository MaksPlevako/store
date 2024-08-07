import ProfileLayout from '@/app/components/ProfileLayout'

export default async function PaymentInfo() {
	const session = await auth()
	const res = await fetch(
		`http://localhost:3000/api/user/${session.user.email}`
	)
	const user = await res.json()
	if (!user) return null
	return (
		<ProfileLayout activeTab='payment-info'>
			<div className='text-2xl font-medium mb-3.5'>Мои реквизиты</div>
			<div className='border rounded bg-white p-7 shadow-2xl'>
				<div className='grid grid-cols-2 gap-5 w-full'>
					{user.payment.map(card => (
						<div
							key={card.paymentId}
							className='relative border rounded-2xl border-[#E3E3E8] p-5 flex flex-row gap-5 items-start shadow-lg'
						>
							<Image
								src='/img/profile/card.svg'
								alt='card'
								width={32}
								height={32}
								className='w-auto h-auto border rounded-lg bg-white shadow-2xl p-1.5'
							/>
							<div>
								<div className='text-[18px] font-medium mb-2'>{card.name}</div>
								<div className='text-[#55556D]'>{card.card_num}</div>
							</div>
							<ChangeCard
								email={session.user.email}
								paymentId={card.paymentId}
							/>
						</div>
					))}
				</div>
			</div>
		</ProfileLayout>
	)
}
