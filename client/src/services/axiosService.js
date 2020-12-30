import axios from 'axios';
import queryString from 'query-string';

const { access } = queryString.parse(location.search);

export default axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
		authorization: `Bearer ${access}`,
		contentType: 'aplication/json',
		accept: 'application/json',
	},
});
