"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
const types_1 = require("../types");
const ActionNameSpace_1 = __importDefault(require("./ActionNameSpace"));
class ComplexAction extends ActionNameSpace_1.default {
    constructor(loadingPath, props = ComplexAction.defaultProps) {
        super();
        this.name = "ComplexAction";
        this.loadingPath = "";
        this.props = {
            handleError: true
        };
        this.handleSend = true;
        this.name = (0, helpers_1.getActionName)(this.constructor.name, "ComplexAction", this.name, `${loadingPath}`);
        if (props) {
            this.props = Object.assign(Object.assign({}, this.props), props);
        }
        this.loadingPath = loadingPath ? loadingPath : this.loadingPath;
        this.sendType = (0, helpers_1.createTypeStr)(types_1.ACTION_STATES.SEND);
        this.successType = (0, helpers_1.createTypeStr)(types_1.ACTION_STATES.SUCCESS);
        this.failedType = (0, helpers_1.createTypeStr)(types_1.ACTION_STATES.FAILED);
    }
    initNameSpace(nameSpace, key = "") {
        super.initNameSpace(nameSpace);
        this.sendType = `${this.nameSpace}:${key}@${this.sendType}`;
        this.successType = `${this.nameSpace}:${key}@${this.successType}`;
        this.failedType = `${this.nameSpace}:${key}@${this.failedType}`;
    }
    sendRdx(state, action) {
        if (!(0, helpers_1.isEmptyString)(this.loadingPath) && this.handleSend) {
            const obj = Object.assign({}, state, {
                [this.loadingPath]: types_1.ACTION_STATES.SEND
            });
            return structuredClone(obj);
        }
        return state;
    }
    send(payload) {
        return {
            type: this.sendType,
            payload
        };
    }
    successRdx(state, action) {
        if (!(0, helpers_1.isEmptyString)(this.loadingPath)) {
            const obj = Object.assign({}, state, {
                [this.loadingPath]: types_1.ACTION_STATES.SUCCESS
            });
            return structuredClone(obj);
        }
        const obj = Object.assign({}, state, Object.assign({}, action.payload));
        return structuredClone(obj);
    }
    success(payload) {
        return {
            type: this.successType,
            payload
        };
    }
    failedRdx(state, action) {
        if (this.props.handleError) {
            const obj = Object.assign({}, state, {
                [this.loadingPath]: types_1.ACTION_STATES.FAILED,
                error: action.payload.error
            });
            return structuredClone(obj);
        }
        return state;
    }
    failed(payload, error) {
        const finalError = !error.type ? (0, helpers_1.createError)(error) : error;
        return {
            type: this.failedType,
            payload: Object.assign(Object.assign({}, payload), { error })
        };
    }
}
ComplexAction.defaultProps = {
    handleError: true
};
exports.default = ComplexAction;
