import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			const client = await clientPromise
			const db = client.db('store')

			const {
				type,
				address,
				street,
				apartment_num,
				index,
				department_number,
				city,
				email,
				addressId,
			} = req.body

			if (!ObjectId.isValid(addressId)) {
				return res.status(400).json({ message: `Invalid address ID` })
			}

			const updatedAddress = {
				addressId: new ObjectId(addressId),
				type,
				address,
				street,
				...(apartment_num && { apartment_num }),
				...(index && { index }),
				...(department_number && { department_number }),
				city,
				updatedAt: new Date(),
			}

			const result = await db
				.collection('users')
				.updateOne(
					{ email: email, 'addresses.addressId': new ObjectId(addressId) },
					{ $set: { 'addresses.$': updatedAddress } }
				)

			if (result.modifiedCount === 1) {
				res.redirect(302, '/profile/addresses')
			} else {
				res.status(400).json({ message: 'Address update failed' })
			}
		} catch (error) {
			console.error('Error updating address:', error)
			res.status(500).json({ message: 'Error updating address', error })
		}
	} else {
		res.setHeader('Allow', ['GET'])
		res.status(405).end(`Method ${req.method} Not Allowed`)
	}
}
