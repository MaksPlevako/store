import connectToDatabase from '@/lib/mongoose'
import mongoose from 'mongoose'
import Comments from '@/models/Comments'

export default async (req, res) => {
	await connectToDatabase()

	if (req.method === 'GET') {
		try {
			const { product_id } = req.query

			if (!mongoose.Types.ObjectId.isValid(product_id)) {
				return res.status(400).json({ message: 'Invalid product_id' })
			}

			const comments = await Comments.find({ product_id })
				.populate('user_id', 'name') // Подразумевается, что у пользователя есть поле `name`
				.exec()

			if (comments.length > 0) {
				return res.status(200).json(comments)
			} else {
				return res.status(404).json({ message: 'Comments not found' })
			}
		} catch (errors) {
			return res.status(500).json({ errors: errors.message })
		}
	} else if (req.method === 'POST') {
		try {
			console.log(req.body)

			const { product_id, user_id, rating, comment } = req.body

			console.log(product_id)
			console.log(user_id)
			console.log(rating)
			console.log(comment)

			if (!mongoose.Types.ObjectId.isValid(product_id)) {
				return res.status(400).json({ message: 'Invalid product ID' })
			}
			if (!mongoose.Types.ObjectId.isValid(user_id)) {
				return res.status(400).json({ message: 'Invalid user ID' })
			}

			const newComment = new Comments({
				product_id,
				user_id,
				rating,
				comment,
				createdAt: new Date(),
				updatedAt: new Date(),
			})

			await newComment.save()

			res.status(201).json({ message: 'Address added successfully' })
		} catch (error) {
			return res.status(500).json({ message: error.message })
		}
	} else {
		res.setHeader('Allow', ['POST', 'DELETE', 'GET'])
		res.status(405).end(`Method ${req.method} Not Allowed`)
	}
}
