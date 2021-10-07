import React, {useContext, useState, useEffect} from 'react';
import firebase, {auth, FIREDB} from '../../utils/firebase';
import randomStarterPk from '../../utils/starterPokemon';

const AuthContext = React.createContext();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const githubProvider = new firebase.auth.GithubAuthProvider();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({children}) {
  const [currentUser, setCurrentUser] = useState(null);

  //when we call signup, auth.onAuthStateChanged is gonna be called for us

  async function signup(email, password, username) {
    return new Promise((resolve, reject) => {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          resolve(user);
          createNewAccount(user.user.uid, user.user.email, username);
        })
        .catch((reason) => reject(reason));
    });
  }

  async function guestSignIn() {
    return new Promise((resolve, reject) => {
      auth
        .signInAnonymously()
        .then((user) => {
          resolve(user);
          createNewAccount(user.user.uid, 'guest', 'guest');
        })
        .catch((reason) => reject(reason));
    });
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
      pokemon: randomStarterPk(),
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
    return new Promise((resolve, reject) => {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
          resolve(user);
        })
        .catch((reason) => reject(reason));
    });
  }

  function logout() {
    //window.location.href = '/';
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

  async function googleLogin() {
    return new Promise((resolve, reject) => {
      auth
        .signInWithPopup(googleProvider)
        .then((result) => {
          resolve(result);
          const token = result.credential.accessToken;
          const user = result.user;
          FIREDB.ref(`users`)
            .child(user.uid)
            .get()
            .then((snapshot) => {
              if (snapshot.exists()) {
                // window.location.href = '/match';
              } else {
                createNewAccount(
                  user.uid,
                  user.email,
                  user.email.replace(/[\[\].#@]/g, ' ').split(' ')[0]
                );
                // window.location.href = '/';
                return user;
              }
            });
        })
        .catch((reason) => reject(reason));
    });
  }

  async function githubLogin() {
    // const auth = getAuth();
    return new Promise((resolve, reject) => {
      auth
        .signInWithPopup(githubProvider)
        .then((result) => {
          resolve(result);
          const token = result.credential.accessToken;
          const user = result.user;
          FIREDB.ref(`users`)
            .child(user.uid)
            .get()
            .then((snapshot) => {
              if (snapshot.exists()) {
                //window.location.href = '/match';
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
                        'Pikachu',
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

                //window.location.href = '/match';
                return user;
              }
            });
        })
        .catch((reason) => reject(reason));
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
        return {username, score};
      }
      for (let user in users) {
        allUsers.push(createData(users[user].username, users[user].coins));
        // allUsers.push([user, users[user].coins]);
      }
      allUsers
        .sort((a, b) => b.score - a.score)
        .map((user, idx) => {
          user.position = idx + 1;
          return user;
        });
    });

    return allUsers;
  }

  useEffect(() => {
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
    guestSignIn,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
