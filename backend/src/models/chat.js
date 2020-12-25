import mongoose from 'mongoose';

const chatSchema = mongoose.Schema({
	receiverId: {
		type: String,
		required: true,
	},
	message: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: new Date(),
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
});

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;
