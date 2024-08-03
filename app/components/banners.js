import Link from 'next/link'
import Image from 'next/image'

export default function Banners() {
	return (
		<section className='my-16'>
			<div className='grid grid-cols-3 gap-5 w-full'>
				<div
					className='w-full border border-[#DEDEE2] bg-[#E8EDFA] pt-7 pl-7 h-[250px]'
					style={{
						backgroundImage: 'url(/img/motor_oil.png)',
						backgroundPosition: 'bottom right',
						backgroundRepeat: 'no-repeat',
					}}
				>
					<div className='text-2xl font-medium'>
						Моторные масла
						<br /> Genesis
					</div>
					<Link
						href='/'
						className='border rounded-lg bg-[#5946D7] py-2 px-4 flex flex-row gap-2 w-1/3 mt-5'
					>
						<div className='text-white font-medium'>Перейти</div>
						<Image
							src='/img/arrow-right.svg'
							width={24}
							height={24}
							alt='arrow'
						/>
					</Link>
				</div>
				<div
					className='w-full border border-[#DEDEE2] bg-[#E8EDFA] pt-7 pl-7 h-[250px]'
					style={{
						backgroundImage: 'url(/img/wheel.png)',
						backgroundPosition: 'bottom right',
						backgroundRepeat: 'no-repeat',
					}}
				>
					<div className='text-2xl font-medium'>
						Шины зимние
						<br /> дешевле
					</div>
					<Link
						href='/'
						className='border rounded-lg bg-[#5946D7] py-2 px-4 flex flex-row gap-2 w-1/3 mt-5'
					>
						<div className='text-white font-medium'>Выбрать</div>
						<Image
							src='/img/arrow-right.svg'
							width={24}
							height={24}
							alt='arrow'
						/>
					</Link>
				</div>
				<div
					className='w-full border border-[#DEDEE2] bg-[#E8EDFA] pt-7 pl-7 h-[250px]'
					style={{
						backgroundImage: 'url(/img/brakes.png)',
						backgroundPosition: 'bottom right',
						backgroundRepeat: 'no-repeat',
					}}
				>
					<div className='text-2xl font-medium'>
						Запчасти для
						<br /> ТО
					</div>
					<Link
						href='/'
						className='border rounded-lg bg-[#5946D7] py-2 px-4 flex flex-row gap-2 w-1/3 mt-5'
					>
						<div className='text-white font-medium'>Смотреть</div>
						<Image
							src='/img/arrow-right.svg'
							width={24}
							height={24}
							alt='arrow'
						/>
					</Link>
				</div>
			</div>
		</section>
	)
}
