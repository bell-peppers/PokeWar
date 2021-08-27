import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemon } from '../store/allPokemon';
import Card from '@material-ui/core/Card';
import { CardContent, Typography, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { colorTypeGradients } from '../../utils/ColorGradientFunc';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Modal from '@material-ui/core/Modal';
import { Pagination } from '@material-ui/lab';
import Loading from './Loading';

/**
 * COMPONENT
 */
const useStyles = makeStyles((theme) => ({
  PokeCards: {
    fontFamily: 'Courier New, monospace',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '200px',
    margin: '10px',
  },
  paper: {
    position: 'absolute',
    width: 400,
    border: '2px solid #000',
  },
}));

export default function AllPokemon(props) {
  const pokemon = useSelector((state) => state.allPokemon);
  const dispatch = useDispatch();
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(true);
  const [Page, setPage] = useState(1);

  const [open, setOpen] = React.useState(false);
  const [selectedPokemon, setSelectedPokemon] = React.useState({});
  const [pokeColor, setPokeColor] = React.useState([]);

  const handleOpen = (pokemon, color) => {
    setOpen(true);
    setSelectedPokemon(pokemon);
    setPokeColor(color);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPokemon({});
    setPokeColor([]);
  };

  const handlePagination = (evt, page) => {
    setPage(page);
    setIsLoading(true);
    dispatch(fetchPokemon((page - 1) * 50)).then(() => {
      setIsLoading(false);
    });
  };

  useEffect(() => {
    dispatch(fetchPokemon(0)).then(() => {
      console.log(pokemon);
      setIsLoading(false);
    });
  }, [dispatch]);

  return (
    <div className='main'>
      {isLoading ? (
        <Loading />
      ) : (
        <React.Fragment>
          <Pagination
            count={13}
            page={Page}
            onChange={handlePagination}
            style={{ display: 'block' }}
          />
          <div className='main'>
            {pokemon[0] &&
              pokemon.map((poke) => {
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
                  <React.Fragment key={poke.id}>
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
                            onClick={() => handleOpen(poke, finalColor)}
                            style={{
                              cursor: 'pointer',
                            }}
                          />
                        </Typography>
                        <Typography>
                          <img
                            className='cardPic'
                            src={
                              poke.sprites.other['official-artwork']
                                .front_default
                            }
                          />
                        </Typography>
                        <Typography className='data'>{poke.name}</Typography>
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
                            <img
                              src={`assets/${poke.types[0].type.name}.png`}
                            />
                            <img
                              src={`assets/${poke.types[1].type.name}.png`}
                            />
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
                            <img
                              src={`assets/${poke.types[0].type.name}.png`}
                            />
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  </React.Fragment>
                );
              })}
          </div>
          <Pagination
            count={13}
            page={Page}
            onChange={handlePagination}
            style={{ display: 'block' }}
          />
        </React.Fragment>
      )}
      {selectedPokemon.id && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='simple-modal-title'
          aria-describedby='simple-modal-description'
        >
          <div
            style={{
              background: `linear-gradient(${pokeColor[0]}, ${pokeColor[1]})`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              outline: 0,
            }}
            className={classes.paper}
          >
            <h2 style={{ textAlign: 'center' }}>{selectedPokemon.name}</h2>
            <h3 style={{ marginLeft: '2rem' }}>Abilities:</h3>
            <ul style={{ display: 'inline-block', listStyle: 'none' }}>
              <li>{selectedPokemon.moves[0].move.name}</li>
              <li>{selectedPokemon.moves[1].move.name}</li>
            </ul>
            <ul style={{ display: 'inline-block', listStyle: 'none' }}>
              <li>{selectedPokemon.moves[2].move.name}</li>
              <li>{selectedPokemon.moves[3].move.name}</li>
            </ul>
            <h3 style={{ marginLeft: '2rem' }}>Base Stats:</h3>
            <ul style={{ display: 'inline-block', listStyle: 'none' }}>
              <li>HP {selectedPokemon.stats[0].base_stat}</li>
              <li>ATK {selectedPokemon.stats[1].base_stat}</li>
            </ul>
            <ul style={{ display: 'inline-block', listStyle: 'none' }}>
              <li>DEF {selectedPokemon.stats[2].base_stat}</li>
              <li>SP ATK {selectedPokemon.stats[3].base_stat}</li>
            </ul>
            <ul style={{ display: 'inline-block', listStyle: 'none' }}>
              <li>SP DEF {selectedPokemon.stats[4].base_stat}</li>
              <li>SPD {selectedPokemon.stats[5].base_stat}</li>
            </ul>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {selectedPokemon.types ? (
                selectedPokemon.types.length === 2 ? (
                  <div
                    style={{
                      display: 'flex',
                      width: '100px',
                      height: '20px',
                      margin: '6px',
                      justifyContent: 'space-evenly',
                    }}
                  >
                    <img
                      src={`assets/${selectedPokemon.types[0].type.name}.png`}
                    />
                    <img
                      src={`assets/${selectedPokemon.types[1].type.name}.png`}
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      width: '20px',
                      height: '20px',
                      margin: '6px',
                    }}
                  >
                    <img
                      src={`assets/${selectedPokemon.types[0].type.name}.png`}
                    />
                  </div>
                )
              ) : null}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
