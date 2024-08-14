import connectToDatabase from '@/lib/mongoose'
import bcrypt from 'bcryptjs'
import User from '@/models/User'

export default async function Registration(req, res) {
	await connectToDatabase()
	if (req.method === 'POST') {
		try {
			const { name, phone, email, password } = req.body

			// Проверка, существует ли пользователь с таким email
			const existingUser = await User.findOne({ email }).exec()

			if (!existingUser) {
				const hashedPassword = await bcrypt.hash(password, 10)

				const user = new User({
					name,
					phone,
					email,
					password: hashedPassword,
				})

				const result = await user.save()

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
