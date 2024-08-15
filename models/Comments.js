import mongoose from 'mongoose'

const commentsSchema = new mongoose.Schema({
	product_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	rating: {
		type: Number,
		min: 1,
		max: 5,
		required: true,
	},
	comment: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
})

const Comments =
	mongoose.models.Comments || mongoose.model('Comments', commentsSchema)

export default Comments
