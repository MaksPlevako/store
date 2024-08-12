import LightsSection from './RimsSection'
import FiltrationLights from './FiltrationRims'

export default async function RimsFilter({ searchParams }) {
	const brand = Array.isArray(searchParams.brand)
		? searchParams.brand.join(',')
		: searchParams.brand || ''
	const type = Array.isArray(searchParams.type)
		? searchParams.type.join(',')
		: searchParams.type || ''
	const lamp_kind = Array.isArray(searchParams.lamp_kind)
		? searchParams.lamp_kind.join(',')
		: searchParams.lamp_kind || ''
	const color_temperature = Array.isArray(searchParams.color_temperature)
		? searchParams.color_temperature.join(',')
		: searchParams.color_temperature || ''
	const socle = Array.isArray(searchParams.socle)
		? searchParams.socle.join(',')
		: searchParams.socle || ''
	const assignment = Array.isArray(searchParams.assignment)
		? searchParams.assignment.join(',')
		: searchParams.assignment || ''
	const power = Array.isArray(searchParams.power)
		? searchParams.power.join(',')
		: searchParams.power || ''
	const voltage = Array.isArray(searchParams.voltage)
		? searchParams.voltage.join(',')
		: searchParams.voltage || ''
	const color = Array.isArray(searchParams.color)
		? searchParams.color.join(',')
		: searchParams.color || ''
	const price = Array.isArray(searchParams.price)
		? searchParams.price.join(',')
		: searchParams.price || ''

	const queryParams = new URLSearchParams({
		brand,
		type,
		lamp_kind,
		color_temperature,
		socle,
		color,
		assignment,
		power,
		voltage,
		price,
	}).toString()

	const resLights = await fetch(
		`http://localhost:3000/api/carLights?${queryParams}`,
		{
			next: {
				revalidate: 0,
			},
		}
	)
	const lights = await resLights.json()

	if (!lights) return null

	return (
		<div className='flex flex-row gap-5 relative'>
			<aside className='w-[350px] border rounded bg-white shadow-2xl p-5'>
				<FiltrationLights lights={lights} response={resLights.ok} />
			</aside>
			{resLights.ok ? (
				<LightsSection lights={lights} />
			) : (
				<div className='absolute top-1/2 left-1/2 text-2xl font-bold'>
					Автосвітло не знайдено
				</div>
			)}
		</div>
	)
}
