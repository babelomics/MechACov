import ExperimentActionTypes from '../action-types/ExperimentActionTypes';
import Experiment from '../models/Experiment';


class ExperimentActions {
    static readonly clear = () => ({
        type: ExperimentActionTypes.RESET,
    });
    static readonly set = (experiment: Experiment) => ({
        type: ExperimentActionTypes.SET,
        payload: experiment,
    })
}


export default ExperimentActions;