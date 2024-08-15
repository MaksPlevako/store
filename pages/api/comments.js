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

			console.log(comments)

			if (comments) {
				res.status(200).json(comments)
			} else {
				res.status(404).json({ message: 'Comments not found' })
			}
		} catch (errors) {
			res.status(500).json({ errors: errors.map(error => error.message) })
		}
	} else {
		res.setHeader('Allow', ['POST', 'DELETE', 'GET'])
		res.status(405).end(`Method ${req.method} Not Allowed`)
	}
}
