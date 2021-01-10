import React from 'react';
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';
import { userService } from '../../services/user.service';

const ChatMessages = ({ messages, receiverId }) => {
	const [users, setUsers] = React.useState([]);
	let messagesEnd = React.useRef(null);

	const thread = messages.filter(
		message =>
			(message.receiverId === receiverId &&
				message.user === sessionStorage.getItem('id')) ||
			(message.receiverId === sessionStorage.getItem('id') &&
				message.user === receiverId)
	);

	// scroll to bottom inside element
	const scrollToBottom = () => {
		messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
	};

	React.useEffect(async () => {
		try {
			const results = await userService();
			setUsers(results.data.data);
		} catch (error) {}

		scrollToBottom();
	}, [messages, receiverId]);

	return (
		<div
			style={{ width: '100%' }}
			className='overflow-auto chat-container-height'
		>
			{thread.length === 0
				? ''
				: thread.map(message => {
						const user = users.find(user => user._id === receiverId);

						if (user !== undefined && message.user === user._id) {
							return (
								<Row key={message._id} className='w-75 m-2'>
									<Col>
										<div className='bg-info text-white p-2 border-radius'>
											<h6 className='color-users-title'>{user.fullName}</h6>
											<p>{message.message}</p>
										</div>
										<small className='text-muted'>
											{moment(message.createdAt).calendar({
												sameDay: `[${moment(message.createdAt).format(
													'H:mm'
												)}]`,
												sameElse: `[${moment(message.createdAt).format(
													'Do MMMM YYYY'
												)}]`,
											})}
										</small>
									</Col>
								</Row>
							);
						} else {
							return (
								<Row key={message._id} className='float-right w-75 m-1'>
									<Col>
										<div className='bg-primary p-2 text-white border-radius'>
											<h6 className='color-users-title'>
												{sessionStorage.getItem('fullName')}
											</h6>
											<p>{message.message}</p>
										</div>
										<small className='float-right text-muted'>
											{moment(message.createdAt).calendar({
												sameDay: `[${moment(message.createdAt).format(
													'H:mm'
												)}]`,
												sameElse: `[${moment(message.createdAt).format(
													'Do MMMM YYYY'
												)}]`,
											})}
										</small>
									</Col>
								</Row>
							);
						}
				  })}
			<div ref={messagesEnd}></div>
		</div>
	);
};

export default ChatMessages;
