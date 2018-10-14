import { combineReducers } from 'redux';
import courseReducer from './courseReducer';

const rootReducer = combineReducers({
  allCourses: courseReducer
});

export default rootReducer;
