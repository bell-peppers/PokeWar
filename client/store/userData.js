import { FIREDB } from '../../utils/firebase';

const GET_USER_DATA = 'GET_USER_DATA';
const GET_OTHER_USER_DATA = 'GET_OTHER_USER_DATA';

const _getUserData = (user) => {
	return {
		type: GET_USER_DATA,
		user,
		myUID: user.uid,
	};
};

const _getOtherUserData = (otherUser) => {
	return {
		type: GET_OTHER_USER_DATA,
		otherUser,
	};
};

export const getUserData = (uid) => async (dispatch) => {
	try {
		await FIREDB.ref('users/' + uid).once('value', (snap) => {
			const data = snap.val();
			// console.log(data)
			return dispatch(_getUserData(data));
		});
	} catch (error) {
		console.error(error);
	}
};

export const getOtherUserData = (uid) => async (dispatch) => {
	try {
		await FIREDB.ref('users/' + uid).once('value', (snap) => {
			const data = snap.val();
			console.log(data);
			return dispatch(_getOtherUserData(data));
		});
	} catch (error) {
		console.error(error);
	}
};

const initialState = { user: {}, myUID: '', otherUser: {} };

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_USER_DATA:
			return { ...state, user: action.user, myUID: action.user.uid };
		case GET_OTHER_USER_DATA:
			return { ...state, otherUser: action.otherUser };
		default:
			return state;
	}
}
