import RimsSection from './RimsSection'
import FiltrationRims from './FiltrationRims'

export default async function RimsFilter({ searchParams }) {
	const rims_name = Array.isArray(searchParams.rims_name)
		? searchParams.rims_name.join(',')
		: searchParams.rims_name || ''
	const rims_diameter = Array.isArray(searchParams.rims_diameter)
		? searchParams.rims_diameter.join(',')
		: searchParams.rims_diameter || ''
	const rims_width = Array.isArray(searchParams.rims_width)
		? searchParams.rims_width.join(',')
		: searchParams.rims_width || ''
	const PCD = Array.isArray(searchParams.PCD)
		? searchParams.PCD.join(',')
		: searchParams.PCD || ''
	const DIA = Array.isArray(searchParams.DIA)
		? searchParams.DIA.join(',')
		: searchParams.DIA || ''
	const ET = Array.isArray(searchParams.ET)
		? searchParams.ET.join(',')
		: searchParams.ET || ''
	const rims_material = Array.isArray(searchParams.rims_material)
		? searchParams.rims_material.join(',')
		: searchParams.rims_material || ''
	const color = Array.isArray(searchParams.color)
		? searchParams.color.join(',')
		: searchParams.color || ''
	const price = Array.isArray(searchParams.price)
		? searchParams.price.join(',')
		: searchParams.price || ''

	const queryParams = new URLSearchParams({
		rims_name,
		rims_diameter,
		rims_width,
		PCD,
		DIA,
		ET,
		rims_material,
		color,
		price,
	}).toString()

	const resRims = await fetch(`http://localhost:3000/api/rims?${queryParams}`, {
		next: {
			revalidate: 0,
		},
	})
	const rims = await resRims.json()

	if (!rims) return null

	return (
		<div className='flex flex-row gap-5 relative'>
			<aside className='w-[350px] border rounded bg-white shadow-2xl p-5'>
				<FiltrationRims rims={rims} response={resRims.ok} />
			</aside>
			{resRims.ok ? (
				<RimsSection rims={rims} />
			) : (
				<div className='absolute top-1/2 left-1/2 text-2xl font-bold'>
					Диски не знайдено
				</div>
			)}
		</div>
	)
}
