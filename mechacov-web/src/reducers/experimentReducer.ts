import ExperimentActionTypes from '../action-types/ExperimentActionTypes';
import Experiment from '../models/Experiment';


const defaultState = null;


function reducer(state: Experiment | null = defaultState, action: any) {
    switch (!!action && action.type) {
        case ExperimentActionTypes.RESET:
            return defaultState;
        case ExperimentActionTypes.SET:
            return action.payload as Experiment;
        default:
            return state;
    }
}


export default reducer;