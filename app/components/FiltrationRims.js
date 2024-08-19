'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function FiltrationRims({ rims, response }) {
	const router = useRouter()

	const [filters, setFilters] = useState({
		rims_name: [],
		rims_diameter: [],
		rims_width: [],
		PCD: [],
		DIA: [],
		ET: [],
		rims_material: [],
		color: [],
		price: [],
	})

	const [uniqueValues, setUniqueValues] = useState({
		rims_name: [],
		rims_diameter: [],
		rims_width: [],
		PCD: [],
		DIA: [],
		ET: [],
		rims_material: [],
		color: [],
		price: [],
	})

	useEffect(() => {
		if (response) {
			const uniqueValuesByProperty = property => {
				if (!property || property.trim() === '') {
					return []
				}

				const filteredValues = rims
					.map(rims => rims[property])
					.filter(
						value =>
							(typeof value === 'string' && value.trim() !== '') ||
							(typeof value === 'number' && !isNaN(value))
					)
				return [...new Set(filteredValues)]
			}

			setUniqueValues({
				rims_name: uniqueValuesByProperty('rims_name'),
				rims_diameter: uniqueValuesByProperty('rims_diameter'),
				rims_width: uniqueValuesByProperty('rims_width'),
				PCD: uniqueValuesByProperty('PCD'),
				DIA: uniqueValuesByProperty('DIA'),
				ET: uniqueValuesByProperty('ET'),
				rims_material: uniqueValuesByProperty('rims_material'),
				color: uniqueValuesByProperty('color'),
				price: uniqueValuesByProperty('price'),
			})
		}
	}, [rims, response])

	useEffect(() => {
		// Инициализация фильтров из URL-параметров
		const params = new URLSearchParams(window.location.search)
		const newFilters = {}
		params.forEach((value, key) => {
			newFilters[key] = value
				.split(',')
				.map(val => (isNaN(val) ? val : Number(val)))
		})
		setFilters(prev => ({
			...prev,
			...newFilters,
		}))
	}, [])

	const handleCheckboxChange = e => {
		const { name, value, checked } = e.target
		setFilters(prev => {
			const newFilters = { ...prev }
			const typedValue = isNaN(value) ? value : Number(value) // Преобразование значения
			if (checked) {
				newFilters[name] = [...(newFilters[name] || []), typedValue]
			} else {
				newFilters[name] = (newFilters[name] || []).filter(
					item => item !== typedValue
				)
			}

			return newFilters
		})
	}

	const reset = () => {
		setFilters({
			rims_name: [],
			rims_diameter: [],
			rims_width: [],
			PCD: [],
			DIA: [],
			ET: [],
			rims_material: [],
			color: [],
			price: [],
		})
		router.push('/rims')
	}

	const handleSubmit = e => {
		e.preventDefault()
		const params = new URLSearchParams()
		Object.keys(filters).forEach(key => {
			if (filters[key].length) {
				params.append(key, filters[key].map(val => val.toString()).join(','))
			}
		})
		const queryString = params.toString()
		router.push(`/rims?${queryString}`)
	}

	return (
		<form onSubmit={handleSubmit}>
			{response ? (
				<div className='overflow-y-scroll overscroll-auto h-screen'>
					<div className='text-[18px] font-medium'>Бренд</div>
					{uniqueValues.rims_name.map(brand => (
						<div
							key={brand}
							className='my-1.5 flex flex-row gap-2.5 items-center'
						>
							<input
								type='checkbox'
								name='rims_name'
								value={brand}
								checked={filters.rims_name.includes(brand)}
								className='relative peer appearance-none w-5 h-5 border border-[#DEDEE2] rounded bg-white mt-1 hover:bg-[#5946D7] hover:bg-opacity-20 checked:bg-[#5946D7] checked:border-0'
								onChange={handleCheckboxChange}
							/>
							<label className='text-black font-medium'>{brand}</label>
							<svg
								className='absolute w-4 h-4 mt-1 ml-0.5 hidden peer-checked:block pointer-events-none'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								fill='none'
								stroke='white'
								strokeWidth='4'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<polyline points='20 6 9 17 4 12'></polyline>
							</svg>
						</div>
					))}
					<div className='my-5 border border-gray-300 w-full' />
					<div className='text-[18px] font-medium'>Діаметр диска (D), "</div>
					{uniqueValues.rims_diameter.map(diameter => (
						<div
							key={diameter}
							className='my-1.5 flex flex-row gap-2.5 items-center'
						>
							<input
								type='checkbox'
								name='rims_diameter'
								value={diameter}
								checked={filters.rims_diameter.includes(diameter)}
								className='relative peer appearance-none w-5 h-5 border border-[#DEDEE2] rounded bg-white mt-1 hover:bg-[#5946D7] hover:bg-opacity-20 checked:bg-[#5946D7] checked:border-0'
								onChange={handleCheckboxChange}
							/>
							<label className='text-black font-medium'>{diameter}</label>
							<svg
								className='absolute w-4 h-4 mt-1 ml-0.5 hidden peer-checked:block pointer-events-none'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								fill='none'
								stroke='white'
								strokeWidth='4'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<polyline points='20 6 9 17 4 12'></polyline>
							</svg>
						</div>
					))}
					<div className='my-5 border border-gray-300 w-full' />
					<div className='text-[18px] font-medium'>Ширина диска (W)</div>
					{uniqueValues.rims_width.map(width => (
						<div
							key={width}
							className='my-1.5 flex flex-row gap-2.5 items-center'
						>
							<input
								type='checkbox'
								name='rims_width'
								value={width}
								checked={filters.rims_width.includes(width)}
								className='relative peer appearance-none w-5 h-5 border border-[#DEDEE2] rounded bg-white mt-1 hover:bg-[#5946D7] hover:bg-opacity-20 checked:bg-[#5946D7] checked:border-0'
								onChange={handleCheckboxChange}
							/>
							<label className='text-black font-medium'>{width}</label>
							<svg
								className='absolute w-4 h-4 mt-1 ml-0.5 hidden peer-checked:block pointer-events-none'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								fill='none'
								stroke='white'
								strokeWidth='4'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<polyline points='20 6 9 17 4 12'></polyline>
							</svg>
						</div>
					))}
					<div className='my-5 border border-gray-300 w-full' />
					<div className='text-[18px] font-medium'>
						Діаметр розташування кріпильних отворів (PCD)
					</div>
					{uniqueValues.PCD.map(pcd => (
						<div
							key={pcd}
							className='my-1.5 flex flex-row gap-2.5 items-center'
						>
							<input
								type='checkbox'
								name='PCD'
								value={pcd}
								checked={filters.PCD.includes(pcd)}
								className='relative peer appearance-none w-5 h-5 border border-[#DEDEE2] rounded bg-white mt-1 hover:bg-[#5946D7] hover:bg-opacity-20 checked:bg-[#5946D7] checked:border-0'
								onChange={handleCheckboxChange}
							/>
							<label className='text-black font-medium'>{pcd}</label>
							<svg
								className='absolute w-4 h-4 mt-1 ml-0.5 hidden peer-checked:block pointer-events-none'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								fill='none'
								stroke='white'
								strokeWidth='4'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<polyline points='20 6 9 17 4 12'></polyline>
							</svg>
						</div>
					))}
					<div className='my-5 border border-gray-300 w-full' />
					<div className='text-[18px] font-medium'>Діаметр маточини (DIA)</div>
					{uniqueValues.DIA.map(dia => (
						<div
							key={dia}
							className='my-1.5 flex flex-row gap-2.5 items-center'
						>
							<input
								type='checkbox'
								name='DIA'
								value={dia}
								checked={filters.DIA.includes(dia)}
								className='relative peer appearance-none w-5 h-5 border border-[#DEDEE2] rounded bg-white mt-1 hover:bg-[#5946D7] hover:bg-opacity-20 checked:bg-[#5946D7] checked:border-0'
								onChange={handleCheckboxChange}
							/>
							<label className='text-black font-medium'>{dia}</label>
							<svg
								className='absolute w-4 h-4 mt-1 ml-0.5 hidden peer-checked:block pointer-events-none'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								fill='none'
								stroke='white'
								strokeWidth='4'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<polyline points='20 6 9 17 4 12'></polyline>
							</svg>
						</div>
					))}
					<div className='my-5 border border-gray-300 w-full' />
					<div className='text-[18px] font-medium'>Виліт (ET), мм</div>
					{uniqueValues.ET.map(et => (
						<div key={et} className='my-1.5 flex flex-row gap-2.5 items-center'>
							<input
								type='checkbox'
								name='ET'
								value={et}
								checked={filters.ET.includes(et)}
								className='relative peer appearance-none w-5 h-5 border border-[#DEDEE2] rounded bg-white mt-1 hover:bg-[#5946D7] hover:bg-opacity-20 checked:bg-[#5946D7] checked:border-0'
								onChange={handleCheckboxChange}
							/>
							<label className='text-black font-medium'>{et}</label>
							<svg
								className='absolute w-4 h-4 mt-1 ml-0.5 hidden peer-checked:block pointer-events-none'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								fill='none'
								stroke='white'
								strokeWidth='4'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<polyline points='20 6 9 17 4 12'></polyline>
							</svg>
						</div>
					))}
					<div className='my-5 border border-gray-300 w-full' />
					<div className='text-[18px] font-medium'>Матеріал диска</div>
					{uniqueValues.rims_material.map(material => (
						<div
							key={material}
							className='my-1.5 flex flex-row gap-2.5 items-center'
						>
							<input
								type='checkbox'
								name='rims_material'
								value={material}
								checked={filters.rims_material.includes(material)}
								className='relative peer appearance-none w-5 h-5 border border-[#DEDEE2] rounded bg-white mt-1 hover:bg-[#5946D7] hover:bg-opacity-20 checked:bg-[#5946D7] checked:border-0'
								onChange={handleCheckboxChange}
							/>
							<label className='text-black font-medium'>{material}</label>
							<svg
								className='absolute w-4 h-4 mt-1 ml-0.5 hidden peer-checked:block pointer-events-none'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								fill='none'
								stroke='white'
								strokeWidth='4'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<polyline points='20 6 9 17 4 12'></polyline>
							</svg>
						</div>
					))}
					<div className='my-5 border border-gray-300 w-full' />
					<div className='text-[18px] font-medium'>Колір</div>
					{uniqueValues.color.map(col => (
						<div
							key={col}
							className='my-1.5 flex flex-row gap-2.5 items-center'
						>
							<input
								type='checkbox'
								name='color'
								value={col}
								checked={filters.color.includes(col)}
								className='relative peer appearance-none w-5 h-5 border border-[#DEDEE2] rounded bg-white mt-1 hover:bg-[#5946D7] hover:bg-opacity-20 checked:bg-[#5946D7] checked:border-0'
								onChange={handleCheckboxChange}
							/>
							<label className='text-black font-medium'>{col}</label>
							<svg
								className='absolute w-4 h-4 mt-1 ml-0.5 hidden peer-checked:block pointer-events-none'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								fill='none'
								stroke='white'
								strokeWidth='4'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<polyline points='20 6 9 17 4 12'></polyline>
							</svg>
						</div>
					))}
					<div className='my-5 border border-gray-300 w-full' />
					<div className='text-[18px] font-medium'>Ціна</div>
					{uniqueValues.price.map(price => (
						<div
							key={price}
							className='my-1.5 flex flex-row gap-2.5 items-center'
						>
							<input
								type='checkbox'
								name='price'
								value={price}
								checked={filters.price.includes(price)}
								className='relative peer appearance-none w-5 h-5 border border-[#DEDEE2] rounded bg-white mt-1 hover:bg-[#5946D7] hover:bg-opacity-20 checked:bg-[#5946D7] checked:border-0'
								onChange={handleCheckboxChange}
							/>
							<label className='text-black font-medium'>{price}</label>
							<svg
								className='absolute w-4 h-4 mt-1 ml-0.5 hidden peer-checked:block pointer-events-none'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								fill='none'
								stroke='white'
								strokeWidth='4'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<polyline points='20 6 9 17 4 12'></polyline>
							</svg>
						</div>
					))}

					<button
						type='submit'
						className='mt-4 border bg-blue-500 text-white py-3.5 px-4 rounded w-full text-lg font-medium hover:bg-white hover:text-black transition-all duration-500 ease-in-out'
					>
						Підтвердити фільтри
					</button>
				</div>
			) : (
				<div>Фільтри недоступні</div>
			)}
			<button
				type='button'
				className='mt-4 border bg-blue-500 text-white py-3.5 px-4 rounded w-full text-lg font-medium hover:bg-white hover:text-black transition-all easy-in-out duration-500'
				onClick={reset}
			>
				Скинути фільтри
			</button>
		</form>
	)
}
