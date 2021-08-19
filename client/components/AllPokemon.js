import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemon } from '../store/allPokemon';
import Card from '@material-ui/core/Card';
import { CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { colorTypeGradients } from '../../utils/ColorGradientFunc';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CardInfoModal from './CardInfoModal';

/**
 * COMPONENT
 */
const useStyles = makeStyles(theme => ({
  PokeCards: {
    fontFamily: 'Courier New, monospace',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // backgroundColor: '#495057',
    width: '200px',
    margin: '10px',
  },
}));

function CardInfoModal(props) {
  const classes = useStyles();
  const { isOpen, setOpen } = props;

  const body = (
    <div className={classes.paper}>
      <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
    </div>
  );

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={setOpen(!isOpen)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

export default function AllPokemon(props) {
  const pokemon = useSelector(state => state.pokemon);
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    dispatch(fetchPokemon());
  }, [dispatch]);

  const classes = useStyles();
  // console.log(pokemon);
  console.log(open);
  return (
    <div className="main">
      {pokemon.map(poke => {
        let finalColor;

        if (poke.types.length === 2) {
          finalColor = colorTypeGradients(
            poke.types[0].type.name,
            poke.types[1].type.name,
            poke.types.length
          );
        } else {
          finalColor = colorTypeGradients(
            poke.types[0].type.name,
            poke.types[0].type.name,
            poke.types.length
          );
        }

        return (
          <React.Fragment>
            <Card
              className={classes.PokeCards}
              key={poke.id}
              style={{
                background: `linear-gradient(${finalColor[0]}, ${finalColor[1]})`,
              }}
            >
              <CardContent>
                <Typography
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  #{poke.id}{' '}
                  <InfoOutlinedIcon
                    onClick={() => setOpen(!open)}
                    style={{
                      cursor: 'pointer',
                    }}
                  />
                </Typography>
                <Typography>
                  <img
                    className="cardPic"
                    src={poke.sprites.other['official-artwork'].front_default}
                  />
                </Typography>
                <Typography className="data">{poke.name}</Typography>
                {poke.types.length === 2 ? (
                  <Typography
                    style={{
                      display: 'flex',
                      width: '100px',
                      height: '20px',
                      marginTop: '4px',
                      marginLeft: '20%',
                      justifyContent: 'space-evenly',
                    }}
                  >
                    <img src={`assets/${poke.types[0].type.name}.png`} />
                    <img src={`assets/${poke.types[1].type.name}.png`} />
                  </Typography>
                ) : (
                  <Typography
                    style={{
                      display: 'flex',
                      width: '20px',
                      height: '20px',
                      marginTop: '4px',
                      marginLeft: '45%',
                    }}
                  >
                    <img src={`assets/${poke.types[0].type.name}.png`} />
                  </Typography>
                )}
              </CardContent>
            </Card>
          </React.Fragment>
        );
      })}
      {open && <CardInfoModal isOpen={open} setOpen={setOpen} />}
    </div>
  );
}
