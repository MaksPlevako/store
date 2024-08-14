import connectToDatabase from '@/lib/mongoose'
import Payment from '@/models/Payment'
import mongoose from 'mongoose'

export default async function handler(req, res) {
	await connectToDatabase()
	if (req.method === 'GET') {
		try {
			const { user_id } = req.query

			if (!mongoose.Types.ObjectId.isValid(user_id)) {
				return res.status(400).json({ message: 'Invalid user ID' })
			}

			const payment = await Payment.find({ user_id }).exec()

			if (payment.length > 0) {
				res.status(200).json(payment)
			} else {
				res.status(404).json({ message: 'Payments not found' })
			}
		} catch (error) {
			console.error('Error find payment:', error)
			res.status(500).json({ error: 'Failed to find payment' })
		}
	} else if (req.method === 'POST') {
		try {
			const { card_name, card_num, user_id } = req.body

			if (!mongoose.Types.ObjectId.isValid(user_id)) {
				return res.status(400).json({ message: 'Invalid user ID' })
			}

			const newPayment = new Payment({
				card_name,
				card_num,
				createdAt: new Date(),
				updatedAt: new Date(),
				user_id,
			})

			await newPayment.save()

			res.status(200).json({ message: 'Payment added successfully' })
		} catch (error) {
			console.error('Error adding payment:', error)
			res.status(500).json({ error: 'Failed to add payment' })
		}
	} else if (req.method === 'DELETE') {
		try {
			const { _id } = req.query

			if (!mongoose.Types.ObjectId.isValid(_id)) {
				return res.status(400).json({ message: 'Invalid address ID' })
			}

			const result = await Payment.deleteOne({
				_id: new mongoose.Types.ObjectId(_id),
			})

			if (result.deletedCount > 0) {
				res.status(200).json({ message: 'Payment deleted successfully' })
			} else {
				res.status(404).json({ message: 'Payment not found' })
			}
		} catch (error) {
			console.error('Error deleting payment:', error)
			res.status(500).json({ error: 'Failed to delete payment' })
		}
	} else {
		res.setHeader('Allow', ['POST', 'DELETE'])
		res.status(405).end(`Method ${req.method} Not Allowed`)
	}
}
