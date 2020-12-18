import faker from 'faker';
import id from 'mongoose';
import BcryptService from '../../services/bcrypt.service';
import TokenService from '../../services/token.service';
import UserService from '../../services/user.service';

const objectId = id.Types.ObjectId();

export const userSignupInfo = {
	fullName: faker.name.findName(),
	email: faker.internet.email(),
	password: faker.internet.password(),
};

export const userEmailExists = {
	fullName: faker.name.findName(),
	email: userSignupInfo.email,
	password: faker.internet.password(),
};

export const email = {
	email: faker.internet.email(),
};

const password = faker.internet.password();
const newUser = {
	_id: objectId,
	fullName: faker.name.findName(),
	email: faker.internet.email(),
	password: BcryptService.hashPassword(password),
	createdAt: new Date(),
};
export const userEmailLogin = {
	email: newUser.email,
};

export const emailToken = TokenService.generateToken(userEmailLogin);

export const userPasswordLogin = {
	password
};

export const wrongPassword = {
	password: faker.internet.password()
}

export const createUser = async () => {
	await UserService.createUser(newUser);
};
