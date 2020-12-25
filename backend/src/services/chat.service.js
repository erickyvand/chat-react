import Chat from '../models/chat';

class ChatService {
	static createChatMessage(data) {
		return Chat.create(data);
	}

	static findChatByProperty(property) {
		return Chat.findOne(property).populate('user', ['fullName', 'email', 'createdAt']);
	}
}

export default ChatService;
