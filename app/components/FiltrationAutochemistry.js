'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function FiltrationAutochemistry({ autochemistry, response }) {
	const router = useRouter()

	const [filters, setFilters] = useState({
		brand: [],
		consistence: [],
		capacity: [],
		classs: [],
		type: [],
		color: [],
		season: [],
		price: [],
	})

	const [uniqueValues, setUniqueValues] = useState({
		brand: [],
		consistence: [],
		capacity: [],
		classs: [],
		type: [],
		color: [],
		season: [],
		price: [],
	})

	useEffect(() => {
		if (response) {
			const uniqueValuesByProperty = property => {
				if (!property || property.trim() === '') {
					return []
				}

				const filteredValues = autochemistry
					.map(autochemistry => autochemistry[property])
					.filter(
						value =>
							(typeof value === 'string' && value.trim() !== '') ||
							(typeof value === 'number' && !isNaN(value))
					)
				return [...new Set(filteredValues)]
			}

			setUniqueValues({
				brand: uniqueValuesByProperty('brand'),
				consistence: uniqueValuesByProperty('consistence'),
				capacity: uniqueValuesByProperty('capacity'),
				classs: uniqueValuesByProperty('classs'),
				type: uniqueValuesByProperty('type'),
				color: uniqueValuesByProperty('color'),
				season: uniqueValuesByProperty('season'),
				price: uniqueValuesByProperty('price'),
			})
		}
	}, [autochemistry, response])

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
			brand: [],
			consistence: [],
			capacity: [],
			classs: [],
			type: [],
			color: [],
			season: [],
			price: [],
		})
		router.push('/autochemistry')
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
		router.push(`/autochemistry?${queryString}`)
	}

	return (
		<form onSubmit={handleSubmit}>
			{response ? (
				<div className='overflow-y-scroll overscroll-auto h-screen'>
					<div className='text-[18px] font-medium'>Бренд</div>
					{uniqueValues.brand.map(brand => (
						<div
							key={brand}
							className='my-1.5 flex flex-row gap-2.5 items-center'
						>
							<input
								type='checkbox'
								name='brand'
								value={brand}
								checked={filters.brand.includes(brand)}
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
					<div className='text-[18px] font-medium'>Консистенція</div>
					{uniqueValues.consistence.map(consistence => (
						<div
							key={consistence}
							className='my-1.5 flex flex-row gap-2.5 items-center'
						>
							<input
								type='checkbox'
								name='consistence'
								value={consistence}
								checked={filters.consistence.includes(consistence)}
								className='relative peer appearance-none w-5 h-5 border border-[#DEDEE2] rounded bg-white mt-1 hover:bg-[#5946D7] hover:bg-opacity-20 checked:bg-[#5946D7] checked:border-0'
								onChange={handleCheckboxChange}
							/>
							<label className='text-black font-medium'>{consistence}</label>
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
					<div className='text-[18px] font-medium'>Тип</div>
					{uniqueValues.type.map(type => (
						<div
							key={type}
							className='my-1.5 flex flex-row gap-2.5 items-center'
						>
							<input
								type='checkbox'
								name='type'
								value={type}
								checked={filters.type.includes(type)}
								className='relative peer appearance-none w-5 h-5 border border-[#DEDEE2] rounded bg-white mt-1 hover:bg-[#5946D7] hover:bg-opacity-20 checked:bg-[#5946D7] checked:border-0'
								onChange={handleCheckboxChange}
							/>
							<label className='text-black font-medium'>{type}</label>
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
					<div className='text-[18px] font-medium'>Ємність</div>
					{uniqueValues.capacity.map(capacity => (
						<div
							key={capacity}
							className='my-1.5 flex flex-row gap-2.5 items-center'
						>
							<input
								type='checkbox'
								name='capacity'
								value={capacity}
								checked={filters.capacity.includes(capacity)}
								className='relative peer appearance-none w-5 h-5 border border-[#DEDEE2] rounded bg-white mt-1 hover:bg-[#5946D7] hover:bg-opacity-20 checked:bg-[#5946D7] checked:border-0'
								onChange={handleCheckboxChange}
							/>
							<label className='text-black font-medium'>{capacity}</label>
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
					<div className='text-[18px] font-medium'>Клас</div>
					{uniqueValues.classs.map(classs => (
						<div
							key={classs}
							className='my-1.5 flex flex-row gap-2.5 items-center'
						>
							<input
								type='checkbox'
								name='classs'
								value={classs}
								checked={filters.classs.includes(classs)}
								className='relative peer appearance-none w-5 h-5 border border-[#DEDEE2] rounded bg-white mt-1 hover:bg-[#5946D7] hover:bg-opacity-20 checked:bg-[#5946D7] checked:border-0'
								onChange={handleCheckboxChange}
							/>
							<label className='text-black font-medium'>{classs}</label>
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
					{uniqueValues.color.map(color => (
						<div
							key={color}
							className='my-1.5 flex flex-row gap-2.5 items-center'
						>
							<input
								type='checkbox'
								name='color'
								value={color}
								checked={filters.color.includes(color)}
								className='relative peer appearance-none w-5 h-5 border border-[#DEDEE2] rounded bg-white mt-1 hover:bg-[#5946D7] hover:bg-opacity-20 checked:bg-[#5946D7] checked:border-0'
								onChange={handleCheckboxChange}
							/>
							<label className='text-black font-medium'>{color}</label>
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
					<div className='text-[18px] font-medium'>Сезон</div>
					{uniqueValues.season.map(season => (
						<div
							key={season}
							className='my-1.5 flex flex-row gap-2.5 items-center'
						>
							<input
								type='checkbox'
								name='season'
								value={season}
								checked={filters.season.includes(season)}
								className='relative peer appearance-none w-5 h-5 border border-[#DEDEE2] rounded bg-white mt-1 hover:bg-[#5946D7] hover:bg-opacity-20 checked:bg-[#5946D7] checked:border-0'
								onChange={handleCheckboxChange}
							/>
							<label className='text-black font-medium'>{season}</label>
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
					<div className='text-[18px] font-medium'>Цена</div>
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
				</div>
			) : (
				<div>Фільтри недоступні</div>
			)}
			<button
				type='submit'
				className='mt-4 border bg-blue-500 text-white py-3.5 px-4 rounded w-full text-lg font-medium hover:bg-white hover:text-black transition-all duration-500 ease-in-out'
			>
				Підтвердити фільтри
			</button>
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
