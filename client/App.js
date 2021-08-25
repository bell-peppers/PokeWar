import React from 'react';
import {AuthProvider} from '../src/contexts/AuthContext';
import Routes from './Routes';

const App = () => {
  return (
    <div>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </div>
  );
};

export default App;
