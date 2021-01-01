import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ListGroup, Spinner } from 'react-bootstrap';
import { chatService } from '../../services/chatService';

const ChatUsers = ({ searchResults }) => {
	const history = useHistory();
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(false);

	const handleClickUser = userId => {
		history.push(`/chat/${userId}`);
	};

	useEffect(async () => {
		setLoading(true);
		const results = await chatService();
		setMessages(results.data.data.messages);
		setLoading(false);
	}, []);
	return (
		<div>
			<ListGroup style={{ height: 600 }} className='overflow-auto'>
				{loading ? (
					<Spinner
						animation='grow'
						style={{ margin: 'auto', width: 200, height: 200 }}
					/>
				) : messages.length === 0 ? (
					<p className='text-center'>No messages</p>
				) : (
					messages.map(message => (
						<ListGroup.Item
							key={message._id}
							action
							onClick={() =>
								handleClickUser(message.receiverId._id || message.user._id)
							}
						>
							{message.receiverId.fullName || message.user.fullName}
						</ListGroup.Item>
					))
				)}
			</ListGroup>
		</div>
	);
};

export default ChatUsers;
