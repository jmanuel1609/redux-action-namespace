import {ACTION_STATES} from "./types";
import {serializeError} from "serialize-error";

export function isValidObject(obj: any): boolean {
    return  hasAnyValue(obj) && Object.keys(obj).length > 0;
}

export function hasAnyValue(obj: any): boolean {
    return !(obj === null || obj === undefined);
}


export function isLoadingState(state: any) {
    return hasAnyValue(state ) && (state === ACTION_STATES.NO_REQUEST || state === ACTION_STATES.SEND);
}
export function getActionName(constructorName: string,
                              defaultName: string= "" ,
                              attribute: string= "" ) {
    const hasConstructorName  = constructorName !== defaultName;
    if(hasConstructorName) {
        return !isEmptyString(attribute) ? `${constructorName}:${attribute}` : `${constructorName}`;
    }
    return !isEmptyString(attribute) ? `${defaultName}:${attribute}` : `${defaultName}`;
}
export function isEmptyString(str:string, noTrim: boolean = false) {
    return !assertString(str, noTrim)
}
function assertString(str:string, noTrim: boolean = false) {
    const assertion = hasAnyValue(str) && str !== "" && typeof str  === "string";
    return noTrim ? assertion && str!=="" : assertion && str.trim() !== "";
}

export function isFunctionInstance(functionToCheck: Function) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

export function createTypeStr( type: string): string {
    return `TYPE_${type}`;
}

export function createError(error:unknown):any {
    return serializeError(error)
}
