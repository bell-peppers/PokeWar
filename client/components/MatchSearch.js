import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Button, makeStyles} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';
const useStyles = makeStyles(() => ({
  main: {
    fontFamily: 'Courier New, monospace',
    display: 'flex',
    backgroundColor: 'green',
    width: '100%',
    height: '600px',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  root: {
    width: '400px',
    margin: '30px',
  },
  container: {
    height: 440,
  },
  buttons: {
    display: 'flex',
    width: '150px',
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: '120px 0 120px 0',
  },
}));
const columns = [
  {id: 'position', label: '#', minWidth: 30},
  {id: 'name', label: 'Name', minWidth: 90},
  {
    id: 'score',
    label: 'Score',
    minWidth: 100,
    align: 'right',
  },
];
function createData(position, name, score) {
  return {position, name, score};
}
const rows = [
  createData(1, 'Gus', 3287263),
  createData(2, 'Nick', 9596961),
  createData(3, 'Mike', 301340),
  createData(4, 'Angie', 9833520),
  createData(5, 'Haram', 9984670),
  createData(6, 'Albina', 7692024),
  createData(7, 'Ray', 357578),
  createData(8, 'Jason', 70273),
  createData(9, 'Adrian', 1972550),
  createData(10, 'Andrew', 377973),
  createData(11, 'Sung', 640679),
  createData(12, 'Jae', 242495),
  createData(13, 'Andy', 17098246),
  createData(14, 'Taya', 923768),
  createData(15, 'Peter', 8515767),
];
const MatchSearch = (props) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <div>
      <Grid
        style={{
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: 'green',
        }}
      >
        Leaderboard position: 34532523
      </Grid>
      <Container className={classes.main}>
        <Grid className={classes.buttons}>
          <Button style={{backgroundColor: 'red'}}>Create Match</Button>
          <Button Button style={{backgroundColor: 'red'}}>
            Join Random Match
          </Button>
        </Grid>
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <TableRow>Leaderboard</TableRow>
            <Table stickyHeader aria-label='sticky table'>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{minWidth: column.minWidth}}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role='checkbox'
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
    </div>
  );
};
const mapState = (state) => {
  return {
    playerPokemon: state.pokemon.playerOnePokemon,
  };
};
const mapDispatch = (dispatch) => {
  return {};
};
export default connect(mapState, mapDispatch)(MatchSearch);
