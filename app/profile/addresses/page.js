import ProfileLayout from '@/app/components/ProfileLayout'
import { auth } from '@/config/auth'
import ButtonAddress from '@/app/components/ButtonAddress'
import ChangeAddress from '@/app/components/ChangeAddress'

export default async function Addresses() {
	const session = await auth()
	const res = await fetch(
		`http://localhost:3000/api/user/${session.user.email}`
	)
	const user = await res.json()
	if (!user) return null

	const houses = user.addresses.filter(address => address.type === 'Дім')
	const posts = user.addresses.filter(address => address.type === 'Нова пошта')

	return (
		<ProfileLayout activeTab='addresses'>
			<div className='text-2xl font-medium mb-3.5 text-[#1B1D1F]'>
				Мої адреси
			</div>
			<div className='border rounded bg-white p-5 shadow-2xl'>
				{houses && (
					<div className='mb-5'>
						<div className='text-xl font-medium mb-3'>Дім</div>
						<div>
							{houses.map(house => (
								<div
									key={house.addressId}
									className='border rounded-xl border-[#7A7680] p-5 relative my-2'
								>
									<div className='font-medium text-[18px]'>
										вул. {house.address}, {house.street}, кв.
										{house.apartment_num}
									</div>
									<div className='text-[#55556D] mb-1 mt-2.5'>
										м. {house.city}
									</div>
									<div className='text-[#55556D]'>Індекс {house.index}</div>
									<ChangeAddress
										email={session.user.email}
										addressId={house.addressId}
										address={house.address}
										street={house.street}
										apartment_num={house.apartment_num}
										city={house.city}
										index={house.index}
										type={house.type}
									/>
								</div>
							))}
						</div>
					</div>
				)}
				{posts && (
					<div>
						<div className='text-xl font-medium mb-3'>Нова пошта</div>
						<div>
							{posts.map(post => (
								<div
									key={post.addressId}
									className='border rounded-xl border-[#7A7680] p-5 relative my-2'
								>
									<div className='font-medium text-[18px]'>
										вул. {post.address}, {post.street}
										{post.department_number && <>, №{post.department_number}</>}
									</div>
									<div className='text-[#55556D] mb-1 mt-2.5'>
										м. {post.city}
									</div>
									<ChangeAddress
										email={session.user.email}
										addressId={post.addressId}
										address={post.address}
										street={post.street}
										department_number={post.department_number}
										city={post.city}
										type={post.type}
									/>
								</div>
							))}
						</div>
					</div>
				)}
				<ButtonAddress email={session.user.email} />
			</div>
		</ProfileLayout>
	)
}
