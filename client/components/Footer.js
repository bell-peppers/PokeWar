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

const useStyles = makeStyles(() => ({
	contactMe: {
		marginTop: '150px',
	},
}));

export default function Footer() {
	const classes = useStyles();
	return (
		<React.Fragment>
			<CssBaseline />
			<main className={classes.main}>
				<Grid
					className={classes.footer}
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						fontFamily: 'Courier New, monospace',
					}}
				>
					<AppBar
						position='static'
						style={{
							background: '#1574b0',
							height: '100px',
						}}
					>
						<Container maxWidth='md'>
							<Toolbar>
								<Typography
									variant='body1'
									style={{ fontFamily: 'Courier New, monospace', paddingRight: '20px' }}
								>
									PokeWar 2021
								</Typography>
								<Button href='/aboutus'> About us</Button>
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
					</AppBar>
				</Grid>
			</main>
		</React.Fragment>
	);
}
