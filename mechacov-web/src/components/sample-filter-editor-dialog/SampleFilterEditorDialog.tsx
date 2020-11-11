import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Tab, Tabs, Tooltip } from '@material-ui/core';
import SampleFilter from '../../models/SampleFilter';
import SampleFilterPanelStudy from './panels/SampleFilterPanelStudy';
import { triggerAsyncId } from 'async_hooks';


interface ComponentProps {
    open: boolean;
    sampleFilter: SampleFilter;
    setSampleFilter: (newSampleFilter: SampleFilter) => void;
    onClose: () => void;
}


interface ComponentState {
    sampleFilter: SampleFilter;
    activeTab: string;
}


class Component extends React.PureComponent<ComponentProps, ComponentState> {

    constructor(props: ComponentProps) {
        super(props);

        this.state = {
            sampleFilter: props.sampleFilter,
            activeTab: "study"
        };
    }

    componentDidMount() {
        this.setState({ sampleFilter: this.props.sampleFilter });
    }

    componentDidUpdate(prevProps: ComponentProps) {
        const filterUpdated = this.props.sampleFilter !== prevProps.sampleFilter || (this.props.open !== prevProps.open && !!this.props.open);
        if (filterUpdated && this.state.sampleFilter !== this.props.sampleFilter) {
            this.setState({ sampleFilter: this.props.sampleFilter });
        }
    }

    render() {
        const { open, onClose } = this.props;
        const { sampleFilter, activeTab } = this.state;

        return (
            <Dialog onClose={onClose} aria-labelled="simple-dialog-title" open={open} maxWidth="xl" fullWidth>
                <DialogTitle id="simple-dialog-title">Sample Filter</DialogTitle>
                <DialogContent dividers style={{ padding: 0 }}>
                    <Box minHeight="60vh" display="flex" flexDirection="row">
                        <Box flexGrow={0}>
                            <Tabs orientation="vertical" variant="scrollable" value={activeTab} onChange={this.handleActiveTabChange}>
                                <Tab label="Studies" value="study" />
                                <Tab label="Group" value="group" />
                                <Tab label="Strain" value="strain" />
                                <Tab label="Tissue cell type" value="tissue-cell-type" />
                                <Tab label="Platform" value="platform" />
                                <Tab label="HPI" value="hpi" />
                                <Tab label="MOI" value="moi" />
                            </Tabs>
                        </Box>
                        <Box flexGrow={0}>
                            <Divider orientation="vertical" color="primary" />
                        </Box>
                        <Box flexGrow={1}>
                            {"study" === activeTab && <SampleFilterPanelStudy sampleFilter={sampleFilter} setSampleFilter={this.setSampleFilter} />}
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button variant="contained" color="primary" onClick={this.handleAccept}>Accept</Button>
                </DialogActions>
            </Dialog>
        );
    }

    private readonly handleAccept = () => {
        if (this.state.sampleFilter !== this.props.sampleFilter) {
            this.props.setSampleFilter(this.state.sampleFilter);
        }
        this.props.onClose();
    }

    private readonly handleActiveTabChange = (event: React.ChangeEvent<{}>, value: any) => {
        this.setState({ activeTab: value });
    };

    private readonly setSampleFilter = (newSampleFilter: SampleFilter) => {
        this.setState({ sampleFilter: newSampleFilter });
    }
}


export default Component;