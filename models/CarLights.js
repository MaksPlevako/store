const mongoose = require('mongoose')

const carLightsSchema = new mongoose.Schema(
	{
		brand: { type: String, required: true },
		article: { type: Number, required: true },
		title: { type: String },
		description: { type: String },
		type: { type: String },
		lamp_kind: { type: String },
		color_temperature: { type: String },
		socle: { type: String },
		color: { type: String },
		power: { type: Number },
		voltage: { type: Number },
		price: { type: Number, required: true },
		img: { type: String },
		assignment: { type: String },
		average_rating: { type: Number, min: 0, max: 5 },
	},
	{ collection: 'car_lights' }
)

const CarLights =
	mongoose.models.CarLights || mongoose.model('CarLights', carLightsSchema)

module.exports = CarLights
