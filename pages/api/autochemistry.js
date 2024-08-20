import mongoose from 'mongoose'
import connectToDatabase from '@/lib/mongoose'
import Autochemistry from '@/models/Autochemistry'

export default async function handler(req, res) {
	await connectToDatabase()

	if (req.method === 'GET') {
		try {
			const {
				brand,
				consistence,
				capacity,
				classs,
				type,
				color,
				season,
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
				...(brand && {
					brand: { $in: parseArray(brand) },
				}),
				...(consistence && {
					consistence: { $in: parseNumbers(parseArray(consistence)) },
				}),
				...(capacity && {
					capacity: { $in: parseNumbers(parseArray(capacity)) },
				}),
				...(classs && {
					classs: { $in: parseArray(classs) },
				}),
				...(type && {
					type: { $in: parseNumbers(parseArray(type)) },
				}),
				...(color && {
					color: { $in: parseArray(color) },
				}),
				...(season && {
					season: { $in: parseArray(season) },
				}),
				...(price && {
					price: { $in: parseNumbers(parseArray(price)) },
				}),
				...(_id && {
					_id: new mongoose.Types.ObjectId(_id),
				}),
			}

			console.log(query)

			const autochemistry = await Autochemistry.find(query)

			if (autochemistry.length > 0) {
				res.status(200).json(autochemistry)
			} else {
				res.status(404).json({ message: 'autochemistry not found' })
			}
		} catch (error) {
			console.error('Error fetching autochemistry:', error)
			res.status(500).json({ message: 'Error fetching batteries', error })
		}
	} else {
		res.setHeader('Allow', ['GET'])
		res.status(405).end(`Method ${req.method} Not Allowed`)
	}
}
