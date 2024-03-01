import { DefaultAction, createActionTypes, createReducer } from 'redux-action-namespace'


const initialState = {
	allIds: [],
	byIds: {}
};

export class ADD_TODO extends DefaultAction {
	callRdx(state, action) {
		const content = action.payload;
		const id = state.allIds.length + 1;
		return {
			...state,
			allIds:[...state.allIds, id],
			byIds: {
				...state.byIds,
				[id]: {
					content,
					completed: false
				}
			}
		}
	}
}

export class TOGGLE_TODO extends DefaultAction {
	callRdx(state, action) {
		const id = action.payload;
		const completed = !state.byIds[id].completed
		return {
			...state,
			byIds: {
				...state.byIds,
				[id]: {
					...state.byIds[id],
					completed
				}
			}
		};
	}
}

const actions = {
	ADD_TODO : new ADD_TODO(),
	TOGGLE_TODO: new TOGGLE_TODO()
}

const handlers = createActionTypes(actions, "TODOS_NS");
export const reducer = createReducer(initialState, handlers);

export default actions;
