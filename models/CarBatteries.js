const mongoose = require('mongoose')

const carBatteriesSchema = new mongoose.Schema(
	{
		battery_name: { type: String, required: true },
		title: { type: String },
		article: { type: Number, required: true },
		battery_capacity: { type: Number },
		voltage: { type: Number },
		battery_mount: { type: String },
		terminals: { type: Number },
		terminal_arrangement: { type: String },
		series: { type: String },
		price: { type: Number, required: true },
		img: { type: String },
		average_rating: { type: Number },
	},
	{ collection: 'car_batteries' }
)

const CarBatteries =
	mongoose.models.CarBatteries ||
	mongoose.model('CarBatteries', carBatteriesSchema)

module.exports = CarBatteries
