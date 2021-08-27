import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage'

const firebaseConfig = {
	apiKey: 'AIzaSyB80iZmlITjBudgVNbGS2c32Qx0plWzCx4',
	authDomain: 'poke-war-4483c.firebaseapp.com',
	databaseURL: 'https://poke-war-4483c-default-rtdb.firebaseio.com',
	projectId: 'poke-war-4483c',
	storageBucket: 'poke-war-4483c.appspot.com',
	messagingSenderId: '778563832507',
	appId: '1:778563832507:web:3f8e516620552a3d26379e',
	measurementId: 'G-C8HJQB7V6C',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

export const FIREDB = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();

export default firebase;
