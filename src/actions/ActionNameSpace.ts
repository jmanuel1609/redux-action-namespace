import {isEmptyString} from "../helpers";

abstract class ActionNameSpace {
    private _nameSpace: string = "";
    private _type:string = "";

    initNameSpace(nameSpace: string): void {
        let _classSpace: string = nameSpace;
        if(isEmptyString(_classSpace)) {
            const date = new Date();
            _classSpace = `NS_${date.getMinutes()}.${date.getSeconds()}.${date.getMilliseconds()}`;
        }
        this.setNameSpace(_classSpace);
    }
    setNameSpace(nameSpace: string) {
        this._nameSpace = nameSpace;
    }
    getNameSpace(): string {
        return this._nameSpace;
    }


    get nameSpace(): string {
        return this._nameSpace;
    }

    set nameSpace(value: string) {
        this._nameSpace = value;
    }

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
    }
}


export default ActionNameSpace;
