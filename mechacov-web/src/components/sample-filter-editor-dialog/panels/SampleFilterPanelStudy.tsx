import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from '@material-ui/core';
import React from 'react';
import MechACovClient from '../../../clients/MechacovClient';
import SampleFilter from '../../../models/SampleFilter';



interface ComponentProps {
    sampleFilter: SampleFilter;
    setSampleFilter: (newSampleFilter: SampleFilter) => void;
}


interface ComponentState {
    studies: string[];
    loading: boolean;
    error: boolean;

}


class Component extends React.PureComponent<ComponentProps, ComponentState> {

    private abortController = new AbortController();

    state = {
        studies: [],
        loading: false,
        error: false
    };

    componentDidMount() {
        this.fetchSampleStudies();
    }

    render() {
        const { loading, error } = this.state;
        if (!!error) {
            return this.renderError();
        } else if (!!loading) {
            return this.renderLoading();
        } else {
            return this.renderSuccess();
        }
    }

    private readonly renderSuccess = () => {
        const { sampleFilter } = this.props;
        const { studies } = this.state;
        const filterStudies = sampleFilter.studyIds || [];
        return (
            <Box height="100%" display="flex" flexDirection="column">
                <Box flexGrow={1} />
                <Box flexGrow={0} display="flex" flexDirection="row">
                    <Box flexGrow={1} />
                    <Box flexGrow={0}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Select the studies:</FormLabel>
                            <FormGroup>
                                {
                                    studies.map(study => (                                        
                                        <FormControlLabel key={study} label={study} control={<Checkbox checked={filterStudies.includes(study)} onChange={this.handleChange} name={study} />} />
                                    ))
                                }
                            </FormGroup>
                        </FormControl>
                    </Box>
                    <Box flexGrow={1} />
                </Box>
                <Box flexGrow={1} />
            </Box>
        );
    }

    private readonly renderError = () => {
        // TODO
        return (<></>);
    }

    private readonly renderLoading = () => {
        // TODO
        return (<></>);
    }

    private readonly fetchSampleStudies = async () => {
        try {
            this.abortController = new AbortController();
            this.setState({ studies: [], loading: true, error: false });
            const studies = await MechACovClient.get<string[]>("studies", undefined, this.abortController.signal);
            this.setState({ loading: false, studies: studies });
        } catch (error) {
            if ("AbortError" !== error.name) {
                this.setState({ loading: false, error: true });
            }
        }
    }

    private readonly handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { sampleFilter } = this.props;
        const filterStudies = sampleFilter.studyIds || [];

        const studyId = event.target.name;
        const checked = !!event.target.checked;        
        if (checked && !filterStudies.includes(studyId)) {
            const newFilterStudies = [...filterStudies, studyId];
            const newFilter = { ...sampleFilter, studyIds: newFilterStudies };
            this.props.setSampleFilter(newFilter);
        } else if (!checked && filterStudies.includes(studyId)) {
            const newFilterStudies = filterStudies.filter(x => studyId !== x);
            const newFilter = { ...sampleFilter, studyIds: 0 === newFilterStudies.length ? undefined : newFilterStudies };
            this.props.setSampleFilter(newFilter);
        }
    }

}


export default Component;