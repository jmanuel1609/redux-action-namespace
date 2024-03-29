import DefaultAction from "../actions/DefaultAction";
import StateAction from "../actions/StateAction";
import {ACTION_STATES, ActionObjectFunction, ReduxAction} from "../types";
import {createActionTypes, createReducer} from "../actionReducers";


test("test createActionTypes" , () => {
    class UpdateUser extends StateAction {

    }
   const actions:any = {
       SET_ID: new DefaultAction("id"),
       UPDATE_USER: new UpdateUser()
    } ;

    const NAME_SPACE: string = "TEST_ACTIONS";
    const handlers:ActionObjectFunction = createActionTypes(actions, NAME_SPACE);
    expect(Object.keys(handlers).length).toBe(4);

    const allHasSameNameSpace: string[] = Object.keys(handlers).filter(k => k.startsWith(NAME_SPACE));
    expect(allHasSameNameSpace.length).toBe(4);
    expect(Object.keys(handlers)[0]).toBe(`${NAME_SPACE}:SET_ID@TYPE_SEND`);

});
test("test createReducer" , () => {

    const initialState = {
        id: 0,
        user:{
          name:""
        },
        loading:ACTION_STATES.NO_REQUEST
    }
    class UpdateUser extends StateAction {
        successRdx(state: any, action:ReduxAction): any {
            return Object.assign({}, state, {
                loading:ACTION_STATES.SUCCESS,
                user:action.payload
            });
        }
        failedRdx(state:any, action:ReduxAction) : any {
            return Object.assign({}, state, {
                loading:ACTION_STATES.FAILED,
                error:action.payload.error
            });
        }
    }
    const actions:any = {
        SET_ID: new DefaultAction("id"),
        UPDATE_USER: new UpdateUser("loading"),
        SET_ADDRESS: new DefaultAction("user.addresses[0].city.name")
    } ;


    const NAME_SPACE: string = "TEST_ACTIONS";
    const handlers:ActionObjectFunction = createActionTypes(actions, NAME_SPACE);
    const reducer = createReducer(initialState, handlers);

    let newState = reducer(initialState,  actions.SET_ID.call(1));
    expect(newState.id).toBe(1);


    newState = reducer(newState,  actions.UPDATE_USER.send());
    expect(newState.loading).toBe(ACTION_STATES.SEND);

    newState = reducer(newState,  actions.UPDATE_USER.success({name:"Joe Doe"}));
    expect(newState.loading).toBe(ACTION_STATES.SUCCESS);
    expect(newState.user.name).toBe("Joe Doe");


    newState = reducer(initialState,  actions.UPDATE_USER.failed(null, new Error("my message")));
    expect(newState.loading).toBe(ACTION_STATES.FAILED);
    expect(newState.user.name).toBe("");
    expect(newState.error.message).toBe("my message");

    newState = reducer(initialState,  actions.SET_ADDRESS.call("Miami"));
    expect(newState.user.addresses[0].city.name).toBe("Miami");

});
