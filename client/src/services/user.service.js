import axios from './axiosService';

export const userService = () => {
	return axios.get('/api/users');
};

export const searchUserService = query => {
	return axios.get(`/api/users/search-user?q=${query}`);
};
