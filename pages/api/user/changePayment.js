import connectToDatabase from '@/lib/mongoose'
import Payment from '@/models/Payment'
import mongoose from 'mongoose'

export default async function handler(req, res) {
	await connectToDatabase()

	if (req.method === 'POST') {
		try {
			const { _id, card_name, card_num, user_id } = req.body

			if (!mongoose.Types.ObjectId.isValid(_id)) {
				return res.status(400).json({ message: 'Invalid payment ID' })
			}

			console.log(_id, card_name, card_num, user_id)

			const updatedPayment = {
				card_name,
				card_num,
				updatedAt: new Date(),
				user_id,
			}

			const result = await Payment.updateOne(
				{ _id: new mongoose.Types.ObjectId(_id) },
				{ $set: updatedPayment }
			)

			if (result.modifiedCount === 1) {
				res.redirect(302, '/profile/payment-info')
			} else {
				res.status(400).json({ message: 'Payment update failed' })
			}
		} catch (error) {
			console.error('Error updating payment:', error)
			res.status(500).json({ message: 'Error updating payment', error })
		}
	} else {
		res.setHeader('Allow', ['POST'])
		res.status(405).end(`Method ${req.method} Not Allowed`)
	}
}
