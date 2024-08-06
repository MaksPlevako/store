import clientPromise from '@/lib/mongodb'

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
			} = req.body

			// Создаем новый адрес
			const newAddress = {
				type,
				address,
				street,
				...(apartment_num && { apartment_num }), // Добавляем поле, если оно существует
				...(index && { index }), // Добавляем поле, если оно существует
				...(department_number && { department_number }), // Добавляем поле, если оно существует
				city,
			}

			// Обновляем документ пользователя, добавляя новый адрес в массив
			await db
				.collection('users')
				.updateOne({ email: email }, { $push: { addresses: newAddress } })

			res.status(200).json({ message: 'Address added successfully' })
		} catch (error) {
			console.error(error) // Логируем ошибку для отладки
			res.status(500).json({ error: 'Failed to add address' })
		} finally {
			await client.close() // Закрываем соединение
		}
	} else {
		res.setHeader('Allow', ['POST'])
		res.status(405).end(`Method ${req.method} Not Allowed`)
	}
}
