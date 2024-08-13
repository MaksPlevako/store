import mongoose from 'mongoose'

const connectToDatabase = async () => {
	if (mongoose.connection.readyState >= 1) {
		return
	}

	const uri = process.env.MONGODB_URI
	await mongoose.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
}

export default connectToDatabase
