import Image from 'next/image'
import Link from 'next/link'

export default function LightsSection({ lights }) {
	return (
		<main className='w-full grid grid-cols-3 gap-x-2.5 gap-y-5 h-min'>
			{lights.map(light => (
				<Link
					href={`/car-light/${light._id}`}
					className='border rounded bg-white shadow-2xl p-5 group relative flex flex-col h-[550px]'
					key={light._id}
				>
					<div className='w-[250px] h-[300px] mx-auto flex items-center'>
						<Image
							src={light.img}
							alt={light.brand}
							width={200}
							height={250}
							className='mx-auto w-full'
						/>
					</div>
					<div>
						<div className='text-[18px] font-medium'>{light.brand}</div>
						<div className='my-1.5'>{light.title}</div>
						<div className='text-[#7A7680]'>
							Артикул:
							<span className='text-[#453888]'>{light.article}</span>
						</div>
						<button className='absolute left-1/2 -translate-x-1/2 bottom-5 border rounded w-11/12 py-2.5 font-medium text-[#6B59CC] bg-[#5946D7] border-[#5946D7] bg-opacity-10 hover:bg-opacity-100 hover:text-white transition-all'>
							Ціна: {light.price}$
						</button>
						<div className='hidden group-hover:block absolute left-0 top-full w-full bg-white text-[#7A7680] px-5 pb-5 z-50 border rounded-b-lg shadow-2xl transition-all ease-in-out duration-1000'>
							<div className='border bg-gray-300 w-full' />
							<div>
								Тип лампи:
								<span className='text-black'>{light.type}</span>
							</div>
							<div>
								Вид лампи:
								<span className='text-black'>{light.lamp_kind}</span>
							</div>
							<div>
								Колірна температура:
								<span className='text-black'>{light.color_temperature}</span>
							</div>
							<div>
								Цоколь:
								<span className='text-black'>{light.socle}</span>
							</div>
							<div>
								Колір світла:
								<span className='text-black'>{light.color}</span>
							</div>
							<div>
								Призначення:
								<span className='text-black'>{light.assignment}</span>
							</div>
							<div>
								Потужність:
								<span className='text-black'>{light.power}</span>
							</div>
							<div>
								Вольтаж:
								<span className='text-black'>{light.voltage}</span>
							</div>
						</div>
					</div>
				</Link>
			))}
		</main>
	)
}
