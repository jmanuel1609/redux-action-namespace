"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
const types_1 = require("../types");
const ActionNameSpace_1 = __importDefault(require("./ActionNameSpace"));
class DefaultAction extends ActionNameSpace_1.default {
    constructor(attribute, props = DefaultAction.defaultProps) {
        super();
        this.name = "DefaultAction";
        this.attribute = "";
        this.attribute = attribute;
        if (props) {
            this.props = Object.assign(Object.assign({}, this.props), props);
        }
        this.type = (0, helpers_1.createTypeStr)(types_1.ACTION_STATES.SEND);
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
        if (!(0, helpers_1.isEmptyString)(this.attribute)) {
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
DefaultAction.defaultProps = {
    handleError: true
};
exports.default = DefaultAction;
