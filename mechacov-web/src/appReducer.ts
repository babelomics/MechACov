import { combineReducers } from 'redux';

import experimentReducer from './reducers/experimentReducer';
import sampleFilterReducer from './reducers/sampleFilterReducer';
import sampleCounterReducer from './reducers/sampleCounterReducer';


const reducer = combineReducers({ 
    experiment: experimentReducer,
    sampleFilter: sampleFilterReducer,
    sampleCounts: sampleCounterReducer,
});


export default reducer;