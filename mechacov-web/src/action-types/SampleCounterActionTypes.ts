class SampleCounterActionTypes {
    private static readonly PREFIX: string = "sample-counter-actions.";
    
    static readonly RESET: string = SampleCounterActionTypes.PREFIX + "reset";

    static readonly RESET_CONTROLS: string = SampleCounterActionTypes.PREFIX + "reset-controls";
    static readonly SET_CONTROLS: string = SampleCounterActionTypes.PREFIX + "set-controls";

    static readonly RESET_CASES: string = SampleCounterActionTypes.PREFIX + "reset-cases";
    static readonly SET_CASES: string = SampleCounterActionTypes.PREFIX + "set-cases";

    static readonly RESET_AVAILABLE: string = SampleCounterActionTypes.PREFIX + "reset-available";
    static readonly SET_AVAILABLE: string = SampleCounterActionTypes.PREFIX + "set-available";
}


export default SampleCounterActionTypes;