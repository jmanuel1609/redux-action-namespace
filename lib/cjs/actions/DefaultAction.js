"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
const types_1 = require("../types");
const ActionNameSpace_1 = __importDefault(require("./ActionNameSpace"));
class DefaultAction extends ActionNameSpace_1.default {
    constructor(attribute = "", props = DefaultAction.defaultProps) {
        super();
        this._name = "DefaultAction";
        this._attribute = "";
        this.name = (0, helpers_1.getActionName)(this.constructor.name, this.name, attribute);
        this._attribute = attribute;
        if (props) {
            this._props = Object.assign(Object.assign({}, this._props), props);
        }
        this.type = (0, helpers_1.createTypeStr)(types_1.ACTION_STATES.SEND);
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
        if (!(0, helpers_1.isEmptyString)(this._attribute)) {
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
DefaultAction.defaultProps = {
    handleError: true
};
exports.default = DefaultAction;
