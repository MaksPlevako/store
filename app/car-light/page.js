import Image from 'next/image'
import Link from 'next/link'

export default function CarLight() {
	return (
		<section className='container mx-auto'>
			<div className='grid grid-cols-6 gap-5 '>
				<Link
					href='/'
					className='grid grid-rows-3 items-start border h-[190px] rounded-lg bg-white pt-5 px-2 shadow-2xl hover:scale-110 transition-all ease-in-out duration-500'
				>
					<Image
						src='/img/car-lights/car-lights.png'
						alt='car-lights'
						width={100}
						height={100}
						className='w-1/2 mx-auto row-span-2'
					/>
					<div className='font-medium  text-center '>Автолампи</div>
				</Link>
				<Link
					href='/'
					className='grid grid-rows-3 items-start border h-[190px] rounded-lg bg-white pt-5 px-2 shadow-2xl hover:scale-110 transition-all ease-in-out duration-500'
				>
					<Image
						src='/img/car-lights/days-light.png'
						alt='car-lights'
						width={100}
						height={100}
						className='w-1/2 mx-auto row-span-2'
					/>
					<div className='font-medium  text-center'>Денні ходові вогні</div>
				</Link>
				<Link
					href='/'
					className='grid grid-rows-3 items-start  border h-[190px] rounded-lg bg-white pt-5 px-2 shadow-2xl hover:scale-110 transition-all ease-in-out duration-500'
				>
					<Image
						src='/img/car-lights/more_lights.png'
						alt='car-lights'
						width={100}
						height={100}
						className='w-1/2 mx-auto row-span-2'
					/>
					<div className='font-medium text-center'>Додаткові фари</div>
				</Link>
				<Link
					href='/'
					className='grid grid-rows-3 items-start  border h-[190px] rounded-lg bg-white pt-5 px-2 shadow-2xl hover:scale-110 transition-all ease-in-out duration-500'
				>
					<Image
						src='/img/car-lights/main_lights.png'
						alt='car-lights'
						width={100}
						height={100}
						className='w-full h-full mx-auto row-span-2'
					/>
					<div className='font-medium text-center'>Фари головного світла</div>
				</Link>
				<Link
					href='/'
					className='grid grid-rows-3 items-start border h-[190px] rounded-lg bg-white pt-5 px-2 shadow-2xl hover:scale-110 transition-all ease-in-out duration-500'
				>
					<Image
						src='/img/car-lights/flashing_beacons.png'
						alt='car-lights'
						width={100}
						height={100}
						className='w-1/2 mx-auto row-span-2'
					/>
					<div className='font-medium text-center'>
						Світловідбивачі та проблискові маячки
					</div>
				</Link>
				<Link
					href='/'
					className='grid grid-rows-3 items-start  border h-[190px] rounded-lg bg-white pt-5 px-2 shadow-2xl hover:scale-110 transition-all ease-in-out duration-500'
				>
					<Image
						src='/img/car-lights/dimensional_lights.png'
						alt='car-lights'
						width={100}
						height={100}
						className='w-3/5 h-3/4 my-auto mx-auto row-span-2'
					/>
					<div className='font-medium text-center'>
						Контурно-габаритні вогні
					</div>
				</Link>
			</div>
		</section>
	)
}
