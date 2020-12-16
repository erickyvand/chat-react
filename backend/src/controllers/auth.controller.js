import ResponseService from '../services/response.service';
import UserService from '../services/user.service';

class AuthController {
	static async signup(req, res) {
		const users = await UserService.findAllUsers();
		ResponseService.setSuccess(200, 'user signup');
		return ResponseService.send(res);
	}
}

export default AuthController;
