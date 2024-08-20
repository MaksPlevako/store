import connectToDatabase from '@/lib/mongoose'
import mongoose from 'mongoose'
import Comments from '@/models/Comments'
import CarLights from '@/models/CarLights'
import CarBatteries from '@/models/CarBatteries'
import Rims from '@/models/Rims'
import Autochemistry from '@/models/Autochemistry'

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
			const { product_id, product_type, user_id, rating, comment } = req.body

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

			const modelsMap = {
				rims: Rims,
				carLights: CarLights,
				carBatteries: CarBatteries,
				autochemistry: Autochemistry,
			}

			const ProductModel = modelsMap[product_type]

			console.log(ProductModel)

			if (!ProductModel) {
				return res.status(400).json({ message: 'Invalid product type' })
			}

			const product = await ProductModel.findById(product_id)

			if (!product) {
				return res.status(404).json({ message: 'Product not found' })
			}

			const comments = await Comments.find({ product_id })
			const totalRatings = comments.length
			const sumOfRatings = comments.reduce(
				(acc, comment) => acc + comment.rating,
				0
			)
			const newAverageRating = sumOfRatings / totalRatings

			// Обновляем среднюю оценку товара
			product.average_rating = newAverageRating
			await product.save()

			res
				.status(201)
				.json({ message: 'Comment added and rating updated successfully' })
		} catch (error) {
			console.log(error)

			return res.status(500).json({ message: error })
		}
	} else {
		res.setHeader('Allow', ['POST', 'DELETE', 'GET'])
		res.status(405).end(`Method ${req.method} Not Allowed`)
	}
}
