const mongoose = require("mongoose")

// Read moongosejs documentation
const UserSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique:true
	},
	username: {
		type: String,
		required: true,
		unique: true,
		minLength:3
	},
	password: {
		type: String,
		required: true,
		unique: true,
	},
	role_id: {
		type: Number,
		default: 1
	},
	created_at: {
		type: Date,
		default: Date.now
	}
})

const User = mongoose.model("User123", UserSchema)

module.exports = User
