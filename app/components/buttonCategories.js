'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import ModalCategories from './ModalCategories'

export default function ButtonCategories() {
	const [open, setOpen] = useState(false)

	const changeModal = () => {
		setOpen(!open)
	}
	return (
		<div>
			<button
				className='relative flex flex-row gap-[10px] border rounded-xl bg-[#6B59CC] py-3 px-5 text-white z-20'
				onClick={() => changeModal()}
			>
				<Image src='/img/menu.svg' width={20} height={20} alt='menu' />
				<span>Всі категорії</span>
			</button>
			{open && <ModalCategories changeModal={changeModal} />}
		</div>
	)
}
