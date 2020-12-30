import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { Card, Col, Container, Row, Table } from 'react-bootstrap';
import ListUsers from '../users/ListUsers';
import ChatMessages from './ChatMessages';
import SendChatMessage from './SendChatMessage';
import SearchUser from '../users/SearchUser';
import Header from '../Layouts/Header';
import ChatUsers from './ChatUsers';

const Chat = () => {
	if (!sessionStorage.getItem('token')) {
		return <Redirect to='/' />;
	}

	const [userData, setUserData] = useState([]);

	const getDataFromChild = data => {
		setUserData(data);
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
											<span className='font-weight-bold'>John Doe</span>
											<br />
											<small>online</small>
										</td>
									</tr>
									<tr>
										<td rowSpan='2' style={{ width: 373, height: 600 }}>
											<ChatUsers searchResults={userData} />
										</td>
										<td style={{ height: 600 }}>
											<ChatMessages />
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
