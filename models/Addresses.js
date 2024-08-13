const mongoose = require('mongoose')

// Схема для адреса
const addressSchema = new mongoose.Schema(
	{
		type: { type: String, required: true },
		city: { type: String, required: true },
		address: { type: String, required: true },
		street: { type: String, required: true },
		apartment_num: mongoose.Schema.Types.Mixed,
		index: { type: String },
		department_number: mongoose.Schema.Types.Mixed,
		user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
		createdAt: { type: Date, default: Date.now },
		updatedAt: { type: Date, default: Date.now },
	},
	{ collection: 'addresses' }
)

// Модель User
const Addresses =
	mongoose.models.Addresses || mongoose.model('Addresses', addressSchema)

module.exports = Addresses
