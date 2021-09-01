import React from 'react';
import {AuthProvider} from '../src/contexts/AuthContext';
import Routes from './Routes';
import Footer from './components/Footer';

const App = () => {
  return (
    <div>
      <AuthProvider>
        <Routes />
        {/* <Footer /> */}
      </AuthProvider>
    </div>
  );
};

export default App;
