import {FIREDB} from '../../utils/firebase';

const GET_USER_DATA = 'GET_USER_DATA';

const _getUserData = (user) => {
  return {
    type: GET_USER_DATA,
    user,
  };
};

export const getUserData = (uid) => async (dispatch) => {
  try {
    await FIREDB.ref('users/' + uid).once('value', (snap) => {
      const data = snap.val();
      return dispatch(_getUserData(data));
    });
  } catch (error) {
    console.error(error);
  }
};
const initialState = {userData: {}};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER_DATA:
      return {...state, userData: action.user};
    default:
      return state;
  }
}
