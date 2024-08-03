import clientPromise from '@/lib/mongodb'
import bcrypt from 'bcryptjs'

export default async function Registration(req, res) {
	if (req.method === 'POST') {
		try {
			const client = await clientPromise
			const db = client.db('store')

			const { name, phone, email, password } = req.body

			// Проверка, существует ли пользователь с таким email
			const existingUser = await db
				.collection('users')
				.findOne({ email: email })

			if (!existingUser) {
				const hashedPassword = await bcrypt.hash(password, 10)

				const result = await db.collection('users').insertOne({
					name,
					phone,
					email,
					password: hashedPassword,
					createdAt: new Date(),
				})

				res.status(201).json({ message: 'Данные успешно сохранены', result })
			} else {
				res.status(409).json({ message: 'Користувач з таким Email уже існує' })
			}
		} catch (error) {
			console.error('Ошибка при сохранении данных:', error)
			res
				.status(500)
				.json({ message: 'Ошибка при сохранении данных', error: error.message })
		}
	} else {
		res.setHeader('Allow', ['POST'])
		res.status(405).end(`Method ${req.method} Not Allowed`)
	}
}
