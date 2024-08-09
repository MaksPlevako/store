'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function FiltrationBatteries({ batteries, response }) {
	const router = useRouter()

	const [filters, setFilters] = useState({
		battery_name: [],
		battery_capacity: [],
		terminals: [],
		battery_mount: [],
		voltage: [],
		terminal_arrangement: [],
		series: [],
		price: [],
	})

	const [uniqueValues, setUniqueValues] = useState({
		battery_name: [],
		battery_capacity: [],
		voltage: [],
		battery_mount: [],
		terminals: [],
		terminal_arrangement: [],
		series: [],
		price: [],
	})

	useEffect(() => {
		if (response) {
			const uniqueValuesByProperty = property => {
				return [...new Set(batteries.map(battery => battery[property]))]
			}

			setUniqueValues({
				battery_name: uniqueValuesByProperty('battery_name'),
				battery_capacity: uniqueValuesByProperty('battery_capacity'),
				voltage: uniqueValuesByProperty('voltage'),
				battery_mount: uniqueValuesByProperty('battery_mount'),
				terminals: uniqueValuesByProperty('terminals'),
				terminal_arrangement: uniqueValuesByProperty('terminal_arrangement'),
				series: uniqueValuesByProperty('series'),
				price: uniqueValuesByProperty('price'),
			})
		}
	}, [batteries, response])

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
			battery_name: [],
			battery_capacity: [],
			terminals: [],
			battery_mount: [],
			voltage: [],
			terminal_arrangement: [],
			series: [],
			price: [],
		})
		router.push('/car-batteries')
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
		router.push(`/car-batteries?${queryString}`)
	}

	return (
		<form onSubmit={handleSubmit}>
			{response ? (
				<div>
					<div className='text-[18px] font-medium'>Бренд</div>
					{uniqueValues.battery_name.map(brand => (
						<div
							key={brand}
							className='my-1.5 flex flex-row gap-2.5 items-center'
						>
							<input
								type='checkbox'
								name='battery_name'
								value={brand}
								checked={filters.battery_name.includes(brand)}
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
								stroke-width='4'
								stroke-linecap='round'
								stroke-linejoin='round'
							>
								<polyline points='20 6 9 17 4 12'></polyline>
							</svg>
						</div>
					))}
					<div className='my-5 border border-gray-300 w-full' />
					<div className='text-[18px] font-medium'>Емкость батареи, А/ч</div>
					{uniqueValues.battery_capacity.map(capacity => (
						<div
							key={capacity}
							className='my-1.5 flex flex-row gap-2.5 items-center'
						>
							<input
								type='checkbox'
								name='battery_capacity'
								value={capacity}
								checked={filters.battery_capacity.includes(capacity)}
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
								stroke-width='4'
								stroke-linecap='round'
								stroke-linejoin='round'
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
								stroke-width='4'
								stroke-linecap='round'
								stroke-linejoin='round'
							>
								<polyline points='20 6 9 17 4 12'></polyline>
							</svg>
						</div>
					))}
					<div className='my-5 border border-gray-300 w-full' />
					<div className='text-[18px] font-medium'>Крепление аккумулятора</div>
					{uniqueValues.battery_mount.map(mounts => (
						<div
							key={mounts}
							className='my-1.5 flex flex-row gap-2.5 items-center'
						>
							<input
								type='checkbox'
								name='battery_mount'
								value={mounts}
								checked={filters.battery_mount.includes(mounts)}
								className='relative peer appearance-none w-5 h-5 border border-[#DEDEE2] rounded bg-white mt-1 hover:bg-[#5946D7] hover:bg-opacity-20 checked:bg-[#5946D7] checked:border-0'
								onChange={handleCheckboxChange}
							/>
							<label className='text-black font-medium'>{mounts}</label>
							<svg
								className='absolute w-4 h-4 mt-1 ml-0.5 hidden peer-checked:block pointer-events-none'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								fill='none'
								stroke='white'
								stroke-width='4'
								stroke-linecap='round'
								stroke-linejoin='round'
							>
								<polyline points='20 6 9 17 4 12'></polyline>
							</svg>
						</div>
					))}
					<div className='text-[18px] font-medium'>Клеммы</div>
					{uniqueValues.terminals.map(terminals => (
						<div
							key={terminals}
							className='my-1.5 flex flex-row gap-2.5 items-center'
						>
							<input
								type='checkbox'
								name='terminals'
								value={terminals}
								checked={filters.terminals.includes(terminals)}
								className='relative peer appearance-none w-5 h-5 border border-[#DEDEE2] rounded bg-white mt-1 hover:bg-[#5946D7] hover:bg-opacity-20 checked:bg-[#5946D7] checked:border-0'
								onChange={handleCheckboxChange}
							/>
							<label className='text-black font-medium'>{terminals}</label>
							<svg
								className='absolute w-4 h-4 mt-1 ml-0.5 hidden peer-checked:block pointer-events-none'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								fill='none'
								stroke='white'
								stroke-width='4'
								stroke-linecap='round'
								stroke-linejoin='round'
							>
								<polyline points='20 6 9 17 4 12'></polyline>
							</svg>
						</div>
					))}
					<div className='my-5 border border-gray-300 w-full' />
					<div className='text-[18px] font-medium'>
						Расположение полюсных выводов
					</div>
					{uniqueValues.terminal_arrangement.map(arrangements => (
						<div
							key={arrangements}
							className='my-1.5 flex flex-row gap-2.5 items-center'
						>
							<input
								type='checkbox'
								name='terminal_arrangement'
								value={arrangements}
								checked={filters.terminal_arrangement.includes(arrangements)}
								className='relative peer appearance-none w-5 h-5 border border-[#DEDEE2] rounded bg-white mt-1 hover:bg-[#5946D7] hover:bg-opacity-20 checked:bg-[#5946D7] checked:border-0'
								onChange={handleCheckboxChange}
							/>
							<label className='text-black font-medium'>{arrangements}</label>
							<svg
								className='absolute w-4 h-4 mt-1 ml-0.5 hidden peer-checked:block pointer-events-none'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								fill='none'
								stroke='white'
								stroke-width='4'
								stroke-linecap='round'
								stroke-linejoin='round'
							>
								<polyline points='20 6 9 17 4 12'></polyline>
							</svg>
						</div>
					))}
					<div className='my-5 border border-gray-300 w-full' />
					<div className='text-[18px] font-medium'>Серия</div>
					{uniqueValues.series.map(series => (
						<div
							key={series}
							className='my-1.5 flex flex-row gap-2.5 items-center'
						>
							<input
								type='checkbox'
								name='series'
								value={series}
								checked={filters.series.includes(series)}
								className='relative peer appearance-none w-5 h-5 border border-[#DEDEE2] rounded bg-white mt-1 hover:bg-[#5946D7] hover:bg-opacity-20 checked:bg-[#5946D7] checked:border-0'
								onChange={handleCheckboxChange}
							/>
							<label className='text-black font-medium'>{series}</label>
							<svg
								className='absolute w-4 h-4 mt-1 ml-0.5 hidden peer-checked:block pointer-events-none'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								fill='none'
								stroke='white'
								stroke-width='4'
								stroke-linecap='round'
								stroke-linejoin='round'
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
								stroke-width='4'
								stroke-linecap='round'
								stroke-linejoin='round'
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
