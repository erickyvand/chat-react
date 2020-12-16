import ResponseService from '../services/response.service';
import UserService from '../services/user.service';

export const checkEmailDuplication = async (req, res, next) => {
	const user = await UserService.findUserByProperty({ email: req.body.email });

	if (user) {
		ResponseService.setError(409, 'Email already exits');
		return ResponseService.send(res);
	}
	next();
};
