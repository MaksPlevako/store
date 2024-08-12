import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export default async function handler(req, res) {
	const client = await clientPromise
	const db = client.db('store')

	if (req.method === 'GET') {
		try {
			const {
				brand,
				type,
				lamp_kind,
				color_temperature,
				socle,
				color,
				assignment,
				power,
				voltage,
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
				...(type && {
					type: { $in: parseArray(type) },
				}),
				...(lamp_kind && {
					lamp_kind: { $in: parseArray(lamp_kind) },
				}),
				...(color_temperature && {
					color_temperature: { $in: parseArray(color_temperature) },
				}),
				...(socle && {
					socle: { $in: parseArray(socle) },
				}),
				...(assignment && {
					assignment: { $in: parseArray(assignment) },
				}),
				...(power && {
					power: { $in: parseNumbers(parseArray(power)) },
				}),
				...(voltage && {
					voltage: { $in: parseNumbers(parseArray(voltage)) },
				}),
				...(color && {
					color: { $in: parseArray(color) },
				}),
				...(price && {
					price: { $in: parseNumbers(parseArray(price)) },
				}),
				...(_id && {
					_id: new ObjectId(_id),
				}),
			}

			const lights = await db.collection('car_lights').find(query).toArray()

			if (lights.length > 0) {
				res.status(200).json(lights)
			} else {
				res.status(404).json({ message: 'Lights not found' })
			}
		} catch (error) {
			res.status(500).json({ message: 'Error fetching lights', error })
		}
	} else {
		res.setHeader('Allow', ['GET'])
		res.status(405).end(`Method ${req.method} Not Allowed`)
	}
}
