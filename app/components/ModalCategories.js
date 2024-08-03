import Link from 'next/link'
import Image from 'next/image'

export default function ModalCategories({ changeModal }) {
	return (
		<div
			className='fixed top-0 left-0 bg-[#1B1D1F] bg-opacity-20 w-full h-screen z-10 text-black cursor-default'
			onClick={changeModal}
		>
			<div
				className='container absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full bg-white border rounded-xl p-5 flex flex-row gap-5'
				onClick={e => e.stopPropagation()}
			>
				<div className='grid grid-cols-3 divine-y divide-x text-sm'>
					<Link
						href='/categories/brakes'
						className='flex flex-row items-center border bg-slate-50 py-5 px-8 hover:scale-105 ease-in-out transition'
					>
						<Image
							src='/img/menu/brakes.svg'
							alt='brakes'
							width={32}
							height={32}
						/>
						<div className='ml-5'>Оригінальні запчастини</div>
					</Link>
					<Link
						href='/categories/brakes'
						className='flex flex-row items-center border bg-slate-50 py-5 px-8 hover:scale-105 ease-in-out transition'
					>
						<Image
							src='/img/menu/engine.svg'
							alt='engine'
							width={32}
							height={32}
						/>
						<div className='ml-5'>Неоригінальні запчастини</div>
					</Link>
					<Link
						href='/categories/brakes'
						className='flex flex-row items-center border bg-slate-50 py-5 px-8 hover:scale-105 ease-in-out transition'
					>
						<Image
							src='\img\menu\parking-car-garage.svg'
							alt='parking-car-garage'
							width={32}
							height={32}
						/>
						<div className='ml-5'>Запчастини для ВАЗ,ГАЗ,КАМАЗ</div>
					</Link>
					<Link
						href='/categories/brakes'
						className='flex flex-row items-center border bg-slate-50 py-5 px-8 hover:scale-105 ease-in-out transition'
					>
						<Image
							src='img\menu\front-door-part-sqaure.svg'
							alt='front-door-part-sqaure'
							width={32}
							height={32}
						/>
						<div className='ml-5'>Кузовні частини</div>
					</Link>
					<Link
						href='/categories/brakes'
						className='flex flex-row items-center border bg-slate-50 py-5 px-8 hover:scale-105 ease-in-out transition'
					>
						<Image
							src='\img\menu\piston.svg'
							alt='piston'
							width={32}
							height={32}
						/>
						<div className='ml-5'>Запчастини для ТО</div>
					</Link>
					<Link
						href='/categories/brakes'
						className='flex flex-row items-center border bg-slate-50 py-5 px-8 hover:scale-105 ease-in-out transition'
					>
						<Image
							src='\img\menu\glass-washer.svg'
							alt='glass-washer'
							width={32}
							height={32}
						/>
						<div className='ml-5'>Автостікла</div>
					</Link>
					<Link
						href='/categories/brakes'
						className='flex flex-row items-center border bg-slate-50 py-5 px-8 hover:scale-105 ease-in-out transition'
					>
						<Image src='/img/menu/oil.svg' alt='oil' width={48} height={48} />
						<div className='ml-5'>Автомасла</div>
					</Link>
					<Link
						href='/categories/brakes'
						className='flex flex-row items-center border bg-slate-50 py-5 px-8 hover:scale-105 ease-in-out transition'
					>
						<Image
							src='\img\menu\gear-box-switch.svg'
							alt='gear-box-switch'
							width={32}
							height={32}
						/>
						<div className='ml-5'>Автохімія</div>
					</Link>
					<Link
						href='/categories/brakes'
						className='flex flex-row items-center border bg-slate-50 py-5 px-8 hover:scale-105 ease-in-out transition'
					>
						<Image
							src='\img\menu\wheel.svg'
							alt='wheel'
							width={32}
							height={32}
						/>
						<div className='ml-5'>Діски</div>
					</Link>
					<Link
						href='/categories/brakes'
						className='flex flex-row items-center border bg-slate-50 py-5 px-8 hover:scale-105 ease-in-out transition'
					>
						<Image
							src='\img\menu\battery.svg'
							alt='battery'
							width={32}
							height={32}
						/>
						<div className='ml-5'>Акумулятори</div>
					</Link>
					<Link
						href='/categories/brakes'
						className='flex flex-row items-center border bg-slate-50 py-5 px-8 hover:scale-105 ease-in-out transition'
					>
						<Image
							src='\img\menu\short-light-dashboard.svg'
							alt='short-light-dashboard'
							width={32}
							height={32}
						/>
						<div className='ml-5'>Автолампи</div>
					</Link>
				</div>
				<Link
					href='/'
					className='pt-5 pl-8 border rounded-xl text-white font-medium bg-[#5946D7] text-base w-1/5'
					style={{
						backgroundImage: 'url(/img/modal-categories.png)',
						backgroundPosition: 'bottom right',
						backgroundRepeat: 'no-repeat',
					}}
				>
					Автомасла №1
					<br /> от официальных
					<br /> дилеров
				</Link>
			</div>
		</div>
	)
}
