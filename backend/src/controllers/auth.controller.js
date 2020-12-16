import BcryptService from '../services/bcrypt.service';
import ResponseService from '../services/response.service';
import UserService from '../services/user.service';

class AuthController {
	static async signup(req, res) {
		const user = await UserService.createUser({
			fullName: req.body.fullName,
			email: req.body.email,
			password: BcryptService.hashPassword(req.body.password),
		});
		
		const userData = {...user._doc}
		delete userData.password;
		ResponseService.setSuccess(200, 'user signup', userData);
		return ResponseService.send(res);
	}
}

export default AuthController;
