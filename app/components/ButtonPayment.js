'use client'
import React, { useState } from 'react'
import ModalPayment from './ModalPayment'
import Image from 'next/image'

export default function ButtonPayment({ email }) {
	const [open, setOpen] = useState(false)
	const changeModal = () => {
		setOpen(!open)
	}
	return (
		<div>
			<button
				className='border rounded-lg bg-[#5946D7] bg-opacity-10 px-5 py-3 flex flex-row gap-3.5 mt-5 text-[#6B59CC] font-medium	'
				onClick={() => setOpen(true)}
			>
				<Image
					src='/img/profile/add_address.svg'
					alt='add'
					width={24}
					height={24}
					className='hover:animate-spin '
				/>
				Добавити карту
			</button>
			{open && <ModalPayment email={email} changeModal={changeModal} />}
		</div>
	)
}
