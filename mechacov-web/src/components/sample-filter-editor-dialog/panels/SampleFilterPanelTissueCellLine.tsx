import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from '@material-ui/core';
import React from 'react';
import MechACovClient from '../../../clients/MechacovClient';
import SampleFilter from '../../../models/SampleFilter';



interface ComponentProps {
    sampleFilter: SampleFilter;
    setSampleFilter: (newSampleFilter: SampleFilter) => void;
}


interface ComponentState {
    tissueCellLines: string[];
    loading: boolean;
    error: boolean;

}


class Component extends React.PureComponent<ComponentProps, ComponentState> {

    private abortController = new AbortController();

    state = {
        tissueCellLines: [],
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
        const { tissueCellLines } = this.state;
        const filterTissueCellLines = sampleFilter.tissueCellLines || [];
        return (
            <Box height="100%" display="flex" flexDirection="column">
                <Box flexGrow={1} />
                <Box flexGrow={0} display="flex" flexDirection="row">
                    <Box flexGrow={1} />
                    <Box flexGrow={0}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Select the tissue cell lines of interest:</FormLabel>
                            <FormGroup>
                                {
                                    tissueCellLines.map(tissue => (
                                        <FormControlLabel key={tissue} label={tissue} control={<Checkbox checked={filterTissueCellLines.includes(tissue)} onChange={this.handleChange} name={tissue} />} />
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
            this.setState({ tissueCellLines: [], loading: true, error: false });
            const tissueCellLines = await MechACovClient.get<string[]>("tissueCellLines", undefined, this.abortController.signal);
            this.setState({ loading: false, tissueCellLines: tissueCellLines });
        } catch (error) {
            if ("AbortError" !== error.name) {
                this.setState({ loading: false, error: true });
            }
        }
    }

    private readonly handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { sampleFilter } = this.props;
        const filterTissueCellLines = sampleFilter.tissueCellLines || [];

        const cellLine = event.target.name;
        const checked = !!event.target.checked;
        if (checked && !filterTissueCellLines.includes(cellLine)) {
            const newFilterStudies = [...filterTissueCellLines, cellLine];
            const newFilter = { ...sampleFilter, tissueCellLines: newFilterStudies };
            this.props.setSampleFilter(newFilter);
        } else if (!checked && filterTissueCellLines.includes(cellLine)) {
            const newFilterStudies = filterTissueCellLines.filter(x => cellLine !== x);
            const newFilter = { ...sampleFilter, tissueCellLines: 0 === newFilterStudies.length ? undefined : newFilterStudies };
            this.props.setSampleFilter(newFilter);
        }
    }

}


export default Component;