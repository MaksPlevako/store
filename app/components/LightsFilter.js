import LightsSection from './LightsSection'
import FiltrationLights from './FiltrationLights'

export default async function LightsFilter({ searchParams }) {
	const joinOrEmpty = param =>
		Array.isArray(param) ? param.join(',') : param || ''

	const brand = joinOrEmpty(searchParams.brand)
	const type = joinOrEmpty(searchParams.type)
	const lamp_kind = joinOrEmpty(searchParams.lamp_kind)
	const color_temperature = joinOrEmpty(searchParams.color_temperature)
	const socle = joinOrEmpty(searchParams.socle)
	const assignment = joinOrEmpty(searchParams.assignment)
	const power = joinOrEmpty(searchParams.power)
	const voltage = joinOrEmpty(searchParams.voltage)
	const color = joinOrEmpty(searchParams.color)
	const price = joinOrEmpty(searchParams.price)

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
			<aside className='w-[350px] border rounded bg-white shadow-2xl p-5 h-min'>
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
