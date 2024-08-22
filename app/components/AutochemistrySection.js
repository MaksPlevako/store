import Image from 'next/image'
import Link from 'next/link'
import { Rating } from '@mui/material'

export default function AutochemistrySection({ autochemistry }) {
	return (
		<main className='w-3/4 grid grid-cols-3 gap-x-2.5 gap-y-5 h-min'>
			{autochemistry.map(autochemistry => (
				<Link
					href={`/autochemistry/${autochemistry._id}`}
					className='border rounded bg-white shadow-2xl p-5 group relative flex flex-col h-[550px]'
					key={autochemistry._id}
				>
					<div className='w-[250px] h-[300px] mx-auto flex items-center'>
						<Image
							src={autochemistry.img}
							alt={autochemistry.brand}
							width={250}
							height={300}
							className='mx-auto h-full w-auto'
						/>
					</div>
					<div className='mt-5'>
						<div className='my-1.5'>{autochemistry.title}</div>
						<Rating
							name='read-only'
							value={autochemistry.average_rating}
							precision={0.5}
							readOnly
						/>
						<div className='text-[#7A7680]'>
							Артикул:
							<span className='text-[#453888]'>{autochemistry.article}</span>
						</div>
						<button className='absolute left-1/2 -translate-x-1/2 bottom-5 border rounded w-11/12 py-2.5 font-medium text-[#6B59CC] bg-[#5946D7] border-[#5946D7] bg-opacity-10 hover:bg-opacity-100 hover:text-white transition-all'>
							Ціна: {autochemistry.price}$
						</button>
						<div className='hidden group-hover:block absolute left-0 top-full w-full bg-white text-[#7A7680] px-5 pb-5 z-50 border rounded-b-lg shadow-2xl transition-all ease-in-out duration-1000'>
							<div className='border bg-gray-300 w-full' />
							<div>
								Консистенція:
								<span className='text-black'>{autochemistry.consistence}</span>
							</div>
							<div>
								Тип:
								<span className='text-black'>{autochemistry.type}</span>
							</div>
							<div>
								Ємність:
								<span className='text-black'>{autochemistry.capacity}</span>
							</div>
							{autochemistry.classs && (
								<div>
									Клас:
									<span className='text-black'>{autochemistry.classs}</span>
								</div>
							)}
							{autochemistry.season && (
								<div>
									Сезон:
									<span className='text-black'>{autochemistry.season}</span>
								</div>
							)}
							{autochemistry.color && (
								<div>
									Колір:
									<span className='text-black'>{autochemistry.color}</span>
								</div>
							)}
						</div>
					</div>
				</Link>
			))}
		</main>
	)
}
