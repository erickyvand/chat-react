import React from 'react';
import { Row, Col } from 'react-bootstrap';

const ChatMessages = () => {
	return (
		<div style={{ height: 600, width: '100%' }} className='overflow-auto'>
			<Row className='float-right w-75 m-1'>
				<Col>
					<div className='bg-primary p-2 text-white border-radius'>
						<h6 className='color-users-title'>Ericky Vand</h6>
						<p>Lorem ipsum dolor, sit</p>
					</div>
					<small className='float-right text-muted'>50min ago</small>
				</Col>
			</Row>
			<Row className='w-75 m-2'>
				<Col>
					<div className='bg-info text-white p-2 border-radius'>
						<h6 className='color-users-title'>John Doe</h6>
						<p>
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi
							quisquam laudantium eaque cum voluptas excepturi ipsa dolorem
							officia illum aliquid possimus, repudiandae, dignissimos modi
							molestiae quibusdam tempore. Nobis, tempora ut?
						</p>
					</div>
					<small className='text-muted'>5min ago</small>
				</Col>
			</Row>
			<Row className='float-right w-75 m-1'>
				<Col>
					<div className='bg-primary p-2 text-white border-radius'>
						<h6 className='color-users-title'>Ericky Vand</h6>
						<p>Lorem ipsum dolor, sit</p>
					</div>
					<small className='float-right text-muted'>50min ago</small>
				</Col>
			</Row>
			<Row className='w-75 m-2'>
				<Col>
					<div className='bg-info text-white p-2 border-radius'>
						<h6 className='color-users-title'>John Doe</h6>
						<p>
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi
							quisquam laudantium eaque cum voluptas excepturi ipsa dolorem
							officia illum aliquid possimus, repudiandae, dignissimos modi
							molestiae quibusdam tempore. Nobis, tempora ut?
						</p>
					</div>
					<small className='text-muted'>5min ago</small>
				</Col>
			</Row>
			<Row className='float-right w-75 m-1'>
				<Col>
					<div className='bg-primary p-2 text-white border-radius'>
						<h6 className='color-users-title'>Ericky Vand</h6>
						<p>Lorem ipsum dolor, sit</p>
					</div>
					<small className='float-right text-muted'>50min ago</small>
				</Col>
			</Row>
			<Row className='w-75 m-2'>
				<Col>
					<div className='bg-info text-white p-2 border-radius'>
						<h6 className='color-users-title'>John Doe</h6>
						<p>
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi
							quisquam laudantium eaque cum voluptas excepturi ipsa dolorem
							officia illum aliquid possimus, repudiandae, dignissimos modi
							molestiae quibusdam tempore. Nobis, tempora ut?
						</p>
					</div>
					<small className='text-muted'>5min ago</small>
				</Col>
			</Row>
		</div>
	);
};

export default ChatMessages;
