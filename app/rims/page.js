import RimsFilter from '../components/RimsFilter'

export default function CarBatteries({ searchParams }) {
	return (
		<section className='container mx-auto mt-8 mb-20'>
			<div className='text-2xl font-medium mb-5'>Каталог дисків</div>
			<RimsFilter searchParams={searchParams} />
		</section>
	)
}
