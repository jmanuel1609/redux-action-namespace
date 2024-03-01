import { createError, createTypeStr, getActionName, hasAnyValue, isEmptyString } from "../helpers";
import { ACTION_STATES } from "../types";
import ActionNameSpace from "./ActionNameSpace";
class ComplexAction extends ActionNameSpace {
    static defaultProps = {
        handleError: true
    };
    _name = "ComplexAction";
    _sendType;
    _successType;
    _failedType;
    _loadingPath = "";
    _props = {
        handleError: true
    };
    _handleSend = true;
    constructor(loadingPath = "", props = ComplexAction.defaultProps) {
        super();
        this._name = getActionName(this.constructor.name, this._name, `${loadingPath}`);
        if (props) {
            this._props = {
                ...this._props,
                ...props
            };
        }
        this._loadingPath = loadingPath ? loadingPath : this._loadingPath;
        this._sendType = createTypeStr(ACTION_STATES.SEND);
        this._successType = createTypeStr(ACTION_STATES.SUCCESS);
        this._failedType = createTypeStr(ACTION_STATES.FAILED);
    }
    initNameSpace(nameSpace, key = "") {
        super.initNameSpace(nameSpace);
        this._sendType = `${this.nameSpace}:${key}@${this._sendType}`;
        this._successType = `${this.nameSpace}:${key}@${this._successType}`;
        this._failedType = `${this.nameSpace}:${key}@${this._failedType}`;
    }
    sendRdx(state, action) {
        if (!isEmptyString(this._loadingPath) && this._handleSend) {
            const obj = Object.assign({}, state, {
                [this._loadingPath]: ACTION_STATES.SEND
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
        if (!isEmptyString(this._loadingPath)) {
            const obj = Object.assign({}, state, {
                [this._loadingPath]: ACTION_STATES.SUCCESS
            });
            return structuredClone(obj);
        }
        const obj = Object.assign({}, state, { ...action.payload });
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
                [this._loadingPath]: ACTION_STATES.FAILED,
                error: action.payload.error
            });
            return structuredClone(obj);
        }
        return state;
    }
    failed(payload = {}, error = null) {
        const _error = payload && hasAnyValue(payload.error) ? payload.error : error;
        const finalError = !_error.type ? createError(_error) : _error;
        return {
            type: this._failedType,
            payload: {
                ...payload,
                error
            }
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
export default ComplexAction;
