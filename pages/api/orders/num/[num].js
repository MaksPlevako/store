import clientPromise from '@/lib/mongodb'

export default async function handler(req, res) {
	if (req.method === 'GET') {
		try {
			const { num } = req.query

			const client = await clientPromise
			const db = client.db('store')

			const order = await db
				.collection('orders')
				.findOne({ num: parseInt(num, 10) })

			if (order) {
				res.status(200).json(order)
			} else {
				res.status(404).json({ message: 'Order not found' })
			}
		} catch (error) {
			res.status(500).json({ message: 'Error fetching', error })
		}
	} else {
		res.setHeader('Allow', ['GET'])
		res.status(405).end(`Method ${req.method} Not Allowed`)
	}
}
