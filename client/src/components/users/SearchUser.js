import React from 'react';
import { Form } from 'react-bootstrap';
import { searchUserService } from '../../services/user.service';

const SearchUser = ({ sendDataToParent }) => {
	const handleSearch = async e => {
		const results = await searchUserService(e.target.value);
		sendDataToParent(results.data.data);
	};
	return (
		<div>
			<Form.Control
				type='text'
				placeholder='Search a user...'
				onChange={handleSearch}
			/>
		</div>
	);
};

export default SearchUser;
