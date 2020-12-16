import bcrypt from 'bcrypt';

class BcryptService {
	static hashPassword(password) {
		return bcrypt.hashSync(password, Number(process.env.SALT_ROUNDS));
	}

	static comparePassword(plainPassword, hashPassword) {
		return bcrypt.compareSync(plainPassword, hashPassword);
	}
}

export default BcryptService;
