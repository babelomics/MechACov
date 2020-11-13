import SampleFilterActionTypes from '../action-types/SampleFilterActionTypes';
import SampleFilter from '../models/SampleFilter';


class SampleFilterActions {
    static readonly clear = () => ({
        type: SampleFilterActionTypes.RESET,
    });
    static readonly set = (sampleFilter: SampleFilter) => ({
        type: SampleFilterActionTypes.SET,
        payload: sampleFilter,
    });

    static readonly resetStudies = () => ({
        type: SampleFilterActionTypes.RESET_STUDIES,
    });
    static readonly setStudies = (studies: string[]) => ({
        type: SampleFilterActionTypes.SET_STUDIES,
        payload: studies,
    });
    static readonly addStudy = (study: string) => ({
        type: SampleFilterActionTypes.ADD_STUDY,
        payload: study,
    });
    static readonly removeStudy = (study: string) => ({
        type: SampleFilterActionTypes.REMOVE_STUDY,
        payload: study,
    });

    static readonly resetGroups = () => ({
        type: SampleFilterActionTypes.RESET_GROUPS,
    });
    static readonly setGroups = (groups: string[]) => ({
        type: SampleFilterActionTypes.SET_GROUPS,
        payload: groups,
    });
    static readonly addGroup = (group: string) => ({
        type: SampleFilterActionTypes.ADD_GROUP,
        payload: group,
    });
    static readonly removeGroup = (group: string) => ({
        type: SampleFilterActionTypes.REMOVE_GROUP,
        payload: group,
    });

    static readonly resetStrains = () => ({
        type: SampleFilterActionTypes.RESET_STRAINS,
    });
    static readonly setStrains = (strains: string[]) => ({
        type: SampleFilterActionTypes.SET_STRAINS,
        payload: strains,
    });
    static readonly addStrain = (strain: string) => ({
        type: SampleFilterActionTypes.ADD_STRAIN,
        payload: strain,
    });
    static readonly removeStrain = (strain: string) => ({
        type: SampleFilterActionTypes.REMOVE_STRAIN,
        payload: strain,
    });

    static readonly resetTissueCellLines = () => ({
        type: SampleFilterActionTypes.RESET_TISSUE_CELL_LINES,
    });
    static readonly setTissueCellLines = (tissueCellLines: string[]) => ({
        type: SampleFilterActionTypes.SET_TISSUE_CELL_LINES,
        payload: tissueCellLines,
    });
    static readonly addTissueCellLine = (tissueCellLine: string) => ({
        type: SampleFilterActionTypes.ADD_TISSUE_CELL_LINE,
        payload: tissueCellLine,
    });
    static readonly removeTissueCellLine = (tissueCellLine: string) => ({
        type: SampleFilterActionTypes.REMOVE_TISSUE_CELL_LINE,
        payload: tissueCellLine,
    });

    static readonly resetPlatforms = () => ({
        type: SampleFilterActionTypes.RESET_PLATFORMS,
    });
    static readonly setPlatforms = (platforms: string[]) => ({
        type: SampleFilterActionTypes.SET_PLATFORMS,
        payload: platforms,
    });
    static readonly addPlatform = (platform: string) => ({
        type: SampleFilterActionTypes.ADD_PLATFORM,
        payload: platform,
    });
    static readonly removePlatform = (platform: string) => ({
        type: SampleFilterActionTypes.REMOVE_PLATFORM,
        payload: platform,
    });

    static readonly resetPlatformDetails = () => ({
        type: SampleFilterActionTypes.RESET_PLATFORM_DETAILS,
    });
    static readonly setPlatformDetails = (platformDetails: string[]) => ({
        type: SampleFilterActionTypes.SET_PLATFORM_DETAILS,
        payload: platformDetails,
    });
    static readonly addPlatformDetail = (platformDetail: string) => ({
        type: SampleFilterActionTypes.ADD_PLATFORM_DETAIL,
        payload: platformDetail,
    });
    static readonly removePlatformDetail = (platformDetail: string) => ({
        type: SampleFilterActionTypes.REMOVE_PLATFORM_DETAIL,
        payload: platformDetail,
    });

}


export default SampleFilterActions;