import { Box } from '@material-ui/core';
import React, { useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { IconButton } from '@material-ui/core';

import SampleFilterView from './SampleFilterView';
import SampleFilter from '../../models/SampleFilter';



interface ComponentProps {
    sampleFilter: SampleFilter;
    setSampleFilter: (newSampleFilter: SampleFilter) => void;
}


function Component(props: ComponentProps) {

    const { sampleFilter, setSampleFilter } = props;

    const handleEditorClick = () => {        
    };


    return (
        <Box display="flex" flexDirection="row">
            <Box flexGrow={1} border={1}>
                <SampleFilterView sampleFilter={sampleFilter} setSampleFilter={setSampleFilter} />
            </Box>
            <Box flexGrow={0} padding={4}>
                <IconButton onClick={handleEditorClick}>
                    <MenuIcon />
                </IconButton>                
            </Box>
        </Box>

    );
}



export default Component;