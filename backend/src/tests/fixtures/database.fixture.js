import User from '../../models/user';

export const cleanAllTables = async () => {
	await User.deleteMany({});
};
