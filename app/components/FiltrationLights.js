'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function FiltrationLights({ lights, response }) {
	const router = useRouter()

	const [filters, setFilters] = useState({
		brand: [],
		type: [],
		lamp_kind: [],
		color_temperature: [],
		socle: [],
		color: [],
		assignment: [],
		power: [],
		voltage: [],
		price: [],
	})

	const [uniqueValues, setUniqueValues] = useState({
		brand: [],
		type: [],
		lamp_kind: [],
		color_temperature: [],
		socle: [],
		color: [],
		assignment: [],
		power: [],
		voltage: [],
		price: [],
	})

	useEffect(() => {
		if (response) {
			const uniqueValuesByProperty = property => {
				if (!property || property.trim() === '') {
					return []
				}

				const filteredValues = lights
					.map(light => light[property])
					.filter(
						value =>
							(typeof value === 'string' && value.trim() !== '') ||
							(typeof value === 'number' && !isNaN(value))
					)
				return [...new Set(filteredValues)]
			}

			setUniqueValues({
				brand: uniqueValuesByProperty('brand'),
				type: uniqueValuesByProperty('type'),
				lamp_kind: uniqueValuesByProperty('lamp_kind'),
				color_temperature: uniqueValuesByProperty('color_temperature'),
				socle: uniqueValuesByProperty('socle'),
				color: uniqueValuesByProperty('color'),
				assignment: uniqueValuesByProperty('assignment'),
				power: uniqueValuesByProperty('power'),
				voltage: uniqueValuesByProperty('voltage'),
				price: uniqueValuesByProperty('price'),
			})
		}
	}, [lights, response])

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
			type: [],
			lamp_kind: [],
			color_temperature: [],
			socle: [],
			color: [],
			assignment: [],
			power: [],
			voltage: [],
			price: [],
		})
		router.push('/car-light')
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
		router.push(`/car-light?${queryString}`)
	}

	return (
		<form onSubmit={handleSubmit}>
			{response ? (
				<div className='overflow-y-scroll overscroll-auto h-screen scroll-smooth'>
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
					<div className='text-[18px] font-medium'>Тип лампи</div>
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
					<div className='text-[18px] font-medium'>Вид лампи</div>
					{uniqueValues.lamp_kind.map(kind => (
						<div
							key={kind}
							className='my-1.5 flex flex-row gap-2.5 items-center'
						>
							<input
								type='checkbox'
								name='lamp_kind'
								value={kind}
								checked={filters.lamp_kind.includes(kind)}
								className='relative peer appearance-none w-5 h-5 border border-[#DEDEE2] rounded bg-white mt-1 hover:bg-[#5946D7] hover:bg-opacity-20 checked:bg-[#5946D7] checked:border-0'
								onChange={handleCheckboxChange}
							/>
							<label className='text-black font-medium'>{kind}</label>
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
					<div className='text-[18px] font-medium'>Колірна температура</div>
					{uniqueValues.color_temperature.map(color_temperature => (
						<div
							key={color_temperature}
							className='my-1.5 flex flex-row gap-2.5 items-center'
						>
							<input
								type='checkbox'
								name='color_temperature'
								value={color_temperature}
								checked={filters.color_temperature.includes(color_temperature)}
								className='relative peer appearance-none w-5 h-5 border border-[#DEDEE2] rounded bg-white mt-1 hover:bg-[#5946D7] hover:bg-opacity-20 checked:bg-[#5946D7] checked:border-0'
								onChange={handleCheckboxChange}
							/>
							<label className='text-black font-medium'>
								{color_temperature}
							</label>
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
					<div className='text-[18px] font-medium'>Цоколь</div>
					{uniqueValues.socle.map((socle, index) => (
						<div
							key={index}
							className='my-1.5 flex flex-row gap-2.5 items-center'
						>
							<input
								type='checkbox'
								name='socle'
								value={socle}
								checked={filters.socle.includes(socle)}
								className='relative peer appearance-none w-5 h-5 border border-[#DEDEE2] rounded bg-white mt-1 hover:bg-[#5946D7] hover:bg-opacity-20 checked:bg-[#5946D7] checked:border-0'
								onChange={handleCheckboxChange}
							/>
							<label className='text-black font-medium'>{socle}</label>
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
					<div className='text-[18px] font-medium'>Колір світла</div>
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
					<div className='text-[18px] font-medium'>Призначення</div>
					{uniqueValues.assignment.map(assignment => (
						<div
							key={assignment}
							className='my-1.5 flex flex-row gap-2.5 items-center'
						>
							<input
								type='checkbox'
								name='assignment'
								value={assignment}
								checked={filters.assignment.includes(assignment)}
								className='relative peer appearance-none w-5 h-5 border border-[#DEDEE2] rounded bg-white mt-1 hover:bg-[#5946D7] hover:bg-opacity-20 checked:bg-[#5946D7] checked:border-0'
								onChange={handleCheckboxChange}
							/>
							<label className='text-black font-medium'>{assignment}</label>
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
					<div className='text-[18px] font-medium'>Потужність</div>
					{uniqueValues.power.map(power => (
						<div
							key={power}
							className='my-1.5 flex flex-row gap-2.5 items-center'
						>
							<input
								type='checkbox'
								name='power'
								value={power}
								checked={filters.power.includes(power)}
								className='relative peer appearance-none w-5 h-5 border border-[#DEDEE2] rounded bg-white mt-1 hover:bg-[#5946D7] hover:bg-opacity-20 checked:bg-[#5946D7] checked:border-0'
								onChange={handleCheckboxChange}
							/>
							<label className='text-black font-medium'>{power}</label>
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
					<div className='text-[18px] font-medium'>Вольтаж</div>
					{uniqueValues.voltage.map(voltage => (
						<div
							key={voltage}
							className='my-1.5 flex flex-row gap-2.5 items-center'
						>
							<input
								type='checkbox'
								name='voltage'
								value={voltage}
								checked={filters.voltage.includes(voltage)}
								className='relative peer appearance-none w-5 h-5 border border-[#DEDEE2] rounded bg-white mt-1 hover:bg-[#5946D7] hover:bg-opacity-20 checked:bg-[#5946D7] checked:border-0'
								onChange={handleCheckboxChange}
							/>
							<label className='text-black font-medium'>{voltage}</label>
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
					{uniqueValues.price.map((price, index) => (
						<div
							key={index}
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
