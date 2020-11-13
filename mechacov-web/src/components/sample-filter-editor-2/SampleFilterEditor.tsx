import React from 'react';

import FilterEditorStudies from './editors/FilterEditorStudies';
import FilterEditorGroups from './editors/FilterEditorGroups';
import FilterEditorHpi from './editors/FilterEditorHpi';
import FilterEditorMoi from './editors/FilterEditorMoi';
import FilterEditorStrains from './editors/FilterEditorStrains';
import FilterEditorTissueCellLines from './editors/FilterEditorTissueCellLines';
import FilterEditorPlatforms from './editors/FilterEditorPlatforms';
import FilterEditorPlatformDetails from './editors/FilterEditorPlatformDetails';
import { Paper } from '@material-ui/core';




    // <Tab label="Studies" value="study" />
    // <Tab label="Group" value="group" />
    // Tab label="Strain" value="strain" />
    // Tab label="Tissue cell type" value="tissue-cell-line" />
    // Tab label="Platform" value="platform" />
    // Tab label="HPI" value="hpi" />
    // Tab label="MOI" value="moi" />



    function Component() {
        return (
            <Paper>
                <FilterEditorStudies />
                <FilterEditorGroups />
                <FilterEditorHpi />
                <FilterEditorMoi />
                <FilterEditorStrains />
                <FilterEditorTissueCellLines />
                <FilterEditorPlatforms />
                <FilterEditorPlatformDetails />
            </Paper>
        );
    }



export default Component;