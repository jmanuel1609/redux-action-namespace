import {
    ACTION_STATES,
    ActionObjectFunction,
    ComplexAction,
    createActionTypes,
    createReducer,
    DefaultAction, ReduxAction
} from "../index";

test("test createActionTypes" , () => {
    class UpdateUser extends ComplexAction {

    }
   const actions:any = {
       SET_ID: new DefaultAction("id"),
       UPDATE_USER: new ComplexAction()
   } ;

    const NAME_SPACE: string = "TEST_ACTIONS";
    const handlers:ActionObjectFunction = createActionTypes(actions, NAME_SPACE);
    expect(Object.keys(handlers).length).toBe(4);

    const allHasSameNameSpace: string[] = Object.keys(handlers).filter(k => k.startsWith(NAME_SPACE));
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
    class UpdateUser extends ComplexAction {
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
        UPDATE_USER: new UpdateUser("loading")
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
});
