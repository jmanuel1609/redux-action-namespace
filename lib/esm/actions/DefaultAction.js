import { createTypeStr, getActionName, isEmptyString } from "../helpers";
import { ACTION_STATES } from "../types";
import ActionNameSpace from "./ActionNameSpace";
class DefaultAction extends ActionNameSpace {
    static defaultProps = {
        handleError: true
    };
    _name = "DefaultAction";
    _attribute = "";
    _props;
    constructor(attribute = "", props = DefaultAction.defaultProps) {
        super();
        this.name = getActionName(this.constructor.name, this.name, attribute);
        this._attribute = attribute;
        if (props) {
            this._props = {
                ...this._props,
                ...props
            };
        }
        this.type = createTypeStr(ACTION_STATES.SEND);
    }
    initNameSpace(nameSpace, key = "") {
        super.initNameSpace(nameSpace);
        this.type = `${this.nameSpace}:${key}@${this.type}`;
    }
    call(payload = {}) {
        return {
            type: this.type,
            payload
        };
    }
    /*
    * callRdx function must be overwritten
    * */
    callRdx(state, action) {
        if (!isEmptyString(this._attribute)) {
            const obj = Object.assign({}, state, {
                [this._attribute]: action.payload
            });
            return structuredClone(obj);
        }
        else {
            return state;
        }
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get attribute() {
        return this._attribute;
    }
    set attribute(value) {
        this._attribute = value;
    }
    get props() {
        return this._props;
    }
    set props(value) {
        this._props = value;
    }
}
export default DefaultAction;
