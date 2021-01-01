import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';
import {
	receivedChatMessagesService,
	sentChatMessagesService,
} from '../../services/chatService';

const ChatMessages = ({ userId }) => {
	const [sentMessages, setSentMessages] = useState([]);
	const [receivedMessages, setReceivedMessages] = useState([]);

	useEffect(async () => {
		const sentResponse = await sentChatMessagesService(userId);
		setSentMessages(sentResponse.data.data);

		const receivedResponse = await receivedChatMessagesService(userId);
		setReceivedMessages(receivedResponse.data.data);
	}, [userId]);
	return (
		<div style={{ height: 600, width: '100%' }} className='overflow-auto'>
			{sentMessages.length === 0
				? ''
				: sentMessages.map(message => (
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
										sameDay: `[${moment(message.createdAt).fromNow()}]`,
										sameElse: `[${moment(message.createdAt).format(
											'Do MMMM YYYY'
										)}]`,
									})}
								</small>
							</Col>
						</Row>
				  ))}
			{receivedMessages.length === 0
				? ''
				: receivedMessages.map(message => (
						<Row key={message._id} className='w-75 m-2'>
							<Col>
								<div className='bg-info text-white p-2 border-radius'>
									<h6 className='color-users-title'>{message.user.fullName}</h6>
									<p>{message.message}</p>
								</div>
								<small className='text-muted'>
									{moment(message.createdAt).calendar({
										sameDay: `[${moment(message.createdAt).fromNow()}]`,
										sameElse: `[${moment(message.createdAt).format(
											'Do MMMM YYYY'
										)}]`,
									})}
								</small>
							</Col>
						</Row>
				  ))}
		</div>
	);
};

export default ChatMessages;
