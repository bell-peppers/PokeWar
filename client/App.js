import React from 'react';
import { AuthProvider } from '../src/contexts/AuthContext';

import Navbar from './components/Navbar';
import Routes from './Routes';

const App = () => {
  return (
      <AuthProvider>
      <Navbar />
      <Routes />
      </AuthProvider>
  );
};

export default App;
