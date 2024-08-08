import CarModal from '../components/CarModal'

export default function OriginalDetails() {
	return (
		<section className='container mx-auto'>
			<div className='text-2xl font-medium mb-5'>
				Каталоги оригинальных запчастей
			</div>
			<div className='border w-full rounded shadow-2xl bg-white py-6 px-16 flex flex-row gap-[70px]'>
				<div className='w-full'>
					<div className='text-[20px] font-medium'>
						Поиск модели по VIN-номеру:
					</div>
					<form className='my-2.5'>
						<div className='relative'>
							<input
								type='search'
								placeholder='Введите VIN'
								className='px-5 py-4 w-full border border-[#C5C3C8] rounded-lg'
								required
							/>
							<button
								type='submit'
								className='absolute top-1/2 -translate-y-1/2 right-1 border rounded-lg p-2 bg-[#6B59CC] border-[#6B59CC] text-[#6B59CC] bg-opacity-10 hover:bg-opacity-100 hover:text-white transition-all duration-300'
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth={1.5}
									stroke='currentColor'
									className='size-6 text-inherit'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
									/>
								</svg>
							</button>
						</div>
					</form>
					<div className='text-sm text-[#7A7680]'>
						Например: <span className='text-[#6B59CC]'>WAUBH54B11N111054</span>
					</div>
				</div>
				<div className='border h-[full] w-[1px] border-[#E8E3E3]' />
				<div className='w-full'>
					<div className='text-[20px] font-medium'>
						Поиск модели по коду/номеру кузова:
					</div>
					<form className='my-2.5'>
						<div className='relative'>
							<input
								type='search'
								placeholder='Введите код/номер кузова'
								className='px-5 py-4 w-full border border-[#C5C3C8] rounded-lg'
								required
							/>
							<button
								type='submit'
								className='absolute top-1/2 -translate-y-1/2 right-1 border rounded-lg p-2 bg-[#6B59CC] border-[#6B59CC] text-[#6B59CC] bg-opacity-10 hover:bg-opacity-100 hover:text-white transition-all duration-300'
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth={1.5}
									stroke='currentColor'
									className='size-6 text-inherit'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
									/>
								</svg>
							</button>
						</div>
					</form>
					<div className='text-sm text-[#7A7680]'>
						Например: <span className='text-[#6B59CC]'>AGH30-0115914</span>
					</div>
				</div>
			</div>
			<CarModal />
		</section>
	)
}
