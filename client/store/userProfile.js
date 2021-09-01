import axios from 'axios';

const GET_ALL_CARDS = 'GET_ALL_CARDS';

export const _getTheCards = (cards) => {
	return {
		type: GET_ALL_CARDS,
		cards,
	};
};

export const getTheCards = (user) => async (dispatch) => {
	try {
		const cardsObj = await axios.get(
			`https://poke-war-4483c-default-rtdb.firebaseio.com/Trainers/${user}/cards/.json`
		);
		return dispatch(_getTheCards(cardsObj));
	} catch (error) {
		console.error(error);
	}
};

const inState = {
	playerCards: {},
};

export default function (state = inState, action) {
  if(action == undefined){
    return state
  }
	switch (action.type) {
		case GET_ALL_CARDS:
			return {
				...state,
				playerCards: { ...state.playerCards, ...action.cards },
			};
		default:
			return state;
	}
}
