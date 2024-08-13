import connectToDatabase from '@/lib/mongoose'
import Addresses from '@/models/Addresses'
import mongoose from 'mongoose'

export default async function handler(req, res) {
	await connectToDatabase()

	if (req.method === 'GET') {
		try {
			const { user_id } = req.query

			if (!mongoose.Types.ObjectId.isValid(user_id)) {
				return res.status(400).json({ message: 'Invalid user ID' })
			}

			const addresses = await Addresses.find({ user_id }).exec()

			if (addresses.length > 0) {
				res.status(200).json(addresses)
			} else {
				res.status(404).json({ message: 'Addresses not found' })
			}
		} catch (error) {
			console.error('Error fetching addresses:', error)
			res.status(500).json({ message: 'Error fetching addresses', error })
		}
	} else if (req.method === 'POST') {
		try {
			const {
				type,
				address,
				street,
				apartment_num,
				index,
				department_number,
				city,
				user_id,
			} = req.body

			if (!mongoose.Types.ObjectId.isValid(user_id)) {
				return res.status(400).json({ message: 'Invalid user ID' })
			}

			const newAddress = new Addresses({
				type,
				address,
				street,
				...(apartment_num && { apartment_num }),
				...(index && { index }),
				...(department_number && { department_number }),
				city,
				createdAt: new Date(),
				user_id,
			})

			await newAddress.save()

			res.status(201).json({ message: 'Address added successfully' })
		} catch (error) {
			console.error('Failed to add address:', error)
			res.status(500).json({ error: 'Failed to add address' })
		}
	} else if (req.method === 'DELETE') {
		try {
			const { _id } = req.query

			if (!mongoose.Types.ObjectId.isValid(_id)) {
				return res.status(400).json({ message: 'Invalid address ID' })
			}

			const result = await Addresses.deleteOne({
				_id: new mongoose.Types.ObjectId(_id),
			})

			if (result.deletedCount > 0) {
				res.status(200).json({ message: 'Address deleted successfully' })
			} else {
				res.status(404).json({ message: 'Address not found' })
			}
		} catch (error) {
			console.error('Failed to delete address:', error)
			res.status(500).json({ error: 'Failed to delete address' })
		}
	} else {
		res.setHeader('Allow', ['POST', 'DELETE', 'GET'])
		res.status(405).end(`Method ${req.method} Not Allowed`)
	}
}
