import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import {Typography, SvgIcon} from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import Image from 'material-ui-image';

const useStyles = makeStyles((theme) => ({
  h3: {
    maxWidth: '295px',
    fontSize: '20px',
    margin: '10px',
    overflow: 'hidden',
    fontFamily: 'Courier New, monospace',
  },
}));

export default function AboutUs() {
  const classes = useStyles();
  return (
    <div>
      <React.Fragment>
        <CssBaseline />
        <Grid>
          <Grid
            style={{
              display: 'flex',
              justifyContent: 'flexStart',
              paddingLeft: '150px',
            }}
          >
            <Grid
              style={{
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '80px',
                paddingBottom: '40px',
              }}
            >
              <CardMedia
                style={{
                  // marginTop: '100px',
                  width: 300,
                  // margin: '40px 0'
                  // margin: 'auto',
                  justifyContent: 'center',
                }}
              >
                <img
                  src='/pics/mike.png'
                  // height = '80%'
                  style={{
                    width: '320px',
                    height: '250px',
                    // height: '10%',
                  }}
                ></img>
              </CardMedia>
              <Typography className={classes.h3}>
                Hi! I am Mike. <br /> I'm a former tech salesperson turned full
                stack engineer!
              </Typography>
              <Grid
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  padding: '40px 0 50px 0',
                }}
              >
                <Link
                  to={{pathname: 'https://github.com/Malessi5'}}
                  target='_blank'
                >
                  <SvgIcon>
                    <GitHubIcon />
                  </SvgIcon>
                </Link>
                <Link
                  to={{
                    pathname: 'https://www.linkedin.com/in/mpalessi/',
                  }}
                  target='_blank'
                >
                  <SvgIcon>
                    <LinkedInIcon />
                  </SvgIcon>
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid style={{position: 'relative', paddingLeft: '300px'}}>
            <Grid
              style={{
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '40px',
                paddingBottom: '40px',
              }}
            >
              <Grid
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  padding: '40px 0 50px 0',
                }}
              >
                <Link
                  to={{pathname: 'https://github.com/hitaya1'}}
                  target='_blank'
                >
                  <SvgIcon>
                    <GitHubIcon />
                  </SvgIcon>
                </Link>
                <Link
                  to={{
                    pathname: 'https://www.linkedin.com/in/taissiya-ugay/',
                  }}
                  target='_blank'
                >
                  <SvgIcon>
                    <LinkedInIcon />
                  </SvgIcon>
                </Link>
              </Grid>
              <Typography className={classes.h3}>
                Hi! I'm Taya. I hope you enjoy PokeWar as much as we do! It was
                such a fun project to work on
                <br />
                // GAMERS RISE UP. DAYTIME POKEWAR, NIGHTTIME POKEWAR. <br />
                JOIN ME
              </Typography>
              <CardMedia
                style={{
                  // marginTop: '100px',
                  width: 305,
                  // margin: 'auto',
                  // justifyContent: 'center',
                }}
              >
                <img
                  src='/pics/taya.png'
                  style={{
                    width: '350px',
                    height: '250px',
                  }}
                />
              </CardMedia>
            </Grid>
          </Grid>
          <Grid
            style={{
              display: 'flex',
              justifyContent: 'flexStart',
              paddingLeft: '150px',
            }}
          >
            <Grid
              style={{
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '40px',
                paddingBottom: '40px',
              }}
            >
              <CardMedia
                style={{
                  // marginTop: '100px',
                  width: 300,
                  // margin: 'auto',
                  // justifyContent: 'center',
                }}
              >
                <img
                  src='/pics/gus.png'
                  style={{
                    width: '260px',
                    height: '240px',
                  }}
                />
              </CardMedia>
              <Typography className={classes.h3}>
                Hi! I am Gus. <br />
                1v1 me bro
              </Typography>
              <Grid
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  padding: '40px 0 50px 0',
                }}
              >
                <Link
                  to={{pathname: 'https://github.com/Gustavo-Blu'}}
                  target='_blank'
                >
                  <SvgIcon>
                    <GitHubIcon />
                  </SvgIcon>
                </Link>
                <Link
                  to={{
                    pathname: 'https://www.linkedin.com/in/gustavoallen92/',
                  }}
                  target='_blank'
                >
                  <SvgIcon>
                    <LinkedInIcon />
                  </SvgIcon>
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid style={{paddingLeft: '300px'}}>
            <Grid
              style={{
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '40px',
                paddingBottom: '120px',
              }}
            >
              <Grid
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  padding: '40px 0 50px 0',
                }}
              >
                <Link
                  to={{pathname: 'https://github.com/NickFasulo'}}
                  target='_blank'
                >
                  <SvgIcon>
                    <GitHubIcon />
                  </SvgIcon>
                </Link>
                <Link
                  to={{
                    pathname: 'https://www.linkedin.com/in/nicholas-fasulo/',
                  }}
                  target='_blank'
                >
                  <SvgIcon>
                    <LinkedInIcon />
                  </SvgIcon>
                </Link>
              </Grid>
              <Typography className={classes.h3}>
                Hi! I am Nick!
                <br />
                1v1 me bro
              </Typography>
              <CardMedia
                style={{
                  // marginTop: '100px',
                  width: 300,
                  // margin: 'auto',
                  // justifyContent: 'center',
                }}
              >
                <img
                  src='/pics/nick.png'
                  style={{
                    width: '300px',
                    height: '280px',
                  }}
                />
              </CardMedia>
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    </div>
  );
}
