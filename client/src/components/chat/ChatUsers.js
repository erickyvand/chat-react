import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ListGroup, Spinner } from 'react-bootstrap';
import { chatService, deleteEmptyChat } from '../../services/chatService';

const ChatUsers = ({ sendUserData }) => {
	const history = useHistory();
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(false);
	const [deletedMessage, setDeletedMessage] = useState();

	const handleClickUser = async userId => {
		const deleted = await deleteEmptyChat();
		setDeletedMessage(deleted.data.message);
		history.push(`/chat/${userId}`);
	};

	const usersMap = messages.map(message => {
		return {
			id: message.user._id || message.receiverId._id,
			fullName: message.user.fullName || message.receiverId.fullName,
		};
	});

	let uniq = {};

	const users = usersMap.filter(obj => !uniq[obj.id] && (uniq[obj.id] = true));

	useEffect(async () => {
		setLoading(true);
		const results = await chatService();
		setMessages(results.data.data.messages);
		sendUserData(results.data.data.messages);
		setLoading(false);
	}, [deletedMessage]);
	return (
		<div>
			<ListGroup style={{ height: 600 }} className='overflow-auto'>
				{loading ? (
					<Spinner
						animation='grow'
						style={{ margin: 'auto', width: 200, height: 200 }}
					/>
				) : users.length === 0 ? (
					<p className='text-center'>No messages</p>
				) : (
					users.map(user => (
						<ListGroup.Item
							key={user.id}
							action
							onClick={() => handleClickUser(user.id)}
						>
							{user.fullName}
						</ListGroup.Item>
					))
				)}
			</ListGroup>
		</div>
	);
};

export default ChatUsers;
