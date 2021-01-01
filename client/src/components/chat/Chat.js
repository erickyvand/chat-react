import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { Card, Col, Container, Row, Table } from 'react-bootstrap';
import ChatMessages from './ChatMessages';
import SendChatMessage from './SendChatMessage';
import SearchUser from '../users/SearchUser';
import Header from '../Layouts/Header';
import ChatUsers from './ChatUsers';

const Chat = props => {
	if (!sessionStorage.getItem('token')) {
		return <Redirect to='/' />;
	}
	const userId = props.match.params.userId;

	const [userData, setUserData] = useState([]);
	const [users, setUsers] = useState([]);

	const user = users.find(u => u.user._id || u.receiverId._id === userId);

	const getDataFromChild = data => {
		setUserData(data);
	};

	const getUserData = data => {
		setUsers(data);
	};

	return (
		<div>
			<Container>
				<Header />
				<Row>
					<Col>
						<Card>
							<Table bordered responsive='xs' responsive='sm'>
								<tbody>
									<tr>
										<td style={{ width: 373 }}>
											<SearchUser sendDataToParent={getDataFromChild} />
										</td>
										<td>
											<span className='font-weight-bold'>
												{user !== undefined
													? user.user.fullName || user.receiverId.fullName
													: ''}
											</span>
											<br />
											<small>online</small>
										</td>
									</tr>
									<tr>
										<td rowSpan='2' style={{ width: 373, height: 600 }}>
											<ChatUsers sendUserData={getUserData} />
										</td>
										<td style={{ height: 600 }}>
											<ChatMessages userId={userId} />
										</td>
									</tr>
									<tr>
										<td>
											<SendChatMessage />
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

export default Chat;
