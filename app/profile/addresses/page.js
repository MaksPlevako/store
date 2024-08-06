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
									<div className='absolute top-3 right-3 flex flex-row gap-2'>
										<button>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
												strokeWidth={1.5}
												stroke='currentColor'
												className='size-6 hover:text-[#5846be] transit ease-in-out duration-200'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125'
												/>
											</svg>
										</button>
										<button>
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
									</div>
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
