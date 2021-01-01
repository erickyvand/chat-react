import express from 'express';
import ChatController from '../controllers/chat.controller';
import {
	checkChatParam,
	checkSelfUserAndIfExists,
} from '../middlewares/chat.middleware';
import { protectRoute } from '../middlewares/protect-route.middleware';
import { validateChatBody } from '../validations/chat.validation';

const router = express.Router();

router.post(
	'/',
	protectRoute,
	validateChatBody,
	checkSelfUserAndIfExists,
	ChatController.makeChatMessages
);
router.get(
	'/:chatId',
	protectRoute,
	checkChatParam,
	ChatController.getSingleChatMessages
);
router.get('/', protectRoute, ChatController.getAllChatMessages);
router.get('/:userId/send', protectRoute, ChatController.getAllSentMessages);
router.get(
	'/:userId/receive',
	protectRoute,
	ChatController.getAllReceivedMessages
);
router.delete(
	'/',
	protectRoute,
	ChatController.deleteEmptyMessage
);

export default router;
