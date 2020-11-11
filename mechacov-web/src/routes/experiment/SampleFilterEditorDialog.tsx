import React, { useState } from 'react';
import { Box, Dialog, DialogTitle, Tooltip } from '@material-ui/core';
import SampleFilter from '../../models/SampleFilter';




interface ComponentProps {
    open: boolean;
    sampleFilter: SampleFilter;
    setSampleFilter: (newSampleFilter: SampleFilter) => void;
    onClose: () => void;
}


function Component(props: ComponentProps) {

    const { open, sampleFilter, setSampleFilter, onClose } = props;

    return (
        <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Sample Filter</DialogTitle>
        </Dialog>
    );
}



export default Component;