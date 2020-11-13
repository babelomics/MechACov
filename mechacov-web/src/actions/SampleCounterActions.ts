import SampleCounterActionTypes from '../action-types/SampleCounterActionTypes';


class SampleCounterActions {
    static readonly reset = () => ({
        type: SampleCounterActionTypes.RESET,
    });
    static readonly resetControls = () => ({        
        type: SampleCounterActionTypes.RESET_CONTROLS,
    });
    static readonly setControls = (count: number) => ({        
        type: SampleCounterActionTypes.SET_CONTROLS,
        payload: count,
    });
    static readonly resetCases = () => ({        
        type: SampleCounterActionTypes.RESET_CASES,
    });
    static readonly setCases = (count: number) => ({        
        type: SampleCounterActionTypes.SET_CASES,
        payload: count,
    });
    static readonly resetAvailable = () => ({        
        type: SampleCounterActionTypes.RESET_AVAILABLE,
    });
    static readonly setAvailable = (count: number) => ({        
        type: SampleCounterActionTypes.SET_AVAILABLE,
        payload: count,
    });
}


export default SampleCounterActions;