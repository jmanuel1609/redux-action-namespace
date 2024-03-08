import {createTypeStr, getActionName, isEmptyString} from "../helpers";
import {ACTION_STATES, ReduxAction} from "../types";
import ActionNameSpace from "./ActionNameSpace";
import update from "lodash.update";
// TypeScript code for DefaultAction class which extends ActionNameSpace and provides default properties and methods for actions

class DefaultAction extends ActionNameSpace {
    static defaultProps = {
        handleError: true
    }
    private _name: string = "DefaultAction";
    private _attribute: string = "";
    private _props: any;

    constructor(attribute: string = "", props: any = DefaultAction.defaultProps) {
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

    initNameSpace(nameSpace: string, key: string = ""): void {
        super.initNameSpace(nameSpace);
        this.type = `${this.nameSpace}:${key}@${this.type}`;
    }

    call(payload: any = {}): ReduxAction {
        return {
            type: this.type,
            payload
        };
    }

    callRdx(state: any, action: ReduxAction) {
        if (!isEmptyString(this._attribute)) {
            const obj = update(state, this._attribute, function () {
                return action.payload;
            });
            return structuredClone(obj);
        } else {
            return state;
        }
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get attribute(): string {
        return this._attribute;
    }

    set attribute(value: string) {
        this._attribute = value;
    }

    get props(): any {
        return this._props;
    }

    set props(value: any) {
        this._props = value;
    }
}

export default DefaultAction;
