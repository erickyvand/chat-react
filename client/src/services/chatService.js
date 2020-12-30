import axios from './axiosService';

export const chatService = () => {
	return axios.get('/api/chat');
};
