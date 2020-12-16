import User from '../models/user';

class UserService {
	static findAllUsers() {
		return User.find();
	}
}

export default UserService;
