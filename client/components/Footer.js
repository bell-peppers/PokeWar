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
import GitHubIcon from '@material-ui/icons/GitHub';
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
						dispay: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						fontFamily: 'Courier New, monospace',
					}}
				>
					<AppBar
						position="static"
						style={{ position: 'absolute', bottom: 0, background: '#1574b0', height: '100px' }}
					>
						<Container maxWidth="md">
							<Toolbar>
								<Typography
									variant="body1"
									style={{ fontFamily: 'Courier New, monospace' }}
								>
									© 2021
								</Typography>

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
};
