import { ACTION_STATES } from "./types";
import { serializeError } from "serialize-error";
export function isValidObject(obj) {
    return !(hasAnyValue(obj) || Object.keys(obj).length === 0);
}
export function hasAnyValue(obj) {
    return !(obj === null || obj === undefined);
}
export function isLoadingState(state) {
    return hasAnyValue(state) && (state === ACTION_STATES.NO_REQUEST || state === ACTION_STATES.SEND);
}
export function getActionName(constructorName, defaultConstructorName, defaultName, attribute) {
    const hasConstructorName = constructorName === defaultConstructorName;
    if (defaultName) {
        return defaultName;
    }
    else {
        if (hasConstructorName) {
            return `${constructorName}:${attribute}`;
        }
        else {
            return `${constructorName}`;
        }
    }
}
export function isEmptyString(str, noTrim = false) {
    return !assertString(str, noTrim);
}
function assertString(str, noTrim = false) {
    const assertion = hasAnyValue(str) && str !== "" && typeof str === "string";
    return noTrim ? assertion && str !== "" : assertion && str.trim() !== "";
}
export function isFunctionInstance(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}
export function createTypeStr(type) {
    return `TYPE_${type}`;
}
export function createError(error) {
    return serializeError(error);
}
