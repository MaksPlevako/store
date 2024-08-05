import Link from 'next/link'
import Image from 'next/image'
import SignOut from './SignOut'

export default function ProfileLayout({ activeTab, children }) {
	return (
		<section className='container mx-auto mt-8 mb-16'>
			<div className='flex flex-row gap-8'>
				<nav className='border rounded p-3 shadow-2xl w-max h-min'>
					<ul className='flex flex-col gap-3'>
						<li>
							<Link
								href='/profile/personal-info'
								className={
									activeTab === 'personal-info'
										? 'flex flex-row gap-4 border-white rounded-lg py-3 px-5 bg-[#F4F5F6] shadow-lg'
										: 'flex flex-row gap-4 border-white rounded-lg py-3 px-5 bg-white hover:scale-105 transition ease-in-out duration-600 active:bg-[#F4F5F6]'
								}
							>
								<Image
									src='/img/profile/person.svg'
									alt='person'
									width={24}
									height={24}
								/>
								Персональна інформація
							</Link>
						</li>
						<li>
							<Link
								href='/profile/order-history'
								className={
									activeTab === 'order-history'
										? 'flex flex-row gap-4 border-white rounded-lg py-3 px-5 bg-[#F4F5F6] shadow-lg'
										: 'flex flex-row gap-4 border-white rounded-lg py-3 px-5 bg-white hover:scale-105 transition ease-in-out duration-600 active:bg-[#F4F5F6]'
								}
							>
								<Image
									src='/img/profile/order.svg'
									alt='order'
									width={24}
									height={24}
								/>
								Історія покупок
							</Link>
						</li>
						<li>
							<Link
								href='/profile/addresses'
								className={
									activeTab === 'addresses'
										? 'flex flex-row gap-4 border-white rounded-lg py-3 px-5 bg-[#F4F5F6] shadow-lg'
										: 'flex flex-row gap-4 border-white rounded-lg py-3 px-5 bg-white hover:scale-105 transition ease-in-out duration-600 active:bg-[#F4F5F6]'
								}
							>
								<Image
									src='/img/profile/point.svg'
									alt='point'
									width={24}
									height={24}
								/>
								Мої адреса
							</Link>
						</li>
						<li>
							<Link
								href='/profile/payment-info'
								className={
									activeTab === 'payment-info'
										? 'flex flex-row gap-4 border-white rounded-lg py-3 px-5 bg-[#F4F5F6] shadow-lg'
										: 'flex flex-row gap-4 border-white rounded-lg py-3 px-5 bg-white hover:scale-105 transition ease-in-out duration-600 active:bg-[#F4F5F6]'
								}
							>
								<Image
									src='/img/profile/card.svg'
									alt='card'
									width={24}
									height={24}
								/>
								Мої реквізити
							</Link>
						</li>
						<li>
							<Link
								href='/profile/chats'
								className={
									activeTab === 'chats'
										? 'flex flex-row gap-4 border-white rounded-lg py-3 px-5 bg-[#F4F5F6] shadow-lg'
										: 'flex flex-row gap-4 border-white rounded-lg py-3 px-5 bg-white hover:scale-105 transition ease-in-out duration-600 active:bg-[#F4F5F6]'
								}
							>
								<Image
									src='/img/profile/chat.svg'
									alt='chat'
									width={24}
									height={24}
								/>
								Мої чати
							</Link>
						</li>
					</ul>
					<div className='border border-[#E3E3E8] w-full my-3' />
					<div className='flex flex-row gap-4 rounded-lg py-3 px-5 hover:scale-105 transition ease-in-out duration-600'>
						<Image
							src='/img/profile/sign-out.svg'
							alt='out'
							width={24}
							height={24}
						/>
						<SignOut />
					</div>
				</nav>
				<div className='w-full'>{children}</div>
			</div>
		</section>
	)
}
