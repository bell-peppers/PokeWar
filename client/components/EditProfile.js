import React, { useState, useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { Button, makeStyles, Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import { CardMedia } from '@material-ui/core'
import Image from 'material-ui-image'
import { getAuth, updateProfile } from 'firebase/auth'
import { getUserData } from '../store/userData'
import { fetchPlayerOnePokemon } from '../store/pokemon'
import TextField from '@material-ui/core/TextField'
import firebase from 'firebase/app'
import { FIREDB, storage } from '../../utils/firebase'
import { useAuth } from '../../src/contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import defaultPoke from '../data/editProfile'

const useStyles = makeStyles((theme) => ({
	main: {
		fontFamily: 'Courier New, monospace',
		backgroundColor: 'royalBlue',
		position: 'relative',
		maxWidth: '1018px',
		paddingBottom: '0px',
		margin: '15px auto',
		height: '100vh',
		backgroundImage: 'linear-gradient(120deg, #B1D4E0 0%,  #000C66 100%)',
		borderRadius: '10px',
	},
	root: {
		width: '400px',
		margin: '30px',
	},
	container: {
		height: 440,
	},
	cards: {
		display: 'flex',
		'& > *': {
			margin: theme.spacing(1),
			width: theme.spacing(8),
			height: theme.spacing(11),
		},
		imageRoot: {
			display: 'flex',
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
}))

function EditProfile(props) {
	const { user, getUserData } = props
	const { currentUser, username, updateImg } = useAuth()
	const classes = useStyles()
	const history = useHistory()

	const [image, setImage] = useState(null)
	const [usernameValue, setUsername] = useState('')
	const [url, setUrl] = useState('')

	const handleChange = (e) => {
		if (e.target.files[0]) {
			setImage(e.target.files[0])
			setUrl('')
		}
	}

	const handleSubmit = async () => {
		const update = {
			username: usernameValue,
		}
		try {
			await FIREDB.ref('/users/' + user.uid).update(update)
		} catch (error) {
			console.error(error)
		}
	}

	const handleUpload = () => {
		if (!url) {
			const uploadTask = storage.ref(`images/${currentUser.uid}`).put(image)

			uploadTask.on('state_changed', async () => {
				storage
					.ref('images/')
					.child(currentUser.uid)
					.getDownloadURL()
					.then((url) => {
						setUrl(url)
						const update = { photoUrl: url }
						FIREDB.ref('/users/' + user.uid).update(update)
					})
			})
		} else if (url) {
			const update = { photoUrl: url }
			FIREDB.ref('/users/' + user.uid).update(update)
		}
	}

	useEffect(() => {
		if (currentUser && currentUser.uid !== user.uid) {
			getUserData(currentUser.uid)
		}
	}, [user, currentUser])

	return (
		<div style={{ height: '100vh' }}>
			<Grid className={classes.main}>
				<Grid
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-around',
						paddingTop: '30px',
						paddingBottom: '30px',
					}}
				>
					<Grid>
						<Typography>Change your avatar</Typography>
						<Grid
							style={{
								display: 'flex',
								flexDirection: 'row',
								minHeight: '300px',
								justifyContent: 'space-evenly',
								border: '5px solid white',
								marginBottom: '15px',
								borderRadius: '25px',
							}}
						>
							<Grid
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								{user && user.photoUrl ? (
									<img
										src={
											url
												? url
												: image
												? URL.createObjectURL(image)
												: user.photoUrl
										}
										alt='firebase-image'
										width='180px'
										height='180px'
									/>
								) : (
									<img
										src={url || '/pics/default.png'}
										alt='firebase-image'
										width='180px'
										height='auto'
									/>
								)}
							</Grid>
							<Grid
								style={{
									display: 'flex',
									justifyContent: 'space-evenly',
									alignItems: 'space-evenly',
									flexDirection: 'column',
								}}
							>
								<input type='file' onChange={handleChange} />
								<Button
									variant='contained'
									color='primary'
									onClick={handleUpload}
								>
									Save Avatar
								</Button>
							</Grid>
						</Grid>

						<Grid>
							<Typography>Default avatars</Typography>
							<Grid
								style={{
									display: 'flex',
									padding: '20px',
									border: '5px solid white',
									width: '600px',
									justifyContent: 'space-between',
									marginBottom: '15px',
									borderRadius: '25px',
								}}
							>
								{defaultPoke.map((poke) => (
									<img
										width='150px'
										height='150px'
										src={poke.pic}
										alt={poke.name}
										onClick={() => {
											setUrl(poke.pic)
										}}
									/>
								))}
							</Grid>
						</Grid>
						<Grid
							style={{
								display: 'flex',
								justifyContent: 'center',
								flexDirection: 'column',
							}}
						>
							<Typography>Change your username</Typography>
							<Grid
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'center',
									paddingTop: '20px',
									border: '5px solid white',
									paddingBottom: '20px',
									borderRadius: '25px',
								}}
							>
								<form
									style={{
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'center',
										alignItems: 'center',
									}}
								>
									<TextField
										id='username'
										placeholder={user.username}
										defaultValue={user.username}
										variant='filled'
										onChange={(e) => setUsername(e.target.value)}
									/>
									<Button
										variant='contained'
										color='primary'
										onClick={handleSubmit}
									>
										Save Username
									</Button>
								</form>
							</Grid>
							<Button
								onClick={() => history.push('/profile')}
								variant='contained'
								color='primary'
								style={{ marginTop: '5px' }}
							>
								Done
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</div>
	)
}

const mapState = (state) => {
	return {
		playerPokemon: state.pokemon.playerOnePokemon,
		user: state.userData.user,
	}
}
const mapDispatch = (dispatch) => {
	return {
		fetchPokemon: (pk) => dispatch(fetchPlayerOnePokemon(pk)),
		getUserData: (uid) => dispatch(getUserData(uid)),
	}
}
export default connect(mapState, mapDispatch)(EditProfile)
