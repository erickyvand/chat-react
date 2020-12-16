import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
	fullName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		required: true,
		default: new Date(),
	},
});

const User = mongoose.model('Users', userSchema);

export default User;
