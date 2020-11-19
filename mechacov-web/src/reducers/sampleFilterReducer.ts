import SampleFilterActionTypes from '../action-types/SampleFilterActionTypes';
import SampleFilter from '../models/SampleFilter';


const defaultState = {} as SampleFilter;


function resetStudies(sampleFilter: SampleFilter) {
    if (undefined === sampleFilter.studyIds) {
        return sampleFilter;
    } else {
        const { studyIds, ...newSampleFilter } = sampleFilter;
        return newSampleFilter as SampleFilter;
    }
}


function addStudy(sampleFilter: SampleFilter, value: string) {
    const filterValues = sampleFilter.studyIds || [];
    if (!filterValues.includes(value)) {
        return { ...sampleFilter, studyIds: [...filterValues, value] } as SampleFilter;
    } else {
        return sampleFilter;
    }
}


function removeStudy(sampleFilter: SampleFilter, value: string) {
    const filterValues = sampleFilter.studyIds || [];
    if (filterValues.includes(value)) {
        const newValues = filterValues.filter(x => value !== x);
        return 0 === newValues.length ? resetStudies(sampleFilter) : { ...sampleFilter, studyIds: newValues } as SampleFilter;
    } else {
        return sampleFilter;
    }
}


function resetGroups(sampleFilter: SampleFilter) {
    if (undefined === sampleFilter.groups) {
        return sampleFilter;
    } else {
        const { groups, ...newSampleFilter } = sampleFilter;
        return newSampleFilter as SampleFilter;
    }
}


function addGroup(sampleFilter: SampleFilter, value: string) {
    const filterValues = sampleFilter.groups || [];
    if (!filterValues.includes(value)) {
        return { ...sampleFilter, groups: [...filterValues, value] } as SampleFilter;
    } else {
        return sampleFilter;
    }
}


function removeGroup(sampleFilter: SampleFilter, value: string) {
    const filterValues = sampleFilter.groups || [];
    if (filterValues.includes(value)) {
        const newValues = filterValues.filter(x => value !== x);
        return 0 === newValues.length ? resetGroups(sampleFilter) : { ...sampleFilter, groups: newValues } as SampleFilter;
    } else {
        return sampleFilter;
    }
}


function resetTissueCellLines(sampleFilter: SampleFilter) {
    if (undefined === sampleFilter.tissueCellLines) {
        return sampleFilter;
    } else {
        const { tissueCellLines, ...newSampleFilter } = sampleFilter;
        return newSampleFilter as SampleFilter;
    }
}


function addTissueCellLine(sampleFilter: SampleFilter, value: string) {
    const filterValues = sampleFilter.tissueCellLines || [];
    if (!filterValues.includes(value)) {
        return { ...sampleFilter, tissueCellLines: [...filterValues, value] } as SampleFilter;
    } else {
        return sampleFilter;
    }
}


function removeTissueCellLine(sampleFilter: SampleFilter, value: string) {
    const filterValues = sampleFilter.tissueCellLines || [];
    if (filterValues.includes(value)) {
        const newValues = filterValues.filter(x => value !== x);
        return 0 === newValues.length ? resetTissueCellLines(sampleFilter) : { ...sampleFilter, tissueCellLines: newValues } as SampleFilter;
    } else {
        return sampleFilter;
    }
}


function resetStrains(sampleFilter: SampleFilter) {
    if (undefined === sampleFilter.strains) {
        return sampleFilter;
    } else {
        const { strains, ...newSampleFilter } = sampleFilter;
        return newSampleFilter as SampleFilter;
    }
}


function addStrain(sampleFilter: SampleFilter, value: string) {
    const filterValues = sampleFilter.strains || [];
    if (!filterValues.includes(value)) {
        return { ...sampleFilter, strains: [...filterValues, value] } as SampleFilter;
    } else {
        return sampleFilter;
    }
}


function removeStrain(sampleFilter: SampleFilter, value: string) {
    const filterValues = sampleFilter.strains || [];
    if (filterValues.includes(value)) {
        const newValues = filterValues.filter(x => value !== x);
        return 0 === newValues.length ? resetStrains(sampleFilter) : { ...sampleFilter, strains: newValues } as SampleFilter;
    } else {
        return sampleFilter;
    }
}


function resetPlatforms(sampleFilter: SampleFilter) {
    if (undefined === sampleFilter.platforms) {
        return sampleFilter;
    } else {
        const { platforms, ...newSampleFilter } = sampleFilter;
        return newSampleFilter as SampleFilter;
    }
}


function addPlatform(sampleFilter: SampleFilter, value: string) {
    const filterValues = sampleFilter.platforms || [];
    if (!filterValues.includes(value)) {
        return { ...sampleFilter, platforms: [...filterValues, value] } as SampleFilter;
    } else {
        return sampleFilter;
    }
}


function removePlatform(sampleFilter: SampleFilter, value: string) {
    const filterValues = sampleFilter.platforms || [];
    if (filterValues.includes(value)) {
        const newValues = filterValues.filter(x => value !== x);
        return 0 === newValues.length ? resetPlatforms(sampleFilter) : { ...sampleFilter, platforms: newValues } as SampleFilter;
    } else {
        return sampleFilter;
    }
}


function reducer(state: SampleFilter = defaultState, action: any) {
    switch (!!action && action.type) {
        case SampleFilterActionTypes.RESET:
            return defaultState;
        case SampleFilterActionTypes.SET:
            return action.payload as SampleFilter;

        case SampleFilterActionTypes.RESET_STUDIES:
            return resetStudies(state);
        case SampleFilterActionTypes.SET_STUDIES:
            return { ...state, studyIds: action.payload as string[] } as SampleFilter;
        case SampleFilterActionTypes.ADD_STUDY:
            return addStudy(state, action.payload as string);
        case SampleFilterActionTypes.REMOVE_STUDY:
            return removeStudy(state, action.payload as string);

        case SampleFilterActionTypes.RESET_GROUPS:
            return resetGroups(state);
        case SampleFilterActionTypes.SET_GROUPS:
            return { ...state, groups: action.payload as string[] } as SampleFilter;
        case SampleFilterActionTypes.ADD_GROUP:
            return addGroup(state, action.payload as string);
        case SampleFilterActionTypes.REMOVE_GROUP:
            return removeGroup(state, action.payload as string);

        case SampleFilterActionTypes.RESET_TISSUE_CELL_LINES:
            return resetTissueCellLines(state);
        case SampleFilterActionTypes.SET_TISSUE_CELL_LINES:
            return { ...state, tissueCellLines: action.payload as string[] } as SampleFilter;
        case SampleFilterActionTypes.ADD_TISSUE_CELL_LINE:
            return addTissueCellLine(state, action.payload as string);
        case SampleFilterActionTypes.REMOVE_TISSUE_CELL_LINE:
            return removeTissueCellLine(state, action.payload as string);

        case SampleFilterActionTypes.RESET_STRAINS:
            return resetStrains(state);
        case SampleFilterActionTypes.SET_STRAINS:
            return { ...state, strains: action.payload as string[] } as SampleFilter;
        case SampleFilterActionTypes.ADD_STRAIN:
            return addStrain(state, action.payload as string);
        case SampleFilterActionTypes.REMOVE_STRAIN:
            return removeStrain(state, action.payload as string);

        case SampleFilterActionTypes.RESET_PLATFORMS:
            return resetPlatforms(state);
        case SampleFilterActionTypes.SET_PLATFORMS:
            return { ...state, platforms: action.payload as string[] } as SampleFilter;
        case SampleFilterActionTypes.ADD_PLATFORM:
            return addPlatform(state, action.payload as string);
        case SampleFilterActionTypes.REMOVE_PLATFORM:
            return removePlatform(state, action.payload as string);

        default:
            return state;
    }
}


export default reducer;