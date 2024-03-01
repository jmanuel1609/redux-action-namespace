import { DefaultAction, createActionTypes, createReducer } from 'redux-action-namespace'
import { VISIBILITY_FILTERS } from '../constants'



const initialState = {
	mode:VISIBILITY_FILTERS.ALL
};
export class SET_FILTER extends DefaultAction {
	callRdx(state, action) {
		return Object.assign({}, state, {
			mode:action.payload
		})
	}
}


export const actions = {
	SET_FILTER : new SET_FILTER()
}

const handlers = createActionTypes(actions, "VISIBILITY_NS");
export const reducer = createReducer(initialState, handlers);

export default actions;
