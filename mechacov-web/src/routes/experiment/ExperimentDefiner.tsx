import React from 'react';
import { connect } from 'react-redux';
import { Box, Button, Divider, Grid, Tab, Tabs } from '@material-ui/core';

import ExperimentCreator from './ExperimentCreator';
import SelectionView from './SelectionView';
import SampleList from './SampleList';
import SampleListCounter from './SampleListCounter';
import SampleFilterEditor from '../../components/sample-filter-editor-2/SampleFilterEditor';
import SampleFilter from '../../models/SampleFilter';
import Sample from '../../models/Sample';
import Experiment from '../../models/Experiment';

import ExperimentDetails from './ExperimentDetails';
import AvailableSamples from './AvailableSamples';



const defaultSampleFilter: SampleFilter = {
    studyIds: undefined,
    groups: undefined,
    strains: undefined,
    tissueCellLines: undefined,
    platforms: undefined,
    platformDetails: undefined,
    minHpi: undefined,
    maxHpi: undefined,
    minMoi: undefined,
    maxMoi: undefined,
};


interface ComponentProps {
    experiment: Experiment;
    availableSampleCount: number;
}


interface ComponentState {
    activeTab: string;
}


class Component extends React.PureComponent<ComponentProps, ComponentState> {

    state = {
        activeTab: "samples",
    };

    render() {
        const { experiment, availableSampleCount } = this.props;
        const { activeTab } = this.state;

        const availableSampleLabel = `Available Samples (${availableSampleCount})`;

        return (
            <div>
                {/* <ExperimentDetails experiment={experiment} /> */}
                <Box margin={4}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Box width="100%" display="flex">
                                <Box flexGrow={1} />
                                <Box flexGrow={0}>
                                    <Button disabled variant="contained" color="primary">Run experiment!</Button>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Box margin={2}>
                                <SampleFilterEditor />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <Box margin={2}>

                                <Tabs value={activeTab} onChange={this.handleTabChange}>
                                    <Tab value="samples" label={availableSampleLabel} />
                                    <Tab value="controls" label="Controls" />
                                    <Tab value="cases" label="Cases" />
                                </Tabs>
                                <Divider />
                                {"samples" === activeTab && <AvailableSamples />}
                                {"controls" === activeTab && <div />}
                                {"cases" === activeTab && <div />}
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        );
    }

    private readonly handleTabChange = (event: React.ChangeEvent<{}>, value: any) => {
        this.setState({ activeTab: value });
    }
}


const mapStateToProps = (state: any) => ({
    experiment: state.experiment as Experiment,
    availableSampleCount: (state.sampleCounts.availableCount | 0) as number,
});


export default connect(mapStateToProps)(Component);