import ChatService from '../services/chat.service';
import ResponseService from '../services/response.service';

/**
 * Chat controller class
 */
class ChatController {
	/**
	 * @param  {object} req
	 * @param  {object} res
	 * @returns {object} making chat
	 */
	static async makeChatMessages(req, res) {
		const chat = await ChatService.createChatMessage({
			receiverId: req.body.receiverId,
			message: req.body.message,
			user: req.userData._id,
		});
		ResponseService.setSuccess(201, 'Chat message has been created', chat);
		return ResponseService.send(res);
	}

	/**
	 * @param  {object} req
	 * @param  {object} res
	 * @returns {object} get single chat
	 */
	static async getSingleChatMessages(req, res) {
		ResponseService.setSuccess(200, 'The retrieved chat', req.chat);
		return ResponseService.send(res);
	}
}

export default ChatController;
