import LightsFilter from '../components/RimsFilter'

export default function CarLights({ searchParams }) {
	return (
		<section className='container mx-auto mt-8 mb-20'>
			<div className='text-2xl font-medium mb-5'>Каталог автосвітла</div>
			<LightsFilter searchParams={searchParams} />
		</section>
	)
}
