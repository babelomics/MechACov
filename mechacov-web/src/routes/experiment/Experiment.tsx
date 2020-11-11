import React, { useState } from 'react';
import { Box } from '@material-ui/core';

import SampleList from './SampleList';
import SampleFilterEditor from './SampleFilterEditor';
import SampleFilter from '../../models/SampleFilter';


const defaultSampleFilter: SampleFilter = {
    studyIds: undefined,
    groups: undefined,
    strains: undefined,
    tissueCellTypes: undefined,
    platforms: undefined,
    platformDetails: undefined,
    minHpi: undefined,
    maxHpi: undefined,
    minMoi: undefined,
    maxMoi: undefined,
};


function Experiment() {

    const [sampleFilter, setSampleFilter] = useState(defaultSampleFilter);


    return (
        <div>
            <Box padding={4}>
                <SampleFilterEditor sampleFilter={sampleFilter} setSampleFilter={setSampleFilter} />
            </Box>
            <Box padding={4}>
                <SampleList searchFilter={sampleFilter} />
            </Box>
        </div>
    );
}


export default Experiment;