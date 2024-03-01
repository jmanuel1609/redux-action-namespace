import { isEmptyString } from "../helpers";
class ActionNameSpace {
    nameSpace = "";
    type = "";
    initNameSpace(nameSpace) {
        let _classSpace = nameSpace;
        if (isEmptyString(_classSpace)) {
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
export default ActionNameSpace;
