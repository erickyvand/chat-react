import express from 'express';
import AuthController from '../controllers/auth.controller';
import { checkEmailDuplication } from '../middlewares/user.middleware';
import { validateSignupBody } from '../validations/user.validation';

const router = express.Router();

router.post(
	'/signup',
	validateSignupBody,
	checkEmailDuplication,
	AuthController.signup
);

export default router;
