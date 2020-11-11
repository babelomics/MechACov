import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Tab, Tabs, Tooltip } from '@material-ui/core';
import SampleFilter from '../../models/SampleFilter';




interface ComponentProps {
    open: boolean;
    sampleFilter: SampleFilter;
    setSampleFilter: (newSampleFilter: SampleFilter) => void;
    onClose: () => void;
}


function Component(props: ComponentProps) {

    const { open, sampleFilter, setSampleFilter, onClose } = props;

    const [activeTab, setActiveTab] = useState("study");

    const handleActiveTabChange = (event: React.ChangeEvent<{}>, value: any) => {
        setActiveTab(value);
    };

    const handleAccept = () => {
        onClose();
    };

    return (
        <Dialog onClose={onClose} aria-labelled="simple-dialog-title" open={open} maxWidth="xl" fullWidth>
            <DialogTitle id="simple-dialog-title">Sample Filter</DialogTitle>
            <DialogContent dividers style={{ padding: 0 }}>
                <Box minHeight="60vh" display="flex" flexDirection="row">
                    <Box flexGrow={0}>
                        <Tabs orientation="vertical" variant="scrollable" value={activeTab} onChange={handleActiveTabChange}>
                            <Tab label="Studies" id="study" />
                            <Tab label="Group" id="group" />
                            <Tab label="Strain" id="strain" />
                            <Tab label="Tissue cell type" id="tissue-cell-type" />
                            <Tab label="Platform" id="platform" />
                            <Tab label="HPI" id="hpi" />
                            <Tab label="MOI" id="moi" />
                        </Tabs>
                    </Box>
                    <Box flexGrow={0}>
                        <Divider orientation="vertical" color="primary" />
                    </Box>
                    <Box flexGrow={1}>
                        
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" color="primary" onClick={handleAccept}>Accept</Button>
            </DialogActions>
        </Dialog>
    );
}



export default Component;