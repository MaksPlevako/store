const mongoose = require('mongoose')

const autochemistrySchema = new mongoose.Schema(
	{
		brand: { type: String, required: true },
		title: { type: String },
		description: { type: String },
		article: { type: Number, required: true },
		consistence: { type: String },
		color: { type: String },
		type: { type: String },
		capacity: { type: String },
		classs: { type: String },
		season: { type: String },
		price: { type: Number, required: true },
		img: { type: String },
		average_rating: { type: Number },
	},
	{ collection: 'autochemistry' }
)

const Autochemistry =
	mongoose.models.Autochemistry ||
	mongoose.model('Autochemistry', autochemistrySchema)

module.exports = Autochemistry
