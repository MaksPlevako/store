import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			const client = await clientPromise
			const db = client.db('store')

			const { paymentId, card_name, card_num, email } = req.body

			if (!ObjectId.isValid(paymentId)) {
				return res.status(400).json({ message: `Invalid address ID` })
			}

			const updatedPayment = {
				paymentId: new ObjectId(paymentId),
				card_name,
				card_num,
				updatedAt: new Date(),
			}

			const result = await db
				.collection('users')
				.updateOne(
					{ email: email, 'payment.paymentId': new ObjectId(paymentId) },
					{ $set: { 'payment.$': updatedPayment } }
				)

			if (result.modifiedCount === 1) {
				res.redirect(302, '/profile/payment-info')
			} else {
				res.status(400).json({ message: 'payment update failed' })
			}
		} catch (error) {
			console.error('Error updating payment:', error)
			res.status(500).json({ message: 'Error updating payment', error })
		}
	} else {
		res.setHeader('Allow', ['GET'])
		res.status(405).end(`Method ${req.method} Not Allowed`)
	}
}
