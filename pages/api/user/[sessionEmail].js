import clientPromise from '@/lib/mongodb'

export default async function handler(req, res) {
	if (req.method === 'GET') {
		try {
			const { sessionEmail } = req.query

			const client = await clientPromise
			const db = client.db('store')

			const user = await db.collection('users').findOne({ email: sessionEmail })

			if (user) {
				const { password, ...userWithoutPass } = user
				res.status(200).json(userWithoutPass)
			} else {
				res.status(404).json({ message: 'User not found' })
			}
		} catch (error) {
			res.status(500).json({ message: 'Error fetching user data', error })
		}
	} else if (req.method === 'POST') {
		try {
			const { sessionEmail } = req.query
			const client = await clientPromise
			const db = client.db('store')

			const { name, phone } = await req.body

			const result = await db.collection('users').updateOne(
				{ email: sessionEmail },
				{
					$set: {
						name,
						phone,
						updatedAt: new Date(),
					},
				}
			)

			if (result.modifiedCount === 1) {
				// Перенаправление после успешного обновления профиля
				res.redirect(302, '/profile/personal-info')
			} else {
				res.status(400).json({ message: 'Profile update failed' })
			}
		} catch (error) {
			console.error('Error updating profile:', error)
			res.status(500).json({ message: 'Error updating profile', error })
		}
	} else {
		res.setHeader('Allow', ['GET'])
		res.status(405).end(`Method ${req.method} Not Allowed`)
	}
}
