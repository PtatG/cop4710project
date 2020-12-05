import {createStore} from 'redux';

const initState = {
	text: ""
}

function reducer(state = initState, action) {
	switch(action.type) {
		case "TEST":
			return {
				...state, 
				text: action.text
			}
		default: 
			return state;
	}
}

export default createStore(reducer, {});