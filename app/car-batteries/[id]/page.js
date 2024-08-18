import Image from 'next/image'
import Link from 'next/link'
import SetFeedback from '@/app/components/SetFeedback'
import CommentSlider from '@/app/components/CommentSlider'
import CarBatteries from '../page'

export default async function Battery({ params }) {
	const resBattery = await fetch(
		`http://localhost:3000/api/carBatteries?_id=${params.id}`,
		{
			next: {
				revalidate: 0,
			},
		}
	)

	const battery = await resBattery.json()

	const resComment = await fetch(
		`http://localhost:3000/api/comments?product_id=${params.id}`
	)

	const comments = await resComment.json()

	if (!battery) return null
	if (!comments) return null

	return (
		<section className='container mx-auto mt-5 mb-10'>
			<nav className='flex flex-row my-5' aria-label='Breadcrumb'>
				<ol className='inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse'>
					<li className='inline-flex items-center'>
						<Link
							href='/'
							className='inline-flex items-center text-sm font-medium text-gray-700 hover:text-black'
						>
							<svg
								className='w-3 h-3 me-2.5'
								aria-hidden='true'
								xmlns='http://www.w3.org/2000/svg'
								fill='currentColor'
								viewBox='0 0 20 20'
							>
								<path d='m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z' />
							</svg>
							Головна
						</Link>
					</li>
					<li>
						<div className='flex items-center'>
							<svg
								className='rtl:rotate-180 w-3 h-3 text-gray-400 mx-1'
								aria-hidden='true'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 6 10'
							>
								<path
									stroke='currentColor'
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='m1 9 4-4-4-4'
								/>
							</svg>
							<Link
								href='/car-batteries'
								className='ms-1 text-sm font-medium text-gray-700 hover:text-black'
							>
								Акумулятори
							</Link>
						</div>
					</li>
					<li aria-current='page'>
						<div className='flex items-center'>
							<svg
								className='rtl:rotate-180 w-3 h-3 text-gray-400 mx-1'
								aria-hidden='true'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 6 10'
							>
								<path
									stroke='currentColor'
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='m1 9 4-4-4-4'
								/>
							</svg>
							<span className='ms-1 text-sm font-medium text-gray-500'>
								Акумулятор {battery.battery_name}
							</span>
						</div>
					</li>
				</ol>
			</nav>
			{battery.map(bat => (
				<div
					className='border rounded bg-white shadow-2xl p-5 flex flex-row '
					key={bat._id}
				>
					<div className='w-1/2 mx-auto'>
						<Image
							src={bat.img}
							alt={bat.article}
							width={300}
							height={300}
							className='h-min w-full'
						/>
						{comments.length > 0 ? (
							<div className='w-full h-min'>
								<CommentSlider comments={comments} />
							</div>
						) : (
							<div className='text-2xl font-medium text-center mt-14'>
								Коментарів немає
							</div>
						)}
					</div>
					<div className='w-1/2'>
						<div className='text-2xl font-medium mb-5'>{bat.title}</div>
						<div className='flex flex-row justify-between items-center'>
							<SetFeedback
								rating={bat.average_rating}
								_id={bat._id}
								product_type={'carBatteries'}
							/>
							<div className='text-gray-600'>
								Артикул: <span className='text-blue-700'>{bat.article}</span>
							</div>
						</div>
						<div className='flex flex-row justify-around items-center border rounded shadow-xl p-4 my-5'>
							<div className='text-2xl font-medium'>Ціна: {bat.price}$</div>
							<div>
								<button className='border-2 rounded bg-blue-500 border-blue-500 px-6 py-4 text-xl font-medium text-white mx-2 hover:bg-white hover:text-black transition-all ease-in-out duration-300'>
									До кошика
								</button>
								<button className='border-2 rounded bg-blue-500 border-blue-500 px-6 py-4 text-xl font-medium text-white mx-2 hover:bg-white hover:text-black transition-all ease-in-out duration-300'>
									Купити
								</button>
							</div>
						</div>
						<div className='border rounded bg-white shadow-xl p-5 '>
							<div className='text-2xl font-medium'>Опис</div>
							<div className='border border-gray-400 w-full my-3' />
							<div className=''>{bat.title}</div>
						</div>
						<div className='border rounded p-5 shadow-xl bg-white my-5'>
							<div className='text-2xl font-medium'>Характеристики</div>
							<div className='border border-gray-400 w-full my-3' />
							<div className='grid grid-cols-3 gap-3'>
								<div className='col-span-2'>Напряжение, B:</div>
								<div>{bat.voltage}</div>
								<div className='col-span-2'>Емкость батареи, B:</div>
								<div>{bat.battery_capacity}</div>
								<div className='col-span-2'>Кріплення акумулятора:</div>
								<div>{bat.battery_mount}</div>
								<div className='col-span-2'>
									Расположение полюсных выводов, B:
								</div>
								<div>{bat.terminal_arrangement}</div>
								<div className='col-span-2'>Клеммы, B: </div>
								<div>{bat.terminals}</div>
								<div className='col-span-2'>Серія: </div>
								<div>{bat.series}</div>
							</div>
						</div>
					</div>
				</div>
			))}
		</section>
	)
}
