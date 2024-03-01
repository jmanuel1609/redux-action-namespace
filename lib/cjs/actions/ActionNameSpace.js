"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
class ActionNameSpace {
    constructor() {
        this._nameSpace = "";
        this._type = "";
    }
    initNameSpace(nameSpace) {
        let _classSpace = nameSpace;
        if ((0, helpers_1.isEmptyString)(_classSpace)) {
            const date = new Date();
            _classSpace = `NS_${date.getMinutes()}.${date.getSeconds()}.${date.getMilliseconds()}`;
        }
        this.setNameSpace(_classSpace);
    }
    setNameSpace(nameSpace) {
        this._nameSpace = nameSpace;
    }
    getNameSpace() {
        return this._nameSpace;
    }
    get nameSpace() {
        return this._nameSpace;
    }
    set nameSpace(value) {
        this._nameSpace = value;
    }
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
    }
}
exports.default = ActionNameSpace;
