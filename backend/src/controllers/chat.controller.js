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

	static async getAllChatMessages(req, res) {
		const sentMessages = await ChatService.findSentChatMessagesByProperty({
			user: req.userData._id,
		}).sort({ createdAt: -1 });

		const receivedMessages = await ChatService.findReceivedChatMessagesByProperty(
			{
				receiverId: req.userData._id,
			}
		).sort({ createdAt: -1 });
		ResponseService.setSuccess(200, 'All chat messages', {
			messages: sentMessages.concat(receivedMessages),
		});
		return ResponseService.send(res);
	}

	static async getAllSentMessages(req, res) {
		try {
			const sentMessages = await ChatService.findSentChatMessagesByProperty({
				user: req.userData._id,
				receiverId: req.params.userId,
				message: { $ne: '' },
			});
			ResponseService.setSuccess(200, 'All sent chat messages', sentMessages);
			return ResponseService.send(res);
		} catch (error) {
			ResponseService.setError(
				500,
				'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters'
			);
			return ResponseService.send(res);
		}
	}

	static async getAllReceivedMessages(req, res) {
		try {
			const receivedMessages = await ChatService.findReceivedChatMessagesByProperty(
				{
					user: req.params.userId,
					receiverId: req.userData._id,
				}
			);
			ResponseService.setSuccess(
				200,
				'All Received chat messages',
				receivedMessages
			);
			return ResponseService.send(res);
		} catch (error) {
			ResponseService.setError(
				500,
				'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters'
			);
			return ResponseService.send(res);
		}
	}

	static async deleteEmptyMessage(req, res) {
		await ChatService.deleteMessageByProperty({ message: '' });
		ResponseService.setSuccess(200, 'Chat has been deleted');
		return ResponseService.send(res);
	}
}

export default ChatController;
