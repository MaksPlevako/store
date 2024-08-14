import mongoose from 'mongoose'
import Rims from '@/models/Rims' // Импортируйте вашу модель
import connectToDatabase from '@/lib/mongoose' // Функция для подключения к базе данных

export default async function handler(req, res) {
	await connectToDatabase() // Подключитесь к базе данных через Mongoose

	if (req.method === 'GET') {
		try {
			const {
				rims_name,
				rims_diameter,
				rims_width,
				PCD,
				DIA,
				ET,
				rims_material,
				color,
				price,
				_id,
			} = req.query

			const parseArray = param => (param ? param.split(',') : [])
			const parseNumbers = arr =>
				arr.map(val => {
					const num = parseFloat(val)
					return isNaN(num) ? val : num
				})

			const query = {
				...(rims_name && { rims_name: { $in: parseArray(rims_name) } }),
				...(rims_diameter && {
					rims_diameter: { $in: parseNumbers(parseArray(rims_diameter)) },
				}),
				...(rims_width && {
					rims_width: { $in: parseNumbers(parseArray(rims_width)) },
				}),
				...(PCD && { PCD: { $in: parseArray(PCD) } }),
				...(DIA && { DIA: { $in: parseNumbers(parseArray(DIA)) } }),
				...(ET && { ET: { $in: parseNumbers(parseArray(ET)) } }),
				...(rims_material && {
					rims_material: { $in: parseArray(rims_material) },
				}),
				...(color && { color: { $in: parseArray(color) } }),
				...(price && { price: { $in: parseNumbers(parseArray(price)) } }),
				...(_id && { _id: new mongoose.Types.ObjectId(_id) }),
			}

			const rims = await Rims.find(query) // Используйте модель Mongoose для поиска

			if (rims.length > 0) {
				res.status(200).json(rims)
			} else {
				res.status(404).json({ message: 'Rims not found' })
			}
		} catch (error) {
			res.status(500).json({ message: 'Error fetching rims', error })
		}
	} else {
		res.setHeader('Allow', ['GET'])
		res.status(405).end(`Method ${req.method} Not Allowed`)
	}
}
