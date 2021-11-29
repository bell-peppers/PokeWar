import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
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

export default function Footer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Grid
        style={{
          position: 'fixed',
          bottom: 0,
          width: '100%',
          backgroundColor: 'royalBlue',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: 'Courier New, monospace',
        }}
      >
        <AppBar
          position='static'
          style={{
            height: '50px',
          }}
        >
          <Container maxWidth='md'>
            <Toolbar
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}
            >
              <Typography
                variant='body1'
                style={{
                  fontFamily: 'Courier New, monospace',
                  paddingRight: '30px',
                }}
              >
                PokeWar 2021
              </Typography>
              <Link
                to='/aboutus'
                style={{
                  color: 'inherit',
                  fontSize: '13px',
                  // padding:'0 2px 0 2px'
                }}
              >
                Team
              </Link>
              <Link
                to='/contact'
                style={{
                  color: 'inherit',
                  fontSize: '13px',
                  // padding:'0 2px 0 2px'
                }}
              >
                Contact Us
              </Link>
              <Link
                to={{
                  pathname: '/instructions',
                }}
                style={{
                  color: 'inherit',
                  fontSize: '13px',
                  // padding:'0 2px 0 2px'
                }}
              >
                Instructions
              </Link>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  paddingRight: '40px',
                  alignItems: 'center',
                }}
              >
                Made with{' '}
                <img
                  src='/pics/heart.png'
                  width='25px'
                  style={{padding: '0 4px'}}
                />{' '}
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
                  {'   '}
                  at Fullstack Academy
                </Link>
              </div>
            </Toolbar>
          </Container>
          <Grid
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              paddingRight: '40px',
              alignItems: 'center',
            }}
          >
            Made with <img src='/pics/heart.png' width='25px' />
            <Link
              to={{
                pathname:
                  'https://www.fullstackacademy.com/software-engineering-immersive',
              }}
              target='_blank'
              style={{
                color: 'inherit',
                padding: '0 3px 0 3px',
              }}
            >
              {' '}
              at Fullstack Academy
            </Link>
          </Grid>
        </AppBar>
      </Grid>
    </React.Fragment>
  );
}
