import BatteriesSection from './BatteriesSection'

export default async function BatteriesFilter(res) {
	const query = res.query
	const resBattery = await fetch(
		`http://localhost:3000/api/carBatteries?${query}`,
		{
			next: {
				revalidate: 0,
			},
		}
	)
	const batteries = await resBattery.json()
	if (!batteries) return null

	return (
		<div className='flex flex-row gap-5 '>
			<aside className='w-[300px] border rounded bg-white shadow-2xl p-5'></aside>
			<BatteriesSection batteries={batteries} />
		</div>
	)
}
