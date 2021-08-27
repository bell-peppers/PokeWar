import React, { useState, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Button, makeStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { CardMedia } from '@material-ui/core';
import Image from 'material-ui-image';
import { useAuth } from '../../src/contexts/AuthContext';
import { getUserData } from '../store/userData';
import { fetchPlayerOnePokemon } from '../store/pokemon';
import TextField from '@material-ui/core/TextField';
import firebase from 'firebase/app';
import { FIREDB, storage } from '../../utils/firebase';
import 'firebase/database';
import 'firebase/auth';

const useStyles = makeStyles((theme) => ({
	main: {
		fontFamily: 'Courier New, monospace',
		// display: 'flex',
		// flex: '1',
		backgroundColor: 'royalBlue',
		position: 'relative',
		maxWidth: '1018px',
		// minHeight: '224px',
		paddingBottom: '0px',
		margin: '0 auto',
		// flexWrap: 'nowrap',

		// maxWidth: '960px',
		// position: 'relative'
		// height: '600px',
		// flexDirection: 'column',
		// justifyContent: 'center',
		// margin: '0  100px 0 100px'
	},
	root: {
		// flexWrap: 'nowrap',
		width: '400px',
		margin: '30px',
	},
	container: {
		// flexWrap: 'nowrap',
		height: 440,
	},
	cards: {
		display: 'flex',
		// flexWrap: 'wrap',
		'& > *': {
			margin: theme.spacing(1),
			width: theme.spacing(8),
			height: theme.spacing(11),
		},
		imageRoot: {
			display: 'flex',
			// flexWrap: 'nowrap',
			// width: '350px',
			justifyContent: 'space-around',
			overflow: 'hidden',
			backgroundColor: theme.palette.background.paper,
		},
		title: {
			color: theme.palette.primary.light,
		},
		titleBar: {
			background:
				'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
		},
		notHovered: {
			width: '150px',
			height: '150px',
			padding: '10px',
		},

		hover: {
			transform: `scale(1.5)`,
		},
	},
}));

function EditProfile(props) {
	const { user, playerPokemon, fetchPokemon, getUserData } = props;
	// const playerPokemon = useSelector((state) => state.pokemon.playerOnePokemon);
	const { currentUser, username } = useAuth();
	const classes = useStyles();

	let photo = '';
	const [image, setImage] = useState(null);
	const [usernameValue, setUsername] = useState('');
	const [url, setUrl] = useState('');
	// const [hover, setHover] = useState(false);

	// const toggleHover = () => {
	// 	setHover;
	// };

	const handleChange = (e) => {
		if (e.target.files[0]) {
			setImage(e.target.files[0]);
		}
	};

	const changePhoto = (imgUrl) => {
		currentUser
			.updateProfile({
				photoURL: imgUrl,
			})
			.then(() => {
				console.log('hey', imgUrl, currentUser);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleUpload = async () => {
		const uploadTask = storage.ref(`images/${currentUser.uid}`).put(image);
		uploadTask.on('state_changed', () => {
			storage
				.ref('images/')
				.child(currentUser.uid)
				.getDownloadURL()
				.then((url) => {
					setUrl(url);
					currentUser
						.updateProfile({
							photoURL: url,
						})
						.then(() => {
							console.log('hey', url, currentUser);
						})
						.catch((error) => {
							console.log(error);
						});
				});
		});
	};

	// const updateUser = (value) => {
	// 		const uid = currentUser.uid;
	// 			const pokemon = currentUser.pokemon;
	// 			const email = currentUser.email;
	// 			const username = currentUser.username;
	// 		currentUser && 		console.log(uid, pokemon, email, username)

	// 	currentUser && FIREDB.ref('users/' + currentUser.uid).set({
	// 		email: currentUser.email,
	// 		pokemon: currentUser.pokemon,
	// 		uid: currentUser.uid,
	// 		username : 'hi'
	// 	}).then(console.log('oops'));
	// 	console.log(value)
	// };

	useEffect(() => {
		if (currentUser && currentUser.uid !== user.uid) {
			getUserData(currentUser.uid);
		}
	}, [user, currentUser]);

	return (
		<div>
			<Grid className={classes.main}>
				<Grid
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-around',
						paddingTop: '30px',
					}}
				>
					<Grid>
						<Typography>AVATAR</Typography>
						<Typography>Choose your avatar image</Typography>
						<Grid
							style={{
								display: 'flex',
								flexDirection: 'column',
								minHeight: '300px',
								justifyContent: 'center',
							}}
						>
							<Grid
								style={{
									display: 'flex',
									justifyContent: 'center',
									paddingBottom: '20px',
								}}
							>
								{currentUser && (
									<img
										// src={url}
										src={url || currentUser.photoURL}
										alt='firebase-image'
										width='180px'
										height='180px'
									/>
								)}
							</Grid>
							<Grid style={{ display: 'flex' }}>
								<input type='file' onChange={handleChange} />
								<button onClick={handleUpload}>Upload</button>
							</Grid>
						</Grid>
						<Grid>
							<Typography>Your avatars</Typography>
							<Grid
								style={{
									display: 'flex',
									padding: '20px',
									border: '5px solid grey',
									width: '600px',
									justifyContent: 'space-between',
								}}
							>
								<img
									width='150px'
									height='150px'
									padding='10px'
									src='https://firebasestorage.googleapis.com/v0/b/poke-war-4483c.appspot.com/o/bulbasaur.png?alt=media&token=92102872-97ff-4fd3-8b81-65e7ce211a5f'
									alt='bulbasaur'
									onClick={() =>
										(photo =
											'https://firebasestorage.googleapis.com/v0/b/poke-war-4483c.appspot.com/o/bulbasaur.png?alt=media&token=92102872-97ff-4fd3-8b81-65e7ce211a5f')
									}
								/>
								{/* {bulbasaur} */}
								<img
									width='150px'
									height='150px'
									src='https://firebasestorage.googleapis.com/v0/b/poke-war-4483c.appspot.com/o/charmander.png?alt=media&token=726a00eb-7fa6-4446-8152-cfb767f673e6'
									alt='charmander'
									onClick={() =>
										(photo =
											'https://firebasestorage.googleapis.com/v0/b/poke-war-4483c.appspot.com/o/charmander.png?alt=media&token=726a00eb-7fa6-4446-8152-cfb767f673e6')
									}
								/>
								<img
									width='150px'
									height='150px'
									src='https://firebasestorage.googleapis.com/v0/b/poke-war-4483c.appspot.com/o/cute_poke.png?alt=media&token=7e307fea-7cba-4b23-9f30-bbe81a9844d2'
									alt='cute_poke'
									// onMouseOver={() => enlargeImg()}
									onClick={() =>
										(photo =
											'https://firebasestorage.googleapis.com/v0/b/poke-war-4483c.appspot.com/o/cute_poke.png?alt=media&token=7e307fea-7cba-4b23-9f30-bbe81a9844d2')
									}
								/>
							</Grid>
							<Grid style={{ display: 'flex', justifyContent: 'center' }}>
								<Button
									onClick={() => {
										changePhoto(photo);
										photo = '';
									}}
								>
									Choose The Picture
								</Button>
							</Grid>
						</Grid>
						<form style={{ display: 'flex', paddingTop: '20px' }}>
							<TextField
								id='username'
								placeholder={user.username}
								variant='filled'
								// value={usernameValue}
								onChange={(e) => setUsername(e.target.value)}
								// onChange={(e) => console.log(e.target.value)}
							/>
							{/* <Button onClick={updateUser(usernameValue)}>Update Username</Button> */}
						</form>
					</Grid>
					{/* {playerPokemon && console.log(playerPokemon)} */}
				</Grid>
				{/* <Grid>
					<Button href='/myprofile'>Save</Button>
				</Grid> */}
			</Grid>
			<Grid className={classes.main}>
				<Grid
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						margin: '0 50px 30px 25px',
						paddingLeft: '9px',
						paddingTop: '50px',
					}}
				></Grid>
			</Grid>
		</div>
	);
}

const mapState = (state) => {
	// console.log(state.pokemon)
	return {
		playerPokemon: state.pokemon.playerOnePokemon,
		user: state.userData.user,
	};
};
const mapDispatch = (dispatch) => {
	return {
		fetchPokemon: (pk) => dispatch(fetchPlayerOnePokemon(pk)),
		getUserData: (uid) => dispatch(getUserData(uid)),
	};
};
export default connect(mapState, mapDispatch)(EditProfile);
