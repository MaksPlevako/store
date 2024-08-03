import Link from 'next/link'
import Image from 'next/image'

export default function Categories() {
	return (
		<section className='my-10'>
			<div className='grid grid-cols-3 divine-y divide-x'>
				<Link
					href='/categories/brakes'
					className='flex flex-row border bg-slate-50 py-5 px-8 hover:scale-105 ease-in-out transition'
				>
					<Image
						src='/img/menu/brakes.svg'
						alt='brakes'
						width={48}
						height={48}
					/>
					<div className='ml-5'>
						<div className='text-xl'>Оригінальні запчастини</div>
						<div className='text-sm text-[#505255]'>730 товаров</div>
					</div>
				</Link>
				<Link
					href='/categories/brakes'
					className='flex flex-row border bg-slate-50 py-5 px-8 hover:scale-105 ease-in-out transition'
				>
					<Image
						src='/img/menu/engine.svg'
						alt='engine'
						width={48}
						height={48}
					/>
					<div className='ml-5'>
						<div className='text-xl'>Неоригінальні запчастини</div>
						<div className='text-sm text-[#505255]'>278 товаров</div>
					</div>
				</Link>
				<Link
					href='/categories/brakes'
					className='flex flex-row border bg-slate-50 py-5 px-8 hover:scale-105 ease-in-out transition'
				>
					<Image
						src='\img\menu\parking-car-garage.svg'
						alt='parking-car-garage'
						width={48}
						height={48}
					/>
					<div className='ml-5'>
						<div className='text-xl'>Запчастини для ВАЗ,ГАЗ,КАМАЗ</div>
						<div className='text-sm text-[#505255]'>730 товаров</div>
					</div>
				</Link>
				<Link
					href='/categories/brakes'
					className='flex flex-row border bg-slate-50 py-5 px-8 hover:scale-105 ease-in-out transition'
				>
					<Image
						src='img\menu\front-door-part-sqaure.svg'
						alt='front-door-part-sqaure'
						width={48}
						height={48}
					/>
					<div className='ml-5'>
						<div className='text-xl'>Кузовні частини</div>
						<div className='text-sm text-[#505255]'>730 товаров</div>
					</div>
				</Link>
				<Link
					href='/categories/brakes'
					className='flex flex-row border bg-slate-50 py-5 px-8 hover:scale-105 ease-in-out transition'
				>
					<Image
						src='\img\menu\piston.svg'
						alt='piston'
						width={48}
						height={48}
					/>
					<div className='ml-5'>
						<div className='text-xl'>Запчастини для ТО</div>
						<div className='text-sm text-[#505255]'>730 товаров</div>
					</div>
				</Link>
				<Link
					href='/categories/brakes'
					className='flex flex-row border bg-slate-50 py-5 px-8 hover:scale-105 ease-in-out transition'
				>
					<Image
						src='\img\menu\glass-washer.svg'
						alt='glass-washer'
						width={48}
						height={48}
					/>
					<div className='ml-5'>
						<div className='text-xl'>Автостікла</div>
						<div className='text-sm text-[#505255]'>730 товаров</div>
					</div>
				</Link>
				<Link
					href='/categories/brakes'
					className='flex flex-row border bg-slate-50 py-5 px-8 hover:scale-105 ease-in-out transition'
				>
					<Image src='/img/menu/oil.svg' alt='oil' width={48} height={48} />
					<div className='ml-5'>
						<div className='text-xl'>Автомасла</div>
						<div className='text-sm text-[#505255]'>730 товаров</div>
					</div>
				</Link>
				<Link
					href='/categories/brakes'
					className='flex flex-row border bg-slate-50 py-5 px-8 hover:scale-105 ease-in-out transition'
				>
					<Image
						src='\img\menu\gear-box-switch.svg'
						alt='gear-box-switch'
						width={48}
						height={48}
					/>
					<div className='ml-5'>
						<div className='text-xl'>Автохімія</div>
						<div className='text-sm text-[#505255]'>730 товаров</div>
					</div>
				</Link>
				<Link
					href='/categories/brakes'
					className='flex flex-row border bg-slate-50 py-5 px-8 hover:scale-105 ease-in-out transition'
				>
					<Image src='\img\menu\wheel.svg' alt='wheel' width={48} height={48} />
					<div className='ml-5'>
						<div className='text-xl'>Діски</div>
						<div className='text-sm text-[#505255]'>730 товаров</div>
					</div>
				</Link>
				<Link
					href='/categories/brakes'
					className='flex flex-row border bg-slate-50 py-5 px-8 hover:scale-105 ease-in-out transition'
				>
					<Image
						src='\img\menu\battery.svg'
						alt='battery'
						width={48}
						height={48}
					/>
					<div className='ml-5'>
						<div className='text-xl'>Акумулятори</div>
						<div className='text-sm text-[#505255]'>730 товаров</div>
					</div>
				</Link>
				<Link
					href='/categories/brakes'
					className='flex flex-row border bg-slate-50 py-5 px-8 hover:scale-105 ease-in-out transition'
				>
					<Image
						src='\img\menu\short-light-dashboard.svg'
						alt='short-light-dashboard'
						width={48}
						height={48}
					/>
					<div className='ml-5'>
						<div className='text-xl'>Автолампи</div>
						<div className='text-sm text-[#505255]'>730 товаров</div>
					</div>
				</Link>
				<Link
					href='/categories/business'
					className='flex flex-row items-center border py-5 px-8 relative bg-slate-800 hover:scale-105 ease-in-out transition'
					style={{
						backgroundImage: 'url(/img/bg_business.png)',
						backgroundPosition: 'center',
					}}
				>
					<Image
						src='\img\menu\business.svg'
						alt='business'
						width={48}
						height={48}
					/>
					<div className='ml-5 text-2xl font-medium text-white'>
						Поставщикам
					</div>
					<Image
						src='\img\arrow-right.svg'
						alt='arrow'
						width={32}
						height={32}
						className='absolute bottom-5 right-5'
					/>
				</Link>
			</div>
		</section>
	)
}
