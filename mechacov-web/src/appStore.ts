import { applyMiddleware, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import appReducer from './appReducer';


const defaultState = appReducer(undefined, { type: "no-action" });


const store = createStore(appReducer, defaultState, applyMiddleware(thunk, logger));


export default store;