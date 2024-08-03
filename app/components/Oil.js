import OilFetch from './OilFetch'
import Link from 'next/link'
import Image from 'next/image'

export default function Oil() {
	return (
		<section className='my-[60px]'>
			<div className='flex flex-row justify-between items-center mb-5'>
				<div className='text-2xl font-medium'>Автомасла</div>
				<Link
					href='/'
					className='flex	flex-row justify-around items-center border rounded-lg text-[#5946D7] bg-[#F4F5F6] py-[10px] px-5'
				>
					Всі автомасла
					<Image
						src='/img/arrow-right-small.svg'
						alt='arrow'
						width={24}
						height={24}
					/>
				</Link>
			</div>
			<div className='w-full flex flex-row gap-5'>
				<Link
					href='/'
					className='border rounded-xl text-white  bg-[#5946D7] text-2xl w-full max-w-[300px] font-bold pt-8 pl-8'
					style={{
						backgroundImage: 'url(/img/oil.png)',
						backgroundPosition: 'bottom right',
						backgroundRepeat: 'no-repeat',
					}}
				>
					Автомасла №1
					<br /> от официальных
					<br /> дилеров
				</Link>
				<OilFetch />
			</div>
		</section>
	)
}
