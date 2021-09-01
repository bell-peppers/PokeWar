import React, { useContext, useState, useEffect } from 'react';
import firebase, { auth, FIREDB } from '../../utils/firebase';


const AuthContext = React.createContext();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const githubProvider = new firebase.auth.GithubAuthProvider();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);

	//when we call signup, auth.onAuthStateChanged is gonna be called for us
	async function signup(email, password, username) {
		const user = await auth.createUserWithEmailAndPassword(email, password);
		createNewAccount(user.user.uid, user.user.email, username);
		return user;
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
		});
		return targetUser;
	}
	function createNewAccount(uid, email, name) {
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
		return user;
	}

	function logout() {
		window.location.href = '/login';
		return auth.signOut();
	}

	function updateImg(user, photoURL) {
		FIREDB.ref('users/' + user.uid).set({
			uid: user.uid,
			email: user.email,
			username: user.username,
			photoURL,
			wins: user.wins,
			totalGames: user.totalGames,
			coins: user.coins,
			friends: user.friends,
		});
	}

	function googleLogin() {
		auth.signInWithPopup(googleProvider).then((result) => {
			const token = result.credential.accessToken;
			const user = result.user;
			FIREDB.ref(`users`)
				.child(user.uid)
				.get()
				.then((snapshot) => {
					if (snapshot.exists()) {
						window.location.href = '/';
					} else {
						createNewAccount(
							user.uid,
							user.email,
							user.email.replace(/[\[\].#@]/g, ' ').split(' ')[0]
						);
						window.location.href = '/';
						return user;
					}
				})
				.catch((error) => {
					console.error(error);
				});
		});
	}

	function githubLogin() {
		// const auth = getAuth();
		auth.signInWithPopup(githubProvider).then((result) => {
			const token = result.credential.accessToken;
			const user = result.user;
			FIREDB.ref(`users`)
				.child(user.uid)
				.get()
				.then((snapshot) => {
					if (snapshot.exists()) {
						window.location.href = '/';
					} else {
						user.displayName
							? createNewAccount(
									user.uid,
									'',
									user.displayName.replace(/[\[\].#@]/g, ' ').split(' ')[0]
							  )
							: createNewAccount(
									user.uid,
									'',
									[
										'Pickachu',
										'Mew',
										'Snorlax',
										'Charmander',
										'Bulbasaur',
										'Sylveon',
										'Gengar',
										'Chikorita',
										'Ekans',
									][Math.floor(Math.random() * 9)] //0-8
							  );

						window.location.href = '/';
						return user;
					}
				})
				.catch((error) => {
					console.error(error);
				});
		});
	}

	function leaderboardScores() {
		const usersRef = FIREDB.ref('users');
		const allUsers = [];
		usersRef.on('value', (snapshot) => {
			const users = snapshot.val();
			// let position = 0;
			function createData(username, score) {
				// position += 1;
				return { username, score };
			}
			for (let user in users) {
				allUsers.push(createData(users[user].username, users[user].coins));
				// allUsers.push([user, users[user].coins]);
			}
			allUsers.sort((a, b) => b.score - a.score).map((user, idx) => {user.position = idx+1; return user});

		});

			return allUsers;
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
		logout,
		findUserProfile,
		updateImg,
		googleLogin,
		githubLogin,
		leaderboardScores,
		// getOtherUser,
	};
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
