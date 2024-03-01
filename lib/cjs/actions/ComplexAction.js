"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
const types_1 = require("../types");
const ActionNameSpace_1 = __importDefault(require("./ActionNameSpace"));
class ComplexAction extends ActionNameSpace_1.default {
    constructor(loadingPath = "", props = ComplexAction.defaultProps) {
        super();
        this._name = "ComplexAction";
        this._loadingPath = "";
        this._props = {
            handleError: true
        };
        this._handleSend = true;
        this._name = (0, helpers_1.getActionName)(this.constructor.name, this._name, `${loadingPath}`);
        if (props) {
            this._props = Object.assign(Object.assign({}, this._props), props);
        }
        this._loadingPath = loadingPath ? loadingPath : this._loadingPath;
        this._sendType = (0, helpers_1.createTypeStr)(types_1.ACTION_STATES.SEND);
        this._successType = (0, helpers_1.createTypeStr)(types_1.ACTION_STATES.SUCCESS);
        this._failedType = (0, helpers_1.createTypeStr)(types_1.ACTION_STATES.FAILED);
    }
    initNameSpace(nameSpace, key = "") {
        super.initNameSpace(nameSpace);
        this._sendType = `${this.nameSpace}:${key}@${this._sendType}`;
        this._successType = `${this.nameSpace}:${key}@${this._successType}`;
        this._failedType = `${this.nameSpace}:${key}@${this._failedType}`;
    }
    sendRdx(state, action) {
        if (!(0, helpers_1.isEmptyString)(this._loadingPath) && this._handleSend) {
            const obj = Object.assign({}, state, {
                [this._loadingPath]: types_1.ACTION_STATES.SEND
            });
            return structuredClone(obj);
        }
        return state;
    }
    send(payload = {}) {
        return {
            type: this._sendType,
            payload
        };
    }
    successRdx(state, action) {
        if (!(0, helpers_1.isEmptyString)(this._loadingPath)) {
            const obj = Object.assign({}, state, {
                [this._loadingPath]: types_1.ACTION_STATES.SUCCESS
            });
            return structuredClone(obj);
        }
        const obj = Object.assign({}, state, Object.assign({}, action.payload));
        return structuredClone(obj);
    }
    success(payload = {}) {
        return {
            type: this._successType,
            payload
        };
    }
    failedRdx(state, action) {
        if (this._props.handleError) {
            const obj = Object.assign({}, state, {
                [this._loadingPath]: types_1.ACTION_STATES.FAILED,
                error: action.payload.error
            });
            return structuredClone(obj);
        }
        return state;
    }
    failed(payload = {}, error = null) {
        const _error = payload && (0, helpers_1.hasAnyValue)(payload.error) ? payload.error : error;
        const finalError = !_error.type ? (0, helpers_1.createError)(_error) : _error;
        return {
            type: this._failedType,
            payload: Object.assign(Object.assign({}, payload), { error })
        };
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get sendType() {
        return this._sendType;
    }
    set sendType(value) {
        this._sendType = value;
    }
    get successType() {
        return this._successType;
    }
    set successType(value) {
        this._successType = value;
    }
    get failedType() {
        return this._failedType;
    }
    set failedType(value) {
        this._failedType = value;
    }
    get loadingPath() {
        return this._loadingPath;
    }
    set loadingPath(value) {
        this._loadingPath = value;
    }
    get props() {
        return this._props;
    }
    set props(value) {
        this._props = value;
    }
    get handleSend() {
        return this._handleSend;
    }
    set handleSend(value) {
        this._handleSend = value;
    }
}
ComplexAction.defaultProps = {
    handleError: true
};
exports.default = ComplexAction;
