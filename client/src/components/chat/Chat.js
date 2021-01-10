import React, { useEffect, useState } from 'react';
import { Redirect, withRouter } from 'react-router';
import { Card, Col, Container, Row, Spinner, Table } from 'react-bootstrap';
import moment from 'moment';
import ChatMessages from './ChatMessages';
import SendChatMessage from './SendChatMessage';
import SearchUser from '../users/SearchUser';
import Header from '../Layouts/Header';
import ChatUsers from './ChatUsers';
import SearchChatUser from '../users/SearchChatUser';

const Chat = ({
	match,
	socket,
	messages,
	users,
	setTyping,
	typing,
	setNotification,
	notification,
	setCount,
	count,
	playSound,
}) => {
	if (!sessionStorage.getItem('token')) {
		return <Redirect to='/' />;
	}
	const userId = match.params.userId;
	const [message, setMessage] = useState('');
	const [allowNextLine, setAllowNextLine] = useState(false);
	const [chatUsers, setChatUsers] = useState([]);
	const [chatResults, setChatResults] = useState([]);
	const [diplayResults, setDiplayResults] = useState(false);

	let user;
	if (users.length > 0) {
		user = users.find(u => u._id === userId);
	}

	const sendMessage = async e => {
		if (e.keyCode === 13 && !e.shiftKey) {
			if (message !== '') {
				socket.emit('send_message', { userId, message }, () => setMessage(''));

				if (notification.user === userId) {
					setNotification({});
					setCount(0);
				}
			}
			setAllowNextLine(false);
			setMessage('');
			e.preventDefault();
		} else {
			setAllowNextLine(true);
		}
	};

	const handleChange = e => {
		setMessage(e.target.value);
		socket.emit('typing', { text: 'typing...', userId, value: e.target.value });

		if (e.target.value === '') {
			setTyping('');
		}
	};

	const getData = data => {
		setChatResults(data);
	};

	const handleSearchUser = e => {
		if (chatResults.length > 0) {
			const res = chatResults.filter(
				user =>
					user.fullName.toLowerCase().indexOf(e.target.value.toLowerCase()) !==
					-1
			);
			setChatUsers(res);
		}

		if (e.target.value !== '') {
			setDiplayResults(true);
		} else {
			setDiplayResults(false);
		}
	};

	useEffect(() => {
		document.title = 'VandChat | Chat';
	}, [userId]);

	return (
		<div>
			<Container>
				<Header />
				<Row>
					<Col>
						<Card>
							<Table bordered responsive='xs' responsive='sm' className='table'>
								<tbody>
									<tr>
										<td style={{ width: 373 }} className='hide-column'>
											<SearchChatUser handleSearchUser={handleSearchUser} />
										</td>
										<td className='maximize-width'>
											<span className='font-weight-bold'>
												{user !== undefined ? (
													user.fullName
												) : (
													<Spinner animation='grow' />
												)}
											</span>
											<br />
											<small>
												{typing ? (
													<em className='text-info'>{typing}</em>
												) : (
													<span className='text-secondary'>
														{user !== undefined && user.socket === ''
															? 'last seen ' +
															  moment(user.updatedAt).calendar({
																	sameDay: `[${moment(user.updatedAt).format(
																		'H:mm'
																	)}]`,
																	sameElse: `[${moment(user.updatedAt).format(
																		'Do MMMM YYYY'
																	)}]`,
															  })
															: 'online'}
													</span>
												)}
											</small>
										</td>
									</tr>
									<tr>
										<td
											rowSpan='2'
											style={{ width: 373 }}
											className='chat-container-height hide-column'
										>
											<ChatUsers
												updateComponentOnNewReceivedMessage={messages}
												setNotification={setNotification}
												notification={notification}
												setCount={setCount}
												count={count}
												playSound={playSound}
												onlineUser={user}
												receiverId={userId}
												sendDataToParent={getData}
												chatUsers={chatUsers}
												diplayResults={diplayResults}
											/>
										</td>
										<td className='chat-container-height maximize-width'>
											<ChatMessages
												receiverId={userId}
												messages={messages}
												users={users}
											/>
										</td>
									</tr>
									<tr>
										<td className='maximize-width'>
											<SendChatMessage
												receiverId={userId}
												message={message}
												setMessage={setMessage}
												sendMessage={sendMessage}
												allowNextLine={allowNextLine}
												handleChange={handleChange}
											/>
										</td>
									</tr>
								</tbody>
							</Table>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default withRouter(Chat);
