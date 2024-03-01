import  {configureStore} from '@reduxjs/toolkit'
import { reducer as todos } from './todoActionsAndReducers'
import { reducer as visibilityFilter } from './visibilityActionsAndReducer'
export default configureStore({
	reducer:{ todos, visibilityFilter },
	devTools:true
});
