import Chat from '../models/chat';

class ChatService {
	static createChatMessage(data) {
		return Chat.create(data);
	}

	static findChatByProperty(property) {
		return Chat.findOne(property).populate('receiverId', [
			'fullName',
			'email',
			'createdAt',
		]);
	}

	static findSentChatMessagesByProperty(property) {
		return Chat.find(property)
			.sort({ createdAt: -1 })
			.populate('receiverId', ['fullName', 'email', 'createdAt']);
	}

	static findReceivedChatMessagesByProperty(property) {
		return Chat.find(property)
			.sort({ createdAt: -1 })
			.populate('user', ['fullName', 'email', 'createdAt']);
	}
}

export default ChatService;
