import ActionNameSpace from "./actions/ActionNameSpace";

export enum ACTION_STATES {
    NO_REQUEST="NO_REQUEST",
    SEND = "SEND",
    SUCCESS =  "SUCCESS",
    FAILED = "FAILED"
}


export type ReduxAction = {
    type: string,
    payload:any
}


export type ActionObjectFunction = {[type: string] : Function}
