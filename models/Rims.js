import mongoose from 'mongoose'

const rimsSchema = new mongoose.Schema(
	{
		rims_name: { type: String, required: true },
		title: { type: String },
		article: { type: Number, required: true },
		rims_diameter: { type: Number },
		rims_width: { type: Number },
		PCD: { type: String },
		DIA: { type: Number },
		ET: { type: Number },
		rims_material: { type: String },
		color: { type: String },
		price: { type: Number, required: true },
		average_rating: { type: Number, min: 0, max: 5 },
		img: { type: String },
	},
	{ collection: 'rims' }
)

const Rims = mongoose.models.Rims || mongoose.model('Rims', rimsSchema)

export default Rims
