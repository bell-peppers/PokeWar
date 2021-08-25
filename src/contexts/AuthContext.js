import React, {useContext, useState, useEffect} from 'react';
import {auth} from '../../utils/firebase';
import firebase from 'firebase/app';
import {FIREDB} from '../../utils/firebase';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}


export function AuthProvider({children}) {
  const [currentUser, setCurrentUser] = useState(null);


  //when we call signup, auth.onAuthStateChanged is gonna be called for us
  async function signup(email, password, username, url='/pics/default.png') {
    const user = await auth.createUserWithEmailAndPassword(email, password);
    createNewAccount(user.user.uid, user.user.email, username, url);
    return user;
    // firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  function createNewAccount(uid, email, name, url) {
    FIREDB.ref('users/' + uid).set({
      uid: uid,
      email: email,
      pokemon: [68, 44, 58, 76, 105, 234, 192, 204, 169, 151],
      username: name,
      photoUrl: url
    });
  }
  async function login(email, password) {
    const user = await auth.signInWithEmailAndPassword(email, password);
    //getUserData(user.user.uid);
    return user;
  }

	function logout () {
		return auth.signOut();
	}
  // function getUserData(uid) {
  //   FIREDB.ref('users/' + uid).once('value', (snap) => {
  //     console.log(snap.val());
  //   });
  // }

  //we dont want it to be in render, we want it to be in useEffect because
  //we only want it to run once when we mount our component
  useEffect(() => {
    //this func returns a method and when we call this method,
    //when we call this method its gonna unsubscribe
    //auth.onAuthStateChanged event
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
