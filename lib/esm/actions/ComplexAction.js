import { createError, createTypeStr, getActionName, isEmptyString } from "../helpers";
import { ACTION_STATES } from "../types";
import ActionNameSpace from "./ActionNameSpace";
class ComplexAction extends ActionNameSpace {
    static defaultProps = {
        handleError: true
    };
    name = "ComplexAction";
    sendType;
    successType;
    failedType;
    loadingPath = "";
    props = {
        handleError: true
    };
    handleSend = true;
    constructor(loadingPath, props = ComplexAction.defaultProps) {
        super();
        this.name = getActionName(this.constructor.name, "ComplexAction", this.name, `${loadingPath}`);
        if (props) {
            this.props = {
                ...this.props,
                ...props
            };
        }
        this.loadingPath = loadingPath ? loadingPath : this.loadingPath;
        this.sendType = createTypeStr(ACTION_STATES.SEND);
        this.successType = createTypeStr(ACTION_STATES.SUCCESS);
        this.failedType = createTypeStr(ACTION_STATES.FAILED);
    }
    initNameSpace(nameSpace, key = "") {
        super.initNameSpace(nameSpace);
        this.sendType = `${this.nameSpace}:${key}@${this.sendType}`;
        this.successType = `${this.nameSpace}:${key}@${this.successType}`;
        this.failedType = `${this.nameSpace}:${key}@${this.failedType}`;
    }
    sendRdx(state, action) {
        if (!isEmptyString(this.loadingPath) && this.handleSend) {
            const obj = Object.assign({}, state, {
                [this.loadingPath]: ACTION_STATES.SEND
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
        if (!isEmptyString(this.loadingPath)) {
            const obj = Object.assign({}, state, {
                [this.loadingPath]: ACTION_STATES.SUCCESS
            });
            return structuredClone(obj);
        }
        const obj = Object.assign({}, state, { ...action.payload });
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
                [this.loadingPath]: ACTION_STATES.FAILED,
                error: action.payload.error
            });
            return structuredClone(obj);
        }
        return state;
    }
    failed(payload, error) {
        const finalError = !error.type ? createError(error) : error;
        return {
            type: this.failedType,
            payload: {
                ...payload,
                error
            }
        };
    }
}
export default ComplexAction;
