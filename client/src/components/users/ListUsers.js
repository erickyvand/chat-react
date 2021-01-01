import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { userService } from '../../services/user.service';

const ListUsers = () => {
	const history = useHistory();
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);

	const handleStartConversation = userId => {
		history.push(`/chat/${userId}`);
	};

	useEffect(async () => {
		try {
			setLoading(true);
			const results = await userService();
			setUsers(results.data.data);
			setLoading(false);
		} catch (error) {}
	}, []);
	return (
		<div>
			<Container className='mt-2'>
				<Row>
					<Col>
						<h5 className='bg-white'>
							Click on any name, and start the conversation
						</h5>
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
					) : users.length === 0 ? (
						<h5 className='bg-white'>
							This is the start and the list is empty
						</h5>
					) : (
						users.map(user => (
							<Col key={user._id} md={4} className='mt-3'>
								<Card
									className='list-user-card'
									onClick={() => handleStartConversation(user._id)}
								>
									<Card.Body>
										<Card.Title>{user.fullName}</Card.Title>
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
