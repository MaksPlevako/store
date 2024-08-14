import mongoose from 'mongoose'
import connectToDatabase from '@/lib/mongoose'
import Addresses from '@/models/Addresses' // Убедитесь, что эта модель правильно определена

export default async function handler(req, res) {
	await connectToDatabase()

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
				_id,
			} = req.body

			if (!mongoose.Types.ObjectId.isValid(_id)) {
				return res.status(400).json({ message: 'Invalid address ID' })
			}

			const updatedAddress = {
				type,
				address,
				street,
				...(apartment_num && { apartment_num }),
				...(index && { index }),
				...(department_number && { department_number }),
				city,
				updatedAt: new Date(),
			}

			const result = await Addresses.updateOne(
				{ _id: new mongoose.Types.ObjectId(_id) },
				{ $set: updatedAddress }
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
		res.setHeader('Allow', ['POST'])
		res.status(405).end(`Method ${req.method} Not Allowed`)
	}
}
