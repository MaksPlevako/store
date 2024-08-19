import BatteriesSection from './BatteriesSection'
import FiltrationBatteries from './FiltrationBatteries'

export default async function BatteriesFilter({ searchParams }) {
	const joinOrEmpty = param =>
		Array.isArray(param) ? param.join(',') : param || ''

	const battery_name = joinOrEmpty(searchParams.battery_name)
	const battery_capacity = joinOrEmpty(searchParams.battery_capacity)
	const terminals = joinOrEmpty(searchParams.terminals)
	const battery_mount = joinOrEmpty(searchParams.battery_mount)
	const voltage = joinOrEmpty(searchParams.voltage)
	const terminal_arrangement = joinOrEmpty(searchParams.terminal_arrangement)
	const series = joinOrEmpty(searchParams.series)
	const price = joinOrEmpty(searchParams.price)

	const queryParams = new URLSearchParams({
		battery_name,
		battery_capacity,
		terminals,
		battery_mount,
		voltage,
		terminal_arrangement,
		series,
		price,
	}).toString()

	const resBattery = await fetch(
		`http://localhost:3000/api/carBatteries?${queryParams}`,
		{
			next: {
				revalidate: 0,
			},
		}
	)
	const batteries = await resBattery.json()

	if (!batteries) return null

	return (
		<div className='flex flex-row gap-5 relative'>
			<aside className='w-[350px] border rounded bg-white shadow-2xl p-5 h-min'>
				<FiltrationBatteries batteries={batteries} response={resBattery.ok} />
			</aside>
			{resBattery.ok ? (
				<BatteriesSection batteries={batteries} />
			) : (
				<div className='absolute top-1/2 left-1/2 text-2xl font-bold'>
					Акумулятори не знайдено
				</div>
			)}
		</div>
	)
}
