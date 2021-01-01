import React from 'react';
import { makeStyles, TextField } from '@material-ui/core';

const useStyles = makeStyles(() => ({
	notchedOutline: {
		borderWidth: '1px',
		borderColor: 'lightgray !important',
		borderRadius: 20,
		position: 'absolute',
	},
}));
const SendChatMessage = () => {
	const classes = useStyles();
	return (
		<div>
			<TextField
				variant='outlined'
				fullWidth
				size='small'
				multiline
				rowsMax={4}
				InputProps={{
					classes: {
						notchedOutline: classes.notchedOutline,
					},
				}}
				placeholder='Type a message...'
			/>
		</div>
	);
};

export default SendChatMessage;
