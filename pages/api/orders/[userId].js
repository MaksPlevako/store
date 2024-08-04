import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export default async function handler(req, res) {
	if (req.method === 'GET') {
		try {
			const { userId } = req.query

			const client = await clientPromise
			const db = client.db('store')

			const orders = await db
				.collection('orders')
				.find({ user_id: new ObjectId(userId) })
				.toArray()

			if (orders) {
				res.status(200).json(orders)
			} else {
				res.status(404).json({ message: 'Orders not found' })
			}
		} catch (error) {
			res.status(500).json({ message: 'Error fetching', error })
		}
	} else {
		res.setHeader('Allow', ['GET'])
		res.status(405).end(`Method ${req.method} Not Allowed`)
	}
}
