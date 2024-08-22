import Image from 'next/image'
import Link from 'next/link'
import { Rating } from '@mui/material'

export default function RimsSection({ rims }) {
	return (
		<main className='w-3/4 grid grid-cols-3 gap-x-2.5 gap-y-5 h-min'>
			{rims.map(rim => (
				<Link
					href={`/rims/${rim._id}`}
					className='border rounded bg-white shadow-2xl p-5 group relative flex flex-col h-[550px]'
					key={rim._id}
				>
					<div className='w-[250px] h-[300px] mx-auto flex items-center'>
						<Image
							src={rim.img}
							alt={rim.rims_name}
							width={250}
							height={300}
							className='mx-auto w-auto h-auto'
						/>
					</div>
					<div className=' mt-5'>
						<div className='my-1.5'>{rim.title}</div>
						<Rating
							name='read-only'
							value={rim.average_rating}
							precision={0.5}
							readOnly
						/>
						<div className='text-[#7A7680]'>
							Артикул:
							<span className='text-[#453888]'>{rim.article}</span>
						</div>
						<button className='absolute left-1/2 -translate-x-1/2 bottom-5 border rounded w-11/12 py-2.5 font-medium text-[#6B59CC] bg-[#5946D7] border-[#5946D7] bg-opacity-10 hover:bg-opacity-100 hover:text-white transition-all'>
							Ціна: {rim.price}$
						</button>
						<div className='hidden group-hover:block absolute left-0 top-full bg-white text-[#7A7680] px-5 pb-5 z-50 border rounded-b-lg shadow-2xl transition-all ease-in-out duration-1000'>
							<div className='border bg-gray-300 w-full' />
							<div>
								Діаметр диска (D), ":
								<span className='text-black'>{rim.rims_diameter}</span>
							</div>
							<div>
								Діаметр розташування кріпильних отворів (PCD):
								<span className='text-black'>{rim.PCD}</span>
							</div>
							<div>
								Діаметр маточини (DIA):
								<span className='text-black'>{rim.DIA}</span>
							</div>
							<div>
								Виліт (ET), мм:
								<span className='text-black'>{rim.EM}</span>
							</div>
							<div>
								Ширина диска (W):
								<span className='text-black'>{rim.rims_width}</span>
							</div>
							<div>
								Матеріал диска:
								<span className='text-black'>{rim.rims_material}</span>
							</div>
							<div>
								Колір:
								<span className='text-black'>{rim.color}</span>
							</div>
						</div>
					</div>
				</Link>
			))}
		</main>
	)
}
