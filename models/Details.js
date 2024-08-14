const mongoose = require('mongoose')

const detailsSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		article: { type: Number, required: true },
		price: { type: Number, required: true },
		rating: { type: Number },
		promotion: { type: Number },
		updatedAt: { type: Date, default: Date.now },
	},
	{ collection: 'details' }
)

// Модель User
const Details =
	mongoose.models.Details || mongoose.model('Details', detailsSchema)

module.exports = Details
