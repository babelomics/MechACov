import React from 'react';
import { Box, Button, Divider, Tab, Tabs } from '@material-ui/core';

import ExperimentCreator from './ExperimentCreator';
import SelectionView from './SelectionView';
import SampleList from './SampleList';
import SampleListCounter from './SampleListCounter';
import SampleFilterEditor from '../../components/sample-filter-editor/SampleFilterEditor';
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
}


interface ComponentState {
    activeTab: string;
    sampleFilter: SampleFilter;
}


class Component extends React.PureComponent<ComponentProps, ComponentState> {

    state = {
        activeTab: "samples",
        sampleFilter: {} as SampleFilter,
        controlCount: 0,
        caseCount: 0,
    }

    render() {
        const { experiment } = this.props;
        const { activeTab, sampleFilter } = this.state;

        return (
            <div>
                <ExperimentDetails experiment={experiment} />
                <SampleFilterEditor sampleFilter={sampleFilter} setSampleFilter={this.setSampleFilter} />
                <Tabs value={activeTab} onChange={this.handleTabChange}>
                    <Tab value="samples" label="Samples" />
                    <Tab value="controls" label="Controls" />
                    <Tab value="cases" label="Cases" />
                </Tabs>
                <Divider />
                { "samples" === activeTab && <AvailableSamples experimentId={experiment.experimentId} sampleFilter={sampleFilter} />}
                { "controls" === activeTab && <div />}
                { "cases" === activeTab && <div />}
            </div>
        );
    }

    private readonly handleTabChange = (event: React.ChangeEvent<{}>, value: any) => {
        this.setState({ activeTab: value });
    }

    private readonly setSampleFilter = (newSampleFilter: SampleFilter) => {
        this.setState({ sampleFilter: newSampleFilter });
    }

}


export default Component;