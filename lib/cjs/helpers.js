"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createError = exports.createTypeStr = exports.isFunctionInstance = exports.isEmptyString = exports.getActionName = exports.isLoadingState = exports.hasAnyValue = exports.isValidObject = void 0;
const types_1 = require("./types");
const serialize_error_1 = require("serialize-error");
function isValidObject(obj) {
    return !(hasAnyValue(obj) || Object.keys(obj).length === 0);
}
exports.isValidObject = isValidObject;
function hasAnyValue(obj) {
    return !(obj === null || obj === undefined);
}
exports.hasAnyValue = hasAnyValue;
function isLoadingState(state) {
    return hasAnyValue(state) && (state === types_1.ACTION_STATES.NO_REQUEST || state === types_1.ACTION_STATES.SEND);
}
exports.isLoadingState = isLoadingState;
function getActionName(constructorName, defaultConstructorName, defaultName, attribute) {
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
exports.getActionName = getActionName;
function isEmptyString(str, noTrim = false) {
    return !assertString(str, noTrim);
}
exports.isEmptyString = isEmptyString;
function assertString(str, noTrim = false) {
    const assertion = hasAnyValue(str) && str !== "" && typeof str === "string";
    return noTrim ? assertion && str !== "" : assertion && str.trim() !== "";
}
function isFunctionInstance(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}
exports.isFunctionInstance = isFunctionInstance;
function createTypeStr(type) {
    return `TYPE_${type}`;
}
exports.createTypeStr = createTypeStr;
function createError(error) {
    return (0, serialize_error_1.serializeError)(error);
}
exports.createError = createError;
