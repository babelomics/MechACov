import SampleCounterActionTypes from '../action-types/SampleCounterActionTypes';


interface SampleCounterState {
    controlCount: number | undefined;
    caseCount: number | undefined;
    availableCount: number | undefined;
}


const defaultState = {
    controlCount: undefined,
    caseCount: undefined,
    availableCount: undefined,
};


function reducer(state: SampleCounterState = defaultState, action: any) {
    switch (!!action && action.type) {
        case SampleCounterActionTypes.RESET:
            return defaultState;
        case SampleCounterActionTypes.RESET_CONTROLS:
            return { ...state, controlCount: undefined };
        case SampleCounterActionTypes.SET_CONTROLS:
            return { ...state, controlCount: action.payload as number };
        case SampleCounterActionTypes.RESET_CASES:
            return { ...state, caseCount: undefined };
        case SampleCounterActionTypes.SET_CASES:
            return { ...state, caseCount: action.payload as number };
            case SampleCounterActionTypes.RESET_AVAILABLE:
            return { ...state, availableCount: undefined };
        case SampleCounterActionTypes.SET_AVAILABLE:
            return { ...state, availableCount: action.payload as number };
        default:
            return state;
    }
}


export default reducer;