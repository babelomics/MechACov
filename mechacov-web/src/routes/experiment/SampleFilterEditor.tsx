import { Box, Tooltip } from '@material-ui/core';
import React, { useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { IconButton } from '@material-ui/core';

import SampleFilterView from './SampleFilterView';
import SampleFilterEditorDialog from '../../components/sample-filter-editor-dialog/SampleFilterEditorDialog';
import SampleFilter from '../../models/SampleFilter';


interface ComponentProps {
    sampleFilter: SampleFilter;
    setSampleFilter: (newSampleFilter: SampleFilter) => void;
}


function Component(props: ComponentProps) {

    const { sampleFilter, setSampleFilter } = props;
    const [ editorOpen, setEditorOpen ] = useState(false);

    const handleCloseEditor = () => {
        setEditorOpen(false);
    };

    const handleEditorClick = () => {
        setEditorOpen(true);
    };


    return (
        <Box display="flex" flexDirection="row">
            <Box flexGrow={1} border={1}>
                <SampleFilterView sampleFilter={sampleFilter} setSampleFilter={setSampleFilter} />
            </Box>
            <Box flexGrow={0} padding={4}>
                <Tooltip title="Edit filter">
                    <IconButton onClick={handleEditorClick}>
                        <MenuIcon />
                    </IconButton>
                </Tooltip>
            </Box>
            <SampleFilterEditorDialog open={editorOpen} onClose={handleCloseEditor} sampleFilter={sampleFilter} setSampleFilter={setSampleFilter} />
        </Box>

    );
}



export default Component;