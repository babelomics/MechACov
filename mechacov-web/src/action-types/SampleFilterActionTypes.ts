class SampleFilterActionTypes {
    private static readonly PREFIX: string = "sample-filter-actions.";
    
    static readonly RESET: string = SampleFilterActionTypes.PREFIX + "reset";
    static readonly SET: string = SampleFilterActionTypes.PREFIX + "set";

    static readonly RESET_STUDIES: string = SampleFilterActionTypes.PREFIX + "reset-studies";
    static readonly SET_STUDIES: string = SampleFilterActionTypes.PREFIX + "set-studies";
    static readonly ADD_STUDY: string = SampleFilterActionTypes.PREFIX + "add-study";
    static readonly REMOVE_STUDY: string = SampleFilterActionTypes.PREFIX + "remove-study";   

    static readonly RESET_GROUPS: string = SampleFilterActionTypes.PREFIX + "reset-groups";
    static readonly SET_GROUPS: string = SampleFilterActionTypes.PREFIX + "set-groups";
    static readonly ADD_GROUP: string = SampleFilterActionTypes.PREFIX + "add-group";
    static readonly REMOVE_GROUP: string = SampleFilterActionTypes.PREFIX + "remove-group";

    static readonly RESET_STRAINS: string = SampleFilterActionTypes.PREFIX + "reset-strains";
    static readonly SET_STRAINS: string = SampleFilterActionTypes.PREFIX + "set-strains";
    static readonly ADD_STRAIN: string = SampleFilterActionTypes.PREFIX + "add-strain";
    static readonly REMOVE_STRAIN: string = SampleFilterActionTypes.PREFIX + "remove-strain";

    static readonly RESET_TISSUE_CELL_LINES: string = SampleFilterActionTypes.PREFIX + "reset-tissue-cell-lines";
    static readonly SET_TISSUE_CELL_LINES: string = SampleFilterActionTypes.PREFIX + "set-tissue-cell-lines";
    static readonly ADD_TISSUE_CELL_LINE: string = SampleFilterActionTypes.PREFIX + "add-tissue-cell-line";
    static readonly REMOVE_TISSUE_CELL_LINE: string = SampleFilterActionTypes.PREFIX + "remove-tissue-cell-line";

    static readonly RESET_PLATFORMS: string = SampleFilterActionTypes.PREFIX + "reset-platforms";
    static readonly SET_PLATFORMS: string = SampleFilterActionTypes.PREFIX + "set-platforms";
    static readonly ADD_PLATFORM: string = SampleFilterActionTypes.PREFIX + "add-platform";
    static readonly REMOVE_PLATFORM: string = SampleFilterActionTypes.PREFIX + "remove-platform";

    static readonly RESET_PLATFORM_DETAILS: string = SampleFilterActionTypes.PREFIX + "reset-platform-details";
    static readonly SET_PLATFORM_DETAILS: string = SampleFilterActionTypes.PREFIX + "set-platform-details";
    static readonly ADD_PLATFORM_DETAIL: string = SampleFilterActionTypes.PREFIX + "add-platform-detail";
    static readonly REMOVE_PLATFORM_DETAIL: string = SampleFilterActionTypes.PREFIX + "remove-platform-detail";
}


export default SampleFilterActionTypes;