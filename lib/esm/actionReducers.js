import { isValidObject } from "./helpers";
import ComplexAction from "./actions/ComplexAction";
import DefaultAction from "./actions/DefaultAction";
export function createActionTypes(actions, nameSpace) {
    const handler = {};
    if (isValidObject(actions)) {
        Object.keys(actions).map((key) => {
            const classInstance = actions[key];
            if (classInstance instanceof ComplexAction) {
                classInstance.initNameSpace(nameSpace, key);
                handler[classInstance.sendType] = classInstance.sendRdx.bind(classInstance);
                handler[classInstance.successType] = classInstance.successRdx.bind(classInstance);
                handler[classInstance.failedType] = classInstance.failedRdx.bind(classInstance);
            }
            else if (classInstance instanceof DefaultAction) {
                classInstance.initNameSpace(nameSpace, key);
                handler[classInstance.type] = classInstance.callRdx.bind(classInstance);
            }
            else {
                handler[key] = actions[key];
            }
        });
    }
    return handler;
}
export function createReducer(initialState, handlers) {
    return function reducer(state = initialState, action) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        }
        else {
            return state;
        }
    };
}
