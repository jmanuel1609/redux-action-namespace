"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReducer = exports.createActionTypes = void 0;
const helpers_1 = require("./helpers");
const ComplexAction_1 = __importDefault(require("./actions/ComplexAction"));
const DefaultAction_1 = __importDefault(require("./actions/DefaultAction"));
function createActionTypes(actions, nameSpace) {
    const handler = {};
    if ((0, helpers_1.isValidObject)(actions)) {
        Object.keys(actions).map((key) => {
            const classInstance = actions[key];
            if (classInstance instanceof ComplexAction_1.default) {
                classInstance.initNameSpace(nameSpace, key);
                handler[classInstance.sendType] = classInstance.sendRdx.bind(classInstance);
                handler[classInstance.successType] = classInstance.successRdx.bind(classInstance);
                handler[classInstance.failedType] = classInstance.failedRdx.bind(classInstance);
            }
            else if (classInstance instanceof DefaultAction_1.default) {
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
exports.createActionTypes = createActionTypes;
function createReducer(initialState, handlers) {
    return function reducer(state = initialState, action) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        }
        else {
            return state;
        }
    };
}
exports.createReducer = createReducer;
