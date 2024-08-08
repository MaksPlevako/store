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
			const newReq = {
				...(battery_name && { battery_name }),
				...(battery_capacity && { battery_capacity }),
				...(terminals && { terminals }),
				...(battery_mount && { battery_mount }),
				...(voltage && { voltage }),
				...(terminal_arrangement && { terminal_arrangement }),
				...(series && { series }),
				...(price && { price }),
			}
			const batteries = await db
				.collection('car_batteries')
				.find(newReq)
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
