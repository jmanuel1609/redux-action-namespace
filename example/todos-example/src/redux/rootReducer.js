import { combineReducers } from "redux";
import {reducer as visibilityFilter} from "./visibilityActionsAndReducer";
import {reducer as todos} from "./todoActionsAndReducers";

export default combineReducers({ todos, visibilityFilter });
