import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../../utils/firebase';
import firebase from 'firebase/app';
import { FIREDB } from '../../utils/firebase';
// import { getDatabase, ref, child, get } from 'firebase/database';

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}
let count = 1;
export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);

	//when we call signup, auth.onAuthStateChanged is gonna be called for us
	async function signup(email, password, username) {
		const user = await auth.createUserWithEmailAndPassword(email, password);
		createNewAccount(user.user.uid, user.user.email, username);
		return user;
		// firebase.auth().createUserWithEmailAndPassword(email, password);
	}
	function createNewAccount(uid, email, name) {
		// try {
      const users = []
		FIREDB.ref('users')
			.on('value', function (snapshot) {
				console.log('There are ' + snapshot.numChildren() + ' users');
				return snapshot.numChildren();
			})
			.then((num) => {
				FIREDB.ref('users/').on('child_added', (snap) => {
					count++;
          users.fill(num);
					// const users = Promise.all()
					console.log('users', snap.length);
          // users.map()
					// const users = [];
					// users.push(snap.key);
					// return users;
					// console.log('added', snap.key);
				});
			});

		FIREDB.ref('users/' + uid).set({
			uid: uid,
			email: email,
			pokemon: [89, 1, 24, 76, 105, 562, 33, 69],
			favPokemon: [],
			username: name,
			photoUrl: '',
			wins: 0,
			totalGames: 0,
			coins: 100,
			friends: [],
			id: count,
		});
		// .then(() => {
		// FIREDB.ref('usernames/' + name).set({
		// 	uid: uid,
		// });
		// });
		// } catch (e) {
		// 	console.log(e)
		// }
	}

	async function login(email, password) {
		const user = await auth.signInWithEmailAndPassword(email, password);
		//getUserData(user.user.uid);
		return user;
	}

	function logout() {
		return auth.signOut();
	}
	// function getUserData(uid) {
	//   FIREDB.ref('users/' + uid).once('value', (snap) => {
	//     console.log(snap.val());
	//   });
	// }

	// function getOtherUser(userId) {
	// 	FIREDB.ref('/users'),
	// 	function(snapshot) {
	// 	  console.log(JSON.stringify(snapshot))
	// 	}
	// 	const dbRef = FIREDB.ref(FIREDB.getDatabase());
	// 	FIREDB.get(FIREDB.child(dbRef, `users/${userId}`))
	// 		.then((snapshot) => {
	// 			if (snapshot.exists()) {
	// 				console.log(snapshot.val());
	// 			} else {
	// 				console.log('No data available');
	// 			}
	// 		})
	// 		.catch((error) => {
	// 			console.error(error);
	// 		});
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
		logout,
		// getOtherUser,
	};
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
