import mongoose from 'mongoose'

const AccountSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	provider: String,
	providerAccountId: String,
})

export default mongoose.models.Account ||
	mongoose.model('Account', AccountSchema)
