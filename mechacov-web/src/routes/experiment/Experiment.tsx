import React from 'react';
import { Box } from '@material-ui/core';

import SampleList from './SampleList';
import SampleListCounter from './SampleListCounter';
import SampleFilterEditor from './SampleFilterEditor';
import SampleFilter from '../../models/SampleFilter';
import Sample from '../../models/Sample';



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

}


interface ComponentState {
    sampleFilter: SampleFilter;
    controls: Sample[];
    cases: Sample[];
    controlIds: Set<string>;
    caseIds: Set<string>;
}



class Component extends React.PureComponent<ComponentProps, ComponentState> {

    state = {
        sampleFilter: defaultSampleFilter,
        controls: [],
        cases: [],
        controlIds: new Set<string>(),
        caseIds: new Set<string>(),
    };

    componentDidMount() {
        this.setState({ sampleFilter: defaultSampleFilter, controls: [], cases: [], controlIds: new Set<string>(), caseIds: new Set<string>() });
    }

    render() {
        const { sampleFilter, caseIds, controlIds } = this.state;
        return (
            <div>
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
}


export default Component;