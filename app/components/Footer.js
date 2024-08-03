import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
	return (
		<footer className='bg-[#2F2B4A] pt-10 pb-5 text-white container:none'>
			<div className='container mx-auto'>
				<div className='grid grid-cols-5 justify-between'>
					<div>
						<div className='text-[18px] font-medium mb-5'>Меню компанії</div>
						<ul className='text-[#F4F5F6] grid gap-y-2'>
							<li>
								<Link href='/'>Что такое Oner</Link>
							</li>
							<li>
								<Link href='/'>Реквизиты и информация</Link>
							</li>
							<li>
								<Link href='/'>Новости</Link>
							</li>
							<li>
								<Link href='/'>Вакансии</Link>
							</li>
							<li>
								<Link href='/'>Поставщикам</Link>
							</li>
							<li>
								<Link href='/'>Контакты</Link>
							</li>
						</ul>
					</div>
					<div>
						<div className='text-[18px] font-medium mb-5'>Каталоги</div>
						<ul className='text-[#F4F5F6] grid gap-y-2'>
							<li>
								<Link href='/'>Оригинальные запчасти</Link>
							</li>
							<li>
								<Link href='/'>Неоригинальные запчасти</Link>
							</li>
							<li>
								<Link href='/'>Запчасти для ТО</Link>
							</li>
							<li>
								<Link href='/'>Автомасла</Link>
							</li>
							<li>
								<Link href='/'>Аккумуляторы</Link>
							</li>
							<li>
								<Link href='/'>Распродажа</Link>
							</li>
						</ul>
					</div>
					<div>
						<div className='text-[18px] font-medium mb-5'>Помощь</div>
						<ul className='text-[#F4F5F6] grid gap-y-2'>
							<li>
								<Link href='/'>Часто задаваемые вопросы</Link>
							</li>
							<li>
								<Link href='/'>Консультация Online</Link>
							</li>
							<li>
								<Link href='/'>Оплата заказа</Link>
							</li>
							<li>
								<Link href='/'>Доставка заказа</Link>
							</li>
							<li>
								<Link href='/'>Возврат товара</Link>
							</li>
							<li>
								<Link href='/'>Забыл пароль</Link>
							</li>
						</ul>
					</div>
					<div>
						<div className='text-[18px] font-medium mb-5'>Товары и бренды</div>
						<ul className='text-[#F4F5F6] grid gap-y-2'>
							<li>
								<Link href='/'>Список брендов</Link>
							</li>
							<li>
								<Link href='/'>Популярные товары</Link>
							</li>
							<li>
								<Link href='/'>Наличие на складах</Link>
							</li>
						</ul>
					</div>
					<div>
						<button className='flex flex-row items-start gap-2 border rounded-lg bg-white bg-opacity-10 py-[15px] px-5'>
							<Image src='/img/chat.svg' alt='chat' width={20} height={20} />
							<div className=''>
								<div className='font-medium'>Консультация Online</div>
								<div className='text-sm'>Задавайте вопросы</div>
							</div>
						</button>
						<div className='flex flex-row gap-2 items-center mt-5'>
							<div className='relative flex h-3 w-3'>
								<span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75'></span>
								<span className='relative inline-flex rounded-full h-3 w-3 bg-green-500'></span>
							</div>
							<div>Сервис работает в обычном режиме</div>
						</div>
					</div>
				</div>
				<div className='border w-full border-gray-600 mt-10 mb-5' />
				<div className='flex flex-row justify-between items-center'>
					<div>Copyright © ООО «Oner.ru» 2021. All rights reserved.</div>
					<div className='flex flex-row gap-4 items-center'>
						<div>Принимаем к оплате</div>
						<div className='flex flex-row gap-[10px]'>
							<Image
								src='/img/visa.png'
								alt='visa'
								width={70}
								height={20}
								className=' rounded p-[10px] border-opacity-20 bg-slate-50 bg-opacity-20'
							/>
							<Image
								src='/img/mastercard.png'
								alt='mastercard'
								width={50}
								height={20}
								className=' rounded p-[10px] bg-slate-50 bg-opacity-20'
							/>
						</div>
					</div>
					<div className='flex flex-row gap-5'>
						<Link href='/'>Оферта</Link>
						<Link href='/'>Конфиденциальность</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}
