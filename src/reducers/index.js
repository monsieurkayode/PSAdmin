import { combineReducers } from 'redux';
import courseReducer from './courseReducer';
import authorReducer from './authorReducer';

const rootReducer = combineReducers({
  allCourses: courseReducer,
  allAuthors: authorReducer
});

export default rootReducer;
