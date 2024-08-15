import ChangeAddress from '@/app/components/ChangeAddress'

export default function TypeAddresses({ addresses, user_id }) {
	const houses = addresses.filter(address => address.type === 'Дім')
	const posts = addresses.filter(address => address.type === 'Нова пошта')
	return (
		<div>
			{houses && (
				<div className='mb-5'>
					<div className='text-xl font-medium mb-3'>Дім</div>
					<div>
						{houses.map(house => (
							<div
								key={house._id}
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
									user_id={user_id}
									_id={house._id}
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
								key={post._id}
								className='border rounded-xl border-[#7A7680] p-5 relative my-2'
							>
								<div className='font-medium text-[18px]'>
									вул. {post.address}, {post.street}
									{post.department_number && <>, №{post.department_number}</>}
								</div>
								<div className='text-[#55556D] mb-1 mt-2.5'>м. {post.city}</div>
								<ChangeAddress
									user_id={user_id}
									_id={post._id}
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
		</div>
	)
}
