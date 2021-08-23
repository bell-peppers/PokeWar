import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography, Grid } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useAuth } from '../../src/contexts/AuthContext';
import firebase from 'firebase/app';

const useStyles = makeStyles(() => ({
	navbar: {
		width: '90vw',
		margin: '0vh 5vw 0vh 5vw',
		// borderRadius: '0px 0px 30px 30px',
		backgroundColor: '#1574b0',
		color: '#3d405b',
	},
	cart: {
		width: '80vw',
		marginLeft: '5vw',
		display: 'flex',
		justifyContent: 'space-between',
	},
	leftMenu: {
		display: 'flex',
		flexDirection: 'row',
	},
	p: {
		margin: '5px 25px 0px 25px',
		fontSize: '20px',
		fontFamily: 'Courier New, monospace',
		cursor: 'pointer',
		textDecoration: 'none',
		color: 'white',
	},
}));

const Navbar = () => {
	const [error, setError] = useState('');
	const classes = useStyles();
	const { currentUser, logout } = useAuth();

	console.log(firebase.auth());
	// const { currentUser } = firebase.auth();

	function handleLogout() {}
	// useEffect(() => {

	// });
	return (
		<AppBar position='fixed' className={classes.navbar}>
			{/* {console.log(currentUser)} */}
			{/* {console.log(currentUser)} */}
			{/* {currentUser && currentUser.email} */}
			{error && console.log(error)}
			<div>{error && <Alert>{error.message}</Alert>}</div>
			<Toolbar className={classes.cart}>
				<a className={classes.p} href='/'>
					Poke Wars
				</a>
				<Grid className={classes.leftMenu}>
					<a className={classes.p} href='/allpokemon'>
						All Pokemon
					</a>
					<a className={classes.p} href='/myprofile'>
						My Profile
					</a>
				</Grid>
				<Button onClick={handleLogout}>Sign Out</Button>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
