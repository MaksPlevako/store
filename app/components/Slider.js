'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const data = [
	{
		id: 1,
		photo: '/img/slider_pc_1.png',
		text: 'Оригинальные автозапчасти cо скидкой',
		promotion: '15%',
		time: 'Акция действует с 1 по 30 июня 2021',
		font: 'white',
	},
	{
		id: 2,
		photo: '/img/slider_pc_2.png',
		text: 'Оригинальные автомасла cо скидкой',
		promotion: '15%',
		time: 'Акция действует с 1 по 30 июня 2021',
		font: 'white',
	},
	{
		id: 3,
		photo: '/img/slider_pc_3.png',
		text: 'Оригинальные автозапчасти cо скидкой',
		promotion: '15%',
		time: 'Акция действует с 1 по 30 июня 2021',
		font: 'black',
	},
]

export default function Slider() {
	return (
		<Swiper
			navigation
			pagination={{ type: 'bullets', clickable: true }}
			autoplay={false}
			loop={true}
			modules={[Autoplay, Navigation, Pagination]}
			className='pagi'
		>
			{data.map(slide => (
				<SwiperSlide key={slide.id}>
					<div
						className={'w-full h-[420px] relative text-' + slide.font}
						style={{
							backgroundImage: `url(${slide.photo})`,
							backgroundSize: 'cover',
							backgroundPosition: 'center',
						}}
					>
						<div className=' absolute top-1/4 left-14 w-[620px]'>
							<div className='text-[40px]'>
								{slide.text}
								<span className='border rounded text-[#FB5C2A] bg-white font-bold ml-2 px-2 py-1'>
									{slide.promotion}
								</span>
							</div>
							<div className='mt-8'>{slide.time}</div>
						</div>
					</div>
				</SwiperSlide>
			))}
		</Swiper>
	)
}
