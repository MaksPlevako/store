import Image from 'next/image'

export default function BatteriesSection({ batteries }) {
	return (
		<main className='w-full grid grid-cols-3 gap-x-2.5 gap-y-5'>
			{batteries.map(battery => (
				<div
					className='border rounded bg-white shadow-2xl p-5 group relative h-min'
					key={battery._id}
				>
					<Image
						src={battery.img}
						alt={battery.battery_name}
						width={260}
						height={200}
						className='mx-auto'
					/>
					<div>
						<div className='text-[18px] font-medium'>
							{battery.battery_name}
						</div>
						<div className='my-1.5'>{battery.title}</div>
						<div className='text-[#7A7680]'>
							Артикуль:
							<span className='text-[#453888]'>{battery.article}</span>
						</div>
						<button className='border rounded w-full py-2.5 mt-3 font-medium text-[#6B59CC] bg-[#5946D7] border-[#5946D7] bg-opacity-10 hover:bg-opacity-100 hover:text-white transition-all'>
							Ціна: {battery.price}$
						</button>
						<div className='hidden group-hover:block absolute left-0 top-full bg-white text-[#7A7680] px-5 pb-5 z-50 border rounded-b-lg shadow-2xl transition-all ease-in-out duration-1000'>
							<div className='border bg-gray-300 w-full' />
							<div>
								Напряжение, B:
								<span className='text-black'>{battery.voltage}</span>
							</div>
							<div>
								Емкость батареи, B:
								<span className='text-black'>{battery.battery_capacity}</span>
							</div>
							<div>
								Расположение полюсных выводов, B:
								<span className='text-black'>
									{battery.terminal_arrangement}
								</span>
							</div>
							<div>
								Клеммы, B:
								<span className='text-black'>{battery.terminals}</span>
							</div>
						</div>
					</div>
				</div>
			))}
		</main>
	)
}
