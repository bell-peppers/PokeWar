import firebase from 'firebase/app';
import 'firebase/auth';

const app = firebase.initializeApp({
	apiKey: 'AIzaSyB5dZ2LylVePx4NuYPa-P23667sB53i1tk',
	authDomain: 'auth-development-98789.firebaseapp.com',
	databaseURL: "https://auth-development-98789-default-rtdb.firebaseio.com",
	projectId: 'auth-development-98789',
	storageBucket: 'auth-development-98789.appspot.com',
	messagingSenderId: '893691728780',
	appId: '1:893691728780:web:6986bc04e6cd82ba023ca9',
});

export const auth = app.auth()
export default app
