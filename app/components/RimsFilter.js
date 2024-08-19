import RimsSection from './RimsSection'
import FiltrationRims from './FiltrationRims'

export default async function RimsFilter({ searchParams }) {
	const joinOrEmpty = param =>
		Array.isArray(param) ? param.join(',') : param || ''

	const rims_name = joinOrEmpty(searchParams.rims_name)
	const rims_diameter = joinOrEmpty(searchParams.rims_diameter)
	const rims_width = joinOrEmpty(searchParams.rims_width)
	const PCD = joinOrEmpty(searchParams.PCD)
	const DIA = joinOrEmpty(searchParams.DIA)
	const ET = joinOrEmpty(searchParams.ET)
	const rims_material = joinOrEmpty(searchParams.rims_material)
	const color = joinOrEmpty(searchParams.color)
	const price = joinOrEmpty(searchParams.price)

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
			<aside className='w-[350px] border rounded bg-white shadow-2xl p-5 h-min'>
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
