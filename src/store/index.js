/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'; // eslint-disable-line
import rootReducer from '../reducers';

const initialState = {};
const middlewares = [thunk];
let enhancers = [];

/**
 *
 * @description configures the redux store with
 * middlewares and enhancers for different environments
 *
 * @function configureStore
 *
 * @returns {object}
 */
const configureStore = () => {
  if (process.env.NODE_ENV === 'development') {
    middlewares.push(reduxImmutableStateInvariant());
    enhancers = window.__REDUX_DEVTOOLS_EXTENSION__
      && window.__REDUX_DEVTOOLS_EXTENSION__();
  }

  const createStoreWithMiddleware = applyMiddleware(
    ...middlewares
  )(createStore);
  return createStoreWithMiddleware(rootReducer, initialState, enhancers);
};

export default configureStore();
