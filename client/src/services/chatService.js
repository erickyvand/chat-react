import axios from './axiosService';

export const chatService = () => {
	return axios.get('/api/chat');
};

export const makeChatService = data => {
	return axios.post('/api/chat', data);
};

export const sentChatMessagesService = userId => {
	return axios.get(`/api/chat/${userId}/send`);
};

export const receivedChatMessagesService = userId => {
	return axios.get(`/api/chat/${userId}/receive`);
};

export const deleteEmptyChat = () => {
	return axios.delete('/api/chat');
};
