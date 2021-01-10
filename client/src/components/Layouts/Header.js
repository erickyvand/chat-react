import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { IconButton, Tooltip } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Card, Col, Row } from 'react-bootstrap';

const Header = ({ match }) => {
	const handleLogout = () => {
		sessionStorage.removeItem('id');
		sessionStorage.removeItem('fullName');
		sessionStorage.removeItem('token');
		location.href = '/email';
	};
	return (
		<div>
			<Row className='mt-2'>
				<Col xs={12} sm={12}>
					<Card className='bg-info'>
						<Card.Body>
							<Row>
								<Col>
									<Card.Title className='text-white'>VandChat</Card.Title>
								</Col>
								<Col>
									{match.path === '/friends' ? (
										''
									) : (
										<h5>
											<Link to='/friends' className='text-white'>
												Find Friends
											</Link>
										</h5>
									)}
								</Col>
								<Col>
									<Card.Title className='float-right text-white'>
										Welcome &nbsp;
										{sessionStorage.getItem('fullName')}
										<Tooltip title='Exit Chat'>
											<IconButton color='inherit' onClick={handleLogout}>
												<ExitToAppIcon />
											</IconButton>
										</Tooltip>
									</Card.Title>
								</Col>
							</Row>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default withRouter(Header);
