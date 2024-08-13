const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema(
	{
		card_name: { type: String, required: true },
		card_num: { type: String, required: true },
		createdAt: { type: Date, default: Date.now },
		updatedAt: { type: Date, default: Date.now },
		user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
	},
	{ collection: 'payment' }
)

// Модель User
const Payment =
	mongoose.models.Payment || mongoose.model('Payment', paymentSchema)

module.exports = Payment
