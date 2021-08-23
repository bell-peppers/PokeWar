import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../../utils/firebase';
import firebase from 'firebase/app';

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();

	//when we call signup, auth.onAuthStateChanged is gonna be called for us
	function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
		// firebase.auth().createUserWithEmailAndPassword(email, password);
	}

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }
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
	};
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
