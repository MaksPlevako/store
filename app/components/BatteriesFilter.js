import BatteriesSection from './BatteriesSection'
import FiltrationBatteries from './FiltrationBatteries'

export default async function BatteriesFilter({ searchParams }) {
	const battery_name = Array.isArray(searchParams.battery_name)
		? searchParams.battery_name.join(',')
		: searchParams.battery_name || ''
	const battery_capacity = Array.isArray(searchParams.battery_capacity)
		? searchParams.battery_capacity.join(',')
		: searchParams.battery_capacity || ''
	const terminals = Array.isArray(searchParams.terminals)
		? searchParams.terminals.join(',')
		: searchParams.terminals || ''
	const battery_mount = Array.isArray(searchParams.battery_mount)
		? searchParams.battery_mount.join(',')
		: searchParams.battery_mount || ''
	const voltage = Array.isArray(searchParams.voltage)
		? searchParams.voltage.join(',')
		: searchParams.voltage || ''
	const terminal_arrangement = Array.isArray(searchParams.terminal_arrangement)
		? searchParams.terminal_arrangement.join(',')
		: searchParams.terminal_arrangement || ''
	const series = Array.isArray(searchParams.series)
		? searchParams.series.join(',')
		: searchParams.series || ''
	const price = Array.isArray(searchParams.price)
		? searchParams.price.join(',')
		: searchParams.price || ''

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
			<aside className='w-[350px] border rounded bg-white shadow-2xl p-5'>
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
