import OftenBuyFetch from './oftenBuyFetch'
import Link from 'next/link'
import Image from 'next/image'

export default function OftenBuy() {
	return (
		<section className='my-16 relative'>
			<div className='text-2xl font-medium mb-8'>Часто купують</div>
			<OftenBuyFetch />
			<Link
				href='/'
				className='absolute top-1/2 right-0 border rounded-xl bg-white p-2 drop-shadow'
			>
				<Image src='/img/more.svg' width={24} height={24} alt='more' />
			</Link>
		</section>
	)
}
