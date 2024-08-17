import connectToDatabase from '@/lib/mongoose'
import User from '@/models/User'

export default async function handler(req, res) {
	await connectToDatabase()
	const email = req.query.email

	if (req.method === 'GET') {
		try {
			const user = await User.findOne({ email })

			if (user) {
				const { password, ...userWithoutPass } = user.toObject()

				res.status(200).json(userWithoutPass)
			} else {
				res.status(404).json({ message: 'User not found' })
			}
		} catch (error) {
			res.status(500).json({ message: 'Error fetching user data', error })
		}
	} else if (req.method === 'POST') {
		try {
			const { name, phone } = req.body

			const result = await User.updateOne(
				{ email },
				{
					$set: {
						name,
						phone,
						updatedAt: new Date(),
					},
				}
			)

			if (result.modifiedCount === 1) {
				res.redirect(302, '/profile/personal-info')
			} else {
				res.status(400).json({ message: 'Profile update failed' })
			}
		} catch (error) {
			console.error('Error updating profile:', error)
			res.status(500).json({ message: 'Error updating profile', error })
		}
	} else {
		res.setHeader('Allow', ['GET', 'POST'])
		res.status(405).end(`Method ${req.method} Not Allowed`)
	}
}
