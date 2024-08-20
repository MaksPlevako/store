import AutochemistryFilter from '../components/AutochemistryFilter'

export default function Autochemistry({ searchParams }) {
	return (
		<section className='container mx-auto mt-8 mb-20'>
			<div className='text-2xl font-medium mb-5'>Каталог автохімії</div>
			<AutochemistryFilter searchParams={searchParams} />
		</section>
	)
}
