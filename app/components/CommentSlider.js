'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay, EffectCards } from 'swiper/modules'
import { Rating } from '@mui/material'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-cards'
import 'swiper/css/autoplay'

export default function CommentSlider({ comments }) {
	return (
		<div className='mx-auto w-full'>
			<Swiper
				effect='cards'
				navigation
				grabCursor={true}
				loop={true}
				autoplay={true}
				modules={[Navigation, EffectCards, Autoplay]}
				className='mySwiper mx-auto w-11/12'
				cardsEffect={{ slideShadows: false }}
			>
				{comments.map(comment => (
					<SwiperSlide key={comment._id}>
						<div className='p-5 border bg-white shadow-2xl rounded w-10/12 mx-auto h-auto'>
							<div className='text-2xl font-medium '>
								{comment.user_id.name}
							</div>
							<div className='my-1'>
								<Rating
									name='read-only'
									value={comment.rating}
									precision={0.5}
									readOnly
								/>
							</div>
							<div className='text-lg w-full'>
								<p className='w-11/12 break-normal hyphens-auto'>
									{comment.comment}
								</p>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}
