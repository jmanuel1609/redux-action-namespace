import {isValidObject} from "./helpers";
import StateAction from "./actions/StateAction";
import DefaultAction from "./actions/DefaultAction";
import {ActionObjectFunction, ReduxAction} from "./types";

export function createActionTypes(actions: any, nameSpace:string):ActionObjectFunction {
    const handler: any = {};

    if (isValidObject(actions)) {
        Object.keys(actions).map((key:string) => {
            const classInstance = actions[key];
            if (classInstance instanceof StateAction) {
                classInstance.initNameSpace(nameSpace,key);
                handler[classInstance.sendType] = classInstance.sendRdx.bind(
                    classInstance
                );
                handler[classInstance.successType] = classInstance.successRdx.bind(
                    classInstance
                );
                handler[classInstance.failedType] = classInstance.failedRdx.bind(
                    classInstance
                );
            } else if (classInstance instanceof DefaultAction) {
                classInstance.initNameSpace(nameSpace, key);
                handler[classInstance.type] = classInstance.callRdx.bind(classInstance);
            } else {
                handler[key] = actions[key];
            }
        });
    }
    return handler;
}

export function createReducer(initialState: any, handlers:ActionObjectFunction) {
    return function reducer(state = initialState, action: ReduxAction) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        } else {
            return state;
        }
    };
}

