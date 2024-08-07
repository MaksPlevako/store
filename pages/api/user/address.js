import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export default async function handler(req, res) {
	const client = await clientPromise
	const db = client.db('store')

	if (req.method === 'POST') {
		try {
			const {
				type,
				address,
				street,
				apartment_num,
				index,
				department_number,
				city,
				email,
			} = req.body

			const newAddress = {
				type,
				address,
				street,
				...(apartment_num && { apartment_num }),
				...(index && { index }),
				...(department_number && { department_number }),
				city,
				addressId: new ObjectId(),
			}

			await db.collection('users').updateOne(
				{ email: email },
				{
					$push: { addresses: newAddress },
				}
			)

			res.status(200).json({ message: 'Address added successfully' })
		} catch (error) {
			console.error(error)
			res.status(500).json({ error: 'Failed to add address' })
		}
	} else if (req.method === 'DELETE') {
		try {
			const { email, addressId } = req.query

			await db
				.collection('users')
				.updateOne(
					{ email: email },
					{ $pull: { addresses: { addressId: new ObjectId(addressId) } } }
				)

			res.status(200).json({ message: 'Address deleted successfully' })
		} catch (error) {
			console.error(error)
			res.status(500).json({ error: 'Failed to delete address' })
		}
	} else {
		res.setHeader('Allow', ['POST', 'DELETE'])
		res.status(405).end(`Method ${req.method} Not Allowed`)
	}
}
