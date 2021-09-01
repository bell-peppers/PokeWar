import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import {
	Avatar,
	Box,
	Typography,
	AppBar,
	Container,
	Toolbar,
	SvgIcon,
	CardContent,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

// const useStyles = makeStyles(() => ({
// 	contactMe: {
// 		marginTop: '150px',
// 	},
// }));

export default function Footer() {
	// const classes = useStyles();
	return (
		<React.Fragment>
			<CssBaseline />
			<Grid
				style={{
					position: 'fixed',
					bottom: 0,
					width: '100%',
          backgroundColor: 'royalBlue',
					// display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					fontFamily: 'Courier New, monospace',
				}}
			>
				<AppBar
					position='static'
					style={{
						// backgroundColor: 'royalBlue',
						height: '100px',
					}}
				>
					<Container maxWidth='md'>
						<Toolbar>
							<Typography
								variant='body1'
								style={{
									fontFamily: 'Courier New, monospace',
									paddingRight: '30px',
								}}
							>
								PokeWar 2021
							</Typography>
							<Button
								href='/aboutus'
								style={{
									color: 'inherit',
									fontSize: '13px',
									// padding:'0 2px 0 2px'
								}}
							>
								Team
							</Button>
							{/* <Link
									to={{ pathname: 'https://github.com/hitaya1' }}
									target="_blank"
								>
									<BottomNavigationAction
										label="Recents"
										icon={<GitHubIcon />}
									/> */}
							{/* </Link> */}
						</Toolbar>
					</Container>
					<Grid
						style={{
							display: 'flex',
							justifyContent: 'flex-end',
							paddingRight: '40px',
						}}
					>
						Made with <img src='/pics/heart.png' width='25px' /> at
						<Link
							to={{
								pathname:
									'https://www.fullstackacademy.com/software-engineering-immersive',
							}}
							target='_blank'
							style={{
								color: 'inherit',
								// padding:'0 2px 0 2px'
							}}
						>
							{' '}
							Fullstack Academy
						</Link>
					</Grid>
				</AppBar>
			</Grid>
		</React.Fragment>
	);
}
