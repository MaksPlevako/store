'use client'

import React, { useState } from 'react'
import { Rating } from '@mui/material'
import ModalFeedback from './ModalFeedback'
import { useSession } from 'next-auth/react'

export default function SetFeedback({ rating, _id, product_type, comments }) {
	const { data: session } = useSession()
	const [open, setOpen] = useState(false)

	const changeModal = () => {
		setOpen(!open)
	}

	return (
		<div>
			<div className='flex flex-row gap-1 align-top'>
				<Rating
					name='feedback'
					size='large'
					value={rating}
					precision={0.5}
					onClick={() => setOpen(true)}
				/>
				<div className='text-sm'>{comments ? comments : 0} відгуків</div>
			</div>
			{open && (
				<ModalFeedback
					_id={_id}
					changeModal={changeModal}
					session={session}
					product_type={product_type}
				/>
			)}
		</div>
	)
}
