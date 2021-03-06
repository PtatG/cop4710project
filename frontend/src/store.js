import {createStore} from 'redux';

const initState = {
	user: null
}

function reducer(state = initState, action) {
	switch(action.type) {
		case "LOAD_USER":
			return {
				...state, 
				user: action.user
			}
		case "LOGOUT":
			return {
				...state,
				user: undefined
			}
		default: 
			return state;
	}
}

export default createStore(reducer, {});