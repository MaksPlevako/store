import AutochemistrySection from './AutochemistrySection'
import FiltrationAutochemistry from './FiltrationAutochemistry'

export default async function AutochemistryFilter({ searchParams }) {
	const joinOrEmpty = param =>
		Array.isArray(param) ? param.join(',') : param || ''

	const brand = joinOrEmpty(searchParams.brand)
	const consistence = joinOrEmpty(searchParams.consistence)
	const capacity = joinOrEmpty(searchParams.capacity)
	const classs = joinOrEmpty(searchParams.classs)
	const type = joinOrEmpty(searchParams.type)
	const color = joinOrEmpty(searchParams.color)
	const season = joinOrEmpty(searchParams.season)
	const price = joinOrEmpty(searchParams.price)

	const queryParams = new URLSearchParams({
		brand,
		consistence,
		capacity,
		classs,
		type,
		color,
		season,
		price,
	}).toString()

	const resAutochemistry = await fetch(
		`http://localhost:3000/api/autochemistry?${queryParams}`,
		{
			next: {
				revalidate: 0,
			},
		}
	)
	const autochemistry = await resAutochemistry.json()

	if (!autochemistry) return null

	return (
		<div className='flex flex-row gap-5 relative'>
			<aside className='w-[350px] border rounded bg-white shadow-2xl p-5 h-min'>
				<FiltrationAutochemistry
					autochemistry={autochemistry}
					response={resAutochemistry.ok}
				/>
			</aside>
			{resAutochemistry.ok ? (
				<AutochemistrySection autochemistry={autochemistry} />
			) : (
				<div className='absolute top-1/2 left-1/2 text-2xl font-bold'>
					Автохімії не знайдено
				</div>
			)}
		</div>
	)
}
