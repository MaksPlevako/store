import clientPromise from '@/lib/mongodb'

export default async function handler(req, res) {
	const client = await clientPromise
	const db = client.db('store')

	if (req.method === 'GET') {
		try {
			const {
				battery_name,
				battery_capacity,
				terminals,
				battery_mount,
				voltage,
				terminal_arrangement,
				series,
				price,
			} = req.query

			const parseArray = param => (param ? param.split(',') : [])

			const parseNumbers = arr =>
				arr.map(val => {
					const num = parseFloat(val)
					return isNaN(num) ? val : num
				})

			const query = {
				...(battery_name && {
					battery_name: { $in: parseArray(battery_name) },
				}),
				...(battery_capacity && {
					battery_capacity: { $in: parseNumbers(parseArray(battery_capacity)) },
				}),
				...(terminals && {
					terminals: { $in: parseNumbers(parseArray(terminals)) },
				}),
				...(battery_mount && {
					battery_mount: { $in: parseArray(battery_mount) },
				}),
				...(voltage && {
					voltage: { $in: parseNumbers(parseArray(voltage)) },
				}),
				...(terminal_arrangement && {
					terminal_arrangement: { $in: parseArray(terminal_arrangement) },
				}),
				...(series && {
					series: { $in: parseArray(series) },
				}),
				...(price && {
					price: { $in: parseNumbers(parseArray(price)) },
				}),
			}

			const batteries = await db
				.collection('car_batteries')
				.find(query)
				.toArray()

			if (batteries.length > 0) {
				res.status(200).json(batteries)
			} else {
				res.status(404).json({ message: 'Batteries not found' })
			}
		} catch (error) {
			res.status(500).json({ message: 'Error fetching batteries', error })
		}
	} else {
		res.setHeader('Allow', ['GET'])
		res.status(405).end(`Method ${req.method} Not Allowed`)
	}
}
