import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../../utils/firebase';
import Firebase from 'firebase/app';
import { FIREDB } from '../../utils/firebase';
import { getDatabase, ref, child, get } from '../../utils/firebase';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}
// let count = 1;
export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);

	//when we call signup, auth.onAuthStateChanged is gonna be called for us
	async function signup(email, password, username) {
		const user = await auth.createUserWithEmailAndPassword(email, password);
		createNewAccount(user.user.uid, user.user.email, username);
		return user;
		// firebase.auth().createUserWithEmailAndPassword(email, password);
	}

	function findUserProfile(userUID) {
		const targetUser = {};
		FIREDB.ref('users').on('value', function (snapshot) {
			const users = snapshot.val();

			for (const user in users) {
				if (user === userUID) {
					targetUser.email = users[user].email;
          targetUser.coins = users[user].coins;
          targetUser.photoUrl = users[user].photoUrl;
          targetUser.pokemon = users[user].pokemon;
          targetUser.totalGames = users[user].totalGames;
          targetUser.uid = users[user].uid;
          targetUser.username = users[user].username;
          targetUser.wins = users[user].wins;
				}
			}
			// 	console.log(Object.keys(snapshot.val()));
			// 	console.log('There are ' + snapshot.numChildren() + ' users');
			// 	return snapshot.val();
			// });
		});
		return targetUser;
	}
	function createNewAccount(uid, email, name) {
		// try {
		// const users = [];

		// .then((num) => {
		// const everyone =FIREDB.ref('users').orderByKey().limitToLast(100).on('value', snap => {
		//   console.log(snap)
		// })
		// console.log(everyone)

		// async function getValues() {
		//   const data =await FIREDB.ref('users').get();
		//   return data
		// }

		// console.log('values', getValues())
		// function getValues() {
		// 	return Promise.all(
		// 	FIREDB.ref('users/').on('child_added', (snap) => {
		// const users = []
		// users.push(snap.key);
		//     return snap;
		// 	})
		//   )
		// }

		// console.log(getValues());
		// console.log(FIREDB.ref('users').get());

		//     function trying() {
		//       Promise.all(FIREDB.ref('users').get())
		//     }

		// console.log(trying())
		// count++;

		// users.fill(num);
		// const users = Promise.all()
		// console.log('user', snap.key);
		// users.map()
		// const users = [];

		// if(num <=users) {
		//   console.log(users);
		// }

		// console.log('added', snap.key);
		// });

		// if(num <=users) {
		// console.log(Object.values(lala));
		// }
		// const dbRef = ref(getDatabase());
		// const dbRef = FIREDB.ref()
		// const dbRef = FIREDB.ref('users');
		// dbRef
		// 	.then((snapshot) => {
		// 			console.log(snapshot.val());
		// 	})
		// 	.catch((error) => {
		// 		console.error(error);
		// 	});

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
		});
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
		findUserProfile,
		// getOtherUser,
	};
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
