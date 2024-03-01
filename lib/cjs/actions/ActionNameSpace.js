"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
class ActionNameSpace {
    constructor() {
        this.nameSpace = "";
        this.type = "";
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
        this.nameSpace = nameSpace;
    }
    getNameSpace() {
        return this.nameSpace;
    }
}
exports.default = ActionNameSpace;
