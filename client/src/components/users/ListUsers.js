import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Badge, Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import moment from 'moment';
import { makeChatService } from '../../services/chatService';
import Header from '../Layouts/Header';
import SearchUser from './SearchUser';
import { searchUserService } from '../../services/user.service';

const ListUsers = ({
	connectedUsers,
	loading,
	setLoading,
	allUsers,
	notification,
	setNotification,
	count,
	setCount,
}) => {
	const history = useHistory();

	const [searchResults, setSearchResults] = useState([]);
	const [showResults, setShowResults] = useState(false);

	const handleStartConversation = async userId => {
		try {
			await makeChatService({
				receiverId: userId,
				message: '',
			});
		} catch (error) {
			console.log(error);
		}

		if (notification.user === userId) {
			setNotification({});
			setCount(0);
		}

		history.push(`/chat/${userId}`);
	};

	const handleSearch = async e => {
		setLoading(true);
		const results = await searchUserService(e.target.value);
		setSearchResults(results.data.data);
		setLoading(false);

		if (e.target.value !== '') {
			setShowResults(true);
		} else {
			setShowResults(false);
		}
	};

	console.log(searchResults);
	useEffect(async () => {
		document.title = 'VandChat | Home';
	}, [allUsers]);

	return (
		<div>
			<Container className='mt-2'>
				<Row>
					<Col>
						<Header />
					</Col>
				</Row>
				<Row>
					<Col>
						<h5 className='text-white'>All Friends</h5>
					</Col>
					<Col>
						<p className='text-white float-right'>
							{connectedUsers.length} online
						</p>
					</Col>
				</Row>
				<Row>
					<Col>
						<SearchUser handleSearch={handleSearch} />
					</Col>
				</Row>
				<Row>
					{loading ? (
						<Col>
							<Card style={{ height: 500 }}>
								<Spinner
									animation='grow'
									style={{ margin: 'auto', width: 200, height: 200 }}
								/>
							</Card>
						</Col>
					) : allUsers.length === 0 ? (
						<Col>
							<Card>
								<p className='p-2 text-center'>
									Oops you are the only one to this platform. Wait until we will
									get other registered users.
								</p>
							</Card>
						</Col>
					) : showResults ? (
						searchResults.length === 0 ? (
							<Col className='mt-2'>
								<Card>
									<p className='p-2 text-center'>No user found</p>
								</Card>
							</Col>
						) : (
							searchResults.map(user => (
								<Col key={user._id} xs={12} sm={12} md={4} className='mt-2'>
									<Card
										className='list-user-card'
										onClick={() => handleStartConversation(user._id)}
									>
										<Card.Body>
											<Card.Title>
												<Row>
													<Col xs={12} sm={12} md={12}>
														{user.fullName}{' '}
														{notification.user === user._id ? (
															<small className='float-right'>
																<Badge variant='primary'>{count}</Badge>
															</small>
														) : (
															''
														)}
													</Col>
													<Col xs={12} sm={12} md={12}>
														{user.socket !== '' ? (
															<small>
																<Badge pill variant='success'>
																	online
																</Badge>
															</small>
														) : (
															<small className='text-secondary'>
																{'disconnected ' +
																	moment(user.updatedAt).calendar({
																		sameDay: `[${moment(
																			user.updatedAt
																		).fromNow()}]`,
																		sameElse: '',
																	})}
															</small>
														)}
													</Col>
												</Row>
											</Card.Title>
										</Card.Body>
									</Card>
								</Col>
							))
						)
					) : (
						allUsers.map(user => (
							<Col key={user._id} xs={12} sm={12} md={4} className='mt-2'>
								<Card
									className='list-user-card'
									onClick={() => handleStartConversation(user._id)}
								>
									<Card.Body>
										<Card.Title>
											<Row>
												<Col xs={12} sm={12} md={12}>
													{user.fullName}{' '}
													{notification.user === user._id ? (
														<small className='float-right'>
															<Badge variant='primary'>{count}</Badge>
														</small>
													) : (
														''
													)}
												</Col>
												<Col xs={12} sm={12} md={12}>
													{user.socket !== '' ? (
														<small>
															<Badge pill variant='success'>
																online
															</Badge>
														</small>
													) : (
														<small className='text-secondary'>
															{'disconnected ' +
																moment(user.updatedAt).calendar({
																	sameDay: `[${moment(
																		user.updatedAt
																	).fromNow()}]`,
																	sameElse: '',
																})}
														</small>
													)}
												</Col>
											</Row>
										</Card.Title>
									</Card.Body>
								</Card>
							</Col>
						))
					)}
				</Row>
			</Container>
		</div>
	);
};

export default ListUsers;
