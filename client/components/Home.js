import React from 'react';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;

  return (
    <div>
      <h3>Welcome, {username}</h3>
    </div>
  );
};

export default connect(null, null)(Home);
