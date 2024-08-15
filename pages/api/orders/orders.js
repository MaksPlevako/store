import connectToDatabase from '@/lib/mongoose'
import Orders from '@/models/Orders'
import mongoose from 'mongoose'

export default async function handler(req, res) {
	await connectToDatabase()
	if (req.method === 'GET') {
		try {
			const { user_id } = req.query

			if (!mongoose.Types.ObjectId.isValid(user_id)) {
				return res.status(400).json({ message: 'Invalid address ID' })
			}

			const orders = await Orders.find({ user_id }).exec()

			if (orders.length > 0) {
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
