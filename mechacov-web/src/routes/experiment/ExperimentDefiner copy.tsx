import React from 'react';
import { Box, Button } from '@material-ui/core';

import ExperimentCreator from './ExperimentCreator';
import SelectionView from './SelectionView';
import SampleList from './SampleList';
import SampleListCounter from './SampleListCounter';
import SampleFilterEditor from './SampleFilterEditor';
import SampleFilter from '../../models/SampleFilter';
import Sample from '../../models/Sample';
import Experiment from '../../models/Experiment';



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
    sampleFilter: SampleFilter;
    controls: Sample[];
    cases: Sample[];
    controlIds: Set<string>;
    caseIds: Set<string>;
    experiment: Experiment | undefined;
}



class Component extends React.PureComponent<ComponentProps, ComponentState> {

    state = {
        sampleFilter: defaultSampleFilter,
        controls: [],
        cases: [],
        controlIds: new Set<string>(),
        caseIds: new Set<string>(),
        experiment: undefined,
    };

    componentDidMount() {
        this.setState({ sampleFilter: defaultSampleFilter, controls: [], cases: [], controlIds: new Set<string>(), caseIds: new Set<string>(), experiment: undefined });
    }

    render() {
        const { sampleFilter, cases, controls, caseIds, controlIds, experiment } = this.state;
        const valid = 0 < controls.length && 0 < cases.length;
        return (
            <div>
                {
                    !!experiment && <ExperimentCreator experiment={experiment} />
                }
                <Box padding={4} display="flex">
                    <Box flexGrow={1}>
                        <SelectionView controls={controls} cases={cases} />
                    </Box>
                    <Box flexGrow={0}>
                        <Button variant="contained" color="primary" disabled={!valid} onClick={this.handleExperimentRun}>Run experiment!</Button>
                    </Box>
                </Box>
                <Box padding={4}>
                    <SampleFilterEditor sampleFilter={sampleFilter} setSampleFilter={this.setSampleFilter} />
                </Box>
                {/* <Box padding={4}>
                    <SampleListCounter searchFilter={sampleFilter} />
                </Box> */}
                <Box>
                    <SampleList searchFilter={sampleFilter} cases={caseIds} controls={controlIds} toggleControl={this.toggleControl} toggleCase={this.toggleCase} />
                </Box>
            </div>
        );
    }

    private readonly setSampleFilter = (newSampleFilter: SampleFilter) => {
        this.setState({ sampleFilter: newSampleFilter });
    }

    private readonly toggleControl = (sample: Sample) => {
        const { controls, cases, caseIds, controlIds } = this.state;
        if (controlIds.has(sample.id)) {
            const newControls = controls.filter((x: Sample) => sample.id !== x.id);
            const newControlIds = new Set<string>(newControls.map((x: Sample) => x.id));
            this.setState({ controls: newControls, controlIds: newControlIds });
        } else if (caseIds.has(sample.id)) {
            const newCases = cases.filter((x: Sample) => sample.id !== x.id);
            const newControls = [...controls, sample];
            const newControlIds = new Set<string>(newControls.map(x => x.id));
            const newCaseIds = new Set<string>(newCases.map((x: Sample) => x.id));
            this.setState({ controls: newControls, cases: newCases, controlIds: newControlIds, caseIds: newCaseIds });
        } else {
            const newControls = [...controls, sample];
            const newControlIds = new Set<string>(newControls.map(x => x.id));
            this.setState({ controls: newControls, controlIds: newControlIds });
        }
    }

    private readonly toggleCase = (sample: Sample) => {
        const { controls, cases, caseIds, controlIds } = this.state;
        if (caseIds.has(sample.id)) {
            const newCases = cases.filter((x: Sample) => sample.id !== x.id);
            const newCaseIds = new Set<string>(newCases.map((x: Sample) => x.id));
            this.setState({ cases: newCases, caseIds: newCaseIds });
        } else if (controlIds.has(sample.id)) {
            const newControls = controls.filter((x: Sample) => sample.id !== x.id);
            const newCases = [...cases, sample];
            const newControlIds = new Set<string>(newControls.map((x: Sample) => x.id));
            const newCaseIds = new Set<string>(newCases.map(x => x.id));
            this.setState({ controls: newControls, cases: newCases, controlIds: newControlIds, caseIds: newCaseIds });
        } else {
            const newCases = [...cases, sample];
            const newCaseIds = new Set<string>(newCases.map(x => x.id));
            this.setState({ cases: newCases, caseIds: newCaseIds });
        }
    }

    private readonly handleExperimentRun = () => {
        const { sampleFilter, cases, controls, caseIds, controlIds } = this.state;
        const valid = 0 < controls.length && 0 < cases.length;
        if (!valid) {
            return;
        }
        const experiment: Experiment = {
            experimentId: "",
            creationDate: "",
            state: "IN_DEFINITION",
            controls: Array.from(controlIds),
            cases: Array.from(caseIds),
        };
        this.setState({ experiment: experiment });
    }
}


export default Component;