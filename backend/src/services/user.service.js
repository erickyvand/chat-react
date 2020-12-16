import User from '../models/user';

class UserService {
	static createUser(data) {
		return User.create(data);
	}

	static findUserByProperty(property) {
		return User.findOne(property);
	}
}

export default UserService;
