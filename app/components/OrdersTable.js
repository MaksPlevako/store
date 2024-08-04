'use client'

import React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers-pro'
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs'
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker'
import dayjs from 'dayjs'

export default function OrdersTable({ uniqueStatuses, orders }) {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<form>
				{uniqueStatuses.map(status => (
					<button key={status} value={status}>
						{status}
					</button>
				))}
				<div>
					<label>Date</label>
					<DateRangePicker
						defaultValue={[dayjs('2022-04-17'), dayjs('2022-04-21')]}
					/>
				</div>
			</form>
		</LocalizationProvider>
	)
}
