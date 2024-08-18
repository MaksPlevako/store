'use client'

import React, { useState } from 'react'
import { Rating } from '@mui/material'
import ModalFeedback from './ModalFeedback'
import { useSession } from 'next-auth/react'

export default function SetFeedback({ rating, _id, product_type }) {
	const { data: session } = useSession()
	const [open, setOpen] = useState(false)

	const changeModal = () => {
		setOpen(!open)
	}

	return (
		<div>
			<Rating
				name='feedback'
				size='medium'
				value={rating}
				precision={0.5}
				onClick={() => setOpen(true)}
			/>
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
