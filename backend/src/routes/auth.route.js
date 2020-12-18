import express from 'express';
import AuthController from '../controllers/auth.controller';
import {
	checkEmailDuplication,
	checkIfEmailExists,
	checkIfPasswordsMatch,
} from '../middlewares/user.middleware';
import {
	validateEmailBody,
	validatePasswordBody,
	validateSignupBody,
} from '../validations/user.validation';

const router = express.Router();

router.post(
	'/signup',
	validateSignupBody,
	checkEmailDuplication,
	AuthController.signup
);
router.post(
	'/email',
	validateEmailBody,
	checkIfEmailExists,
	AuthController.findEmailToLogin
);
router.post(
	'/password',
	validatePasswordBody,
	checkIfPasswordsMatch,
	AuthController.comparePasswordToLogin
);

export default router;
