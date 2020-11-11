import React from 'react';
import { Box } from '@material-ui/core';

import SampleList from './SampleList';


function Experiment() {
    return (
        <div>
            <Box padding={4}>
                <Box padding={4}>Lista de muestras (temporalmente aquí)</Box>
            </Box>
            <Box>
                <SampleList searchFilter={{}} />
            </Box>
        </div>
    );
}


export default Experiment;