import {createError, createTypeStr, getActionName, hasAnyValue, isEmptyString} from "../helpers";
import {ACTION_STATES, ReduxAction} from "../types";
import ActionNameSpace from "./ActionNameSpace";

class ComplexAction extends  ActionNameSpace{
    static defaultProps:any = {
        handleError: true
    }
    private _name:string = "ComplexAction";
    private _sendType:string;
    private _successType:string;
    private _failedType:string;
    private _loadingPath:string = "";
    private _props = {
        handleError: true
    };
    private _handleSend:boolean = true;
    constructor(loadingPath:string= "", props:any = ComplexAction.defaultProps) {
        super();
        this._name = getActionName(this.constructor.name,this._name, `${loadingPath}`);
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

    initNameSpace(nameSpace:string, key:string = ""):void {
        super.initNameSpace(nameSpace);
        this._sendType = `${this.nameSpace}:${key}@${this._sendType}`;
        this._successType = `${this.nameSpace}:${key}@${this._successType}`;
        this._failedType = `${this.nameSpace}:${key}@${this._failedType}`;
    }

    sendRdx(state:any, action:ReduxAction):any {
        if (!isEmptyString(this._loadingPath) && this._handleSend) {
            const obj =  Object.assign({},state, {
                [this._loadingPath]: ACTION_STATES.SEND
            });
            return structuredClone(obj);        }
        return state;
    }
    send(payload:any = {}):ReduxAction {
        return {
            type: this._sendType,
            payload
        };
    }

    successRdx(state:any, action:ReduxAction): any{
        if (!isEmptyString(this._loadingPath)) {
            const obj =  Object.assign({},state, {
                [this._loadingPath]: ACTION_STATES.SUCCESS
            });
            return structuredClone(obj);
        }
        const obj =  Object.assign({}, state, { ...action.payload });
        return structuredClone(obj);
    }
    success(payload:any = {}):ReduxAction {
        return {
            type: this._successType,
            payload
        };
    }

    failedRdx(state:any, action:ReduxAction):any {
        if (this._props.handleError) {
            const obj =  Object.assign({},state, {
                [this._loadingPath]: ACTION_STATES.FAILED,
                error: action.payload.error
            });
            return structuredClone(obj);
        }
        return state;
    }
    failed(payload:any = {}, error:any = null) {
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


    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get sendType(): string {
        return this._sendType;
    }

    set sendType(value: string) {
        this._sendType = value;
    }

    get successType(): string {
        return this._successType;
    }

    set successType(value: string) {
        this._successType = value;
    }

    get failedType(): string {
        return this._failedType;
    }

    set failedType(value: string) {
        this._failedType = value;
    }

    get loadingPath(): string {
        return this._loadingPath;
    }

    set loadingPath(value: string) {
        this._loadingPath = value;
    }

    get props(): { handleError: boolean } {
        return this._props;
    }

    set props(value: { handleError: boolean }) {
        this._props = value;
    }

    get handleSend(): boolean {
        return this._handleSend;
    }

    set handleSend(value: boolean) {
        this._handleSend = value;
    }
}
export default ComplexAction;
