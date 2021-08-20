import React from 'react';

import Navbar from './components/Navbar';
import Routes from './Routes';
import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyB80iZmlITjBudgVNbGS2c32Qx0plWzCx4',
  authDomain: 'poke-war-4483c.firebaseapp.com',
  databaseURL: 'https://poke-war-4483c-default-rtdb.firebaseio.com',
  projectId: 'poke-war-4483c',
  storageBucket: 'poke-war-4483c.appspot.com',
  messagingSenderId: '778563832507',
  appId: '1:778563832507:web:71823a50a2c3569726379e',
  measurementId: 'G-3EWLW518HB',
};
//firebase.intitalizeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
export const FIREDB = firebase.database();

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  );
};

export default App;
