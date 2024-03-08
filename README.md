This is a javascript library for creating easy redux actions with less code. Based in class and inheritance 

## Getting Started

Installation 

```bash
npm install redux-action-namespace
# or
yarn add redux-action-namespace
```
## Content
-  [Basic usage](#basic-usage)
-  [Default Action](#default-action)
-  [State Action](#state-action)
-  [API](#api)

## Basic usage
You can create the redux and the actions in the same class.

````javascript
import { DefaultAction, createActionTypes, createReducer } from 'redux-action-namespace'

// declare intial state
const initialState = {
	count: 0
};

// declare action classes
class INCREMENT_COUNT extends DefaultAction {
	callRdx(state, action) {
		const count = state.count++;
		return {
			...state,
			count
		}
	}
}

class DECREMENT_COUNT extends DefaultAction {
	//redefine callRDX method
	callRdx(state, action) {
		const count = state.count--;
		return {
			...state,
			count
		}
	}
}
const actions = {
	INCREMENT_COUNT : new INCREMENT_COUNT(),
	DECREMENT_COUNT: new DECREMENT_COUNT()
}
// create actions, namespace is required
const handlers = createActionTypes(actions, "COUNT_NS");

//export the reducer and add to the reducer state.
export const countReducer = createReducer(initialState, handlers);

export default actions;

// use the actions

state.dispatch(actions.INCREMENT_COUNT.call());
console.log(state.countReducer.count) // expect be 1

state.dispatch(actions.DECREMENT_COUNT.call());
console.log(state.countReducer.count) // expect be 0
````




### Default Action
Default Action do not required custom implementation. Don't need to even  describe the callRdx

````javascript
import { DefaultAction, createActionTypes, createReducer } from 'redux-action-namespace'

// declare intial state
const initialState = {
	id: null,  
        user:{ address:null }
};

// declare action classes
const actions = {
	SET_ID : new DefaultAction("id"),
	SET_CITY_NAME: new DefaultAction("address.city.name")
}
// create actions, namespace is required
const handlers = createActionTypes(actions, "USER_NS");

//export the reducer and add to the reducer state.
export const userReducer = createReducer(initialState, handlers);

export default actions;

// use the actions

state.dispatch(actions.SET_ID.call(1));
console.log(state.userReducer.id) // expect be 1

state.dispatch(actions.SET_CITY_NAME.callRdx("Miami"));
console.log(state.userReducer.address.city.name) // Miami
````


## State Action

State Action when you need 3 step actions. (SEND, SUCCESS, FAILED)

````javascript
import { StateAction, ACTION_STATES, createActionTypes, createReducer } from 'redux-action-namespace'

// declare intial state
const initialState = {
	updateState: null,  
        user:{ address:null }
};

// declare action classes
const actions = {
	UPDATE_USER : new UPDATE_USER("loading")
}
// create actions, namespace is required
const handlers = createActionTypes(actions, "USER_NS");

//export the reducer and add to the reducer state.
export const userReducer = createReducer(initialState, handlers);

export default actions;

// use the actions

state.dispatch(actions.UPDATE_USER.send());
console.log(state.userReducer.updateState) // expect be ACTION_STATES.SEND

const user = {
	id:1
}
state.dispatch(actions.UPDATE_USER.success(user)); 
console.log(state.userReducer.user.id) // expect be 1
console.log(state.userReducer.updateState) // expect be SUCCESS

// you can failed
const error = new Error("message")
state.dispatch(actions.UPDATE_USER.failed(null, error));
console.log(state.userReducer.updateState) // expect be FAILED
console.log(state.userReducer.error.message) // expect be message
````

## API
###  createActionTypes  Function

#### Description
The  createActionTypes  function is used to generate action types based on the provided actions and namespace.

#### Parameters
-  actions: An object containing the actions for which types need to be generated.
-  nameSpace: String namespace to be used in creating action types.

#### Returns
-  ActionObjectFunction : An object containing the generated action types.

#### Example
````javascript
import { createActionTypes } from 'redux-action-namespace';

// Define actions and namespace
const actions = {
    action1: new StateAction(),
    action2: new DefaultAction()
};
const nameSpace = 'exampleNamespace';
// Generate action types
const actionTypes = createActionTypes(actions, nameSpace);
````

#### Usage
1. Provide the actions and namespace to the  createActionTypes  function.
2. Receive the object containing the generated action types based on the input actions and namespace.





###  `createReducer`  Function

#### Description
The  `createReducer`  function is used to create a Redux reducer based on the provided initial state and a mapping of action types to corresponding reducer functions.

#### Parameters
-  `initialState`: The initial state of the reducer.
-  `actionHandlers` : An object mapping action types to corresponding reducer functions.

#### Returns
-  `reducer`  (function): A Redux reducer function that handles state updates based on the dispatched actions.

#### Example
````javascript
import { createReducer, createActionTypes } from 'redux-action-namespace';

// Define initial state
const initialState = {
    count: 0,
    loading: false
};


// Define actions and namespace
const actions = {
	action1: new StateAction(),
	action2: new DefaultAction()
};
const nameSpace = 'exampleNamespace';
// Generate action types
const actionTypes = createActionTypes(actions, nameSpace);

// Create the reducer
const reducer = createReducer(initialState, actionHandlers);

````
#### Usage
1. Provide the initial state and action handlers to the  `createReducer`  function.
2. Receive a Redux reducer function that handles state updates based on the dispatched actions.

This function simplifies the process of creating Redux reducers by allowing you to define action handlers in a clear and concise manner.


## LINKS
Check the TODO example [here](https://github.com/jmanuel1609/redux-action-namespace/tree/main/example/todos-example)

Unit test cases [here](https://github.com/jmanuel1609/redux-action-namespace/blob/main/src/__tests__/actionReducers.test.ts) 


### Notes
For modifications create a Pull Request.
