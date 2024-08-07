import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export default async function handler(req, res) {
	const client = await clientPromise
	const db = client.db('store')

	if (req.method === 'POST') {
		try {
			const { card_name, card_num, email } = req.body

			const newPayment = {
				paymentId: new ObjectId(),
				card_name,
				card_num,
			}

			await db.collection('users').updateOne(
				{ email: email },
				{
					$push: { payment: newPayment },
				}
			)

			res.status(200).json({ message: 'Address added successfully' })
		} catch (error) {
			console.error(error)
			res.status(500).json({ error: 'Failed to add address' })
		}
	} else if (req.method === 'DELETE') {
		try {
			const { email, paymentId } = req.query

			console.log(email)
			console.log(paymentId)

			await db
				.collection('users')
				.updateOne(
					{ email: email },
					{ $pull: { payment: { paymentId: new ObjectId(paymentId) } } }
				)

			res.status(200).json({ message: 'Payment deleted successfully' })
		} catch (error) {
			console.error(error)
			res.status(500).json({ error: 'Failed to delete payment' })
		}
	} else {
		res.setHeader('Allow', ['POST', 'DELETE'])
		res.status(405).end(`Method ${req.method} Not Allowed`)
	}
}
