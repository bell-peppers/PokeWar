import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <h1>POKE WAR</h1>
    <nav>Welcome</nav>
    <hr />
  </div>
);

export default connect(null, null)(Navbar);
