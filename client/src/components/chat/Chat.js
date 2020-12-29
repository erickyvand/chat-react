import React from 'react';
import { Redirect } from 'react-router';

const Chat = () => {
	if (!sessionStorage.getItem('id')) {
		return <Redirect to='/' />;
	}
	return <div>Chat here</div>;
};

export default Chat;
