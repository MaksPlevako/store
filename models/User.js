const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		phone: { type: String, required: true },
		email: { type: String, unique: true, required: true },
		password: { type: String, required: true },
		createdAt: { type: Date, default: Date.now },
		updatedAt: { type: Date, default: Date.now },
	},
	{ collection: 'users' }
)

// Автоматическое обновление updatedAt перед сохранением
userSchema.pre('save', function (next) {
	this.updatedAt = Date.now()
	next()
})

// Модель User
const User = mongoose.models.User || mongoose.model('User', userSchema)

module.exports = User
