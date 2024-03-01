import { createTypeStr, isEmptyString } from "../helpers";
import { ACTION_STATES } from "../types";
import ActionNameSpace from "./ActionNameSpace";
class DefaultAction extends ActionNameSpace {
    static defaultProps = {
        handleError: true
    };
    name = "DefaultAction";
    attribute = "";
    props;
    constructor(attribute, props = DefaultAction.defaultProps) {
        super();
        this.attribute = attribute;
        if (props) {
            this.props = {
                ...this.props,
                ...props
            };
        }
        this.type = createTypeStr(ACTION_STATES.SEND);
    }
    initNameSpace(nameSpace, key = "") {
        super.initNameSpace(nameSpace);
        this.type = `${this.nameSpace}:${key}@${this.type}`;
    }
    call(payload) {
        return {
            type: this.type,
            payload
        };
    }
    /*
    * callRdx function must be overwritten
    * */
    callRdx(state, action) {
        if (!isEmptyString(this.attribute)) {
            const obj = Object.assign({}, state, {
                [this.attribute]: action.payload
            });
            return structuredClone(obj);
        }
        else {
            return state;
        }
    }
}
export default DefaultAction;
