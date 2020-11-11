interface SampleFilter {
    studyIds: string[] | undefined;
    groups: string[] | undefined;
    strains: string[] | undefined;
    tissueCellTypes: string[] | undefined;
    platforms: string[] | undefined;
    platformDetails: string[] | undefined;
    minHpi: number | undefined;
    maxHpi: number | undefined;
    minMoi: number | undefined;
    maxMoi: number | undefined;
}


export default SampleFilter;