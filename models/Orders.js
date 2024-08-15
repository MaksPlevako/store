import mongoose from 'mongoose'

const ordersSchema = new mongoose.Schema({
	num: {
		type: Number,
		required: true,
	},
	date: {
		type: Date,
		required: true,
		default: Date.now,
	},
	type: {
		type: String,
		required: true,
	},
	payment_type: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	status: {
		type: String,
		required: true,
		default: 'Прийнятий',
	},
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	tracking_number: {
		type: String,
		required: true,
	},
	details: {
		type: Object,
		required: true,
	},
})

const Orders = mongoose.models.Orders || mongoose.model('Orders', ordersSchema)

export default Orders
