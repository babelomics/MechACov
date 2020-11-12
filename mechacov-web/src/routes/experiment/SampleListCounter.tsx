
import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';


import MechACovClient from '../../clients/MechacovClient';
import SampleFilter from '../../models/SampleFilter';
import AbortController from "abort-controller"


interface ComponentProps {
    searchFilter: SampleFilter;
}

interface ComponentState {
    count: number;
    loading: boolean;
    error: boolean;
}


class Component extends React.PureComponent<ComponentProps, ComponentState> {

    private abortController = new AbortController();

    state = {
        count: -1,
        loading: false,
        error: false
    };


    componentDidMount() {
        this.countResults();

    }

    componentDidUpdate(prevProps: ComponentProps) {
        if (undefined !== this.props.searchFilter && this.props.searchFilter !== prevProps.searchFilter) {
            this.countResults();
        }
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    render() {
        const { loading, error } = this.state;
        if (!!error) {
            return this.renderError();
        } else if (!!loading) {
            return this.renderCounting();
        } else {
            return this.renderResults();
        }

    }

    private readonly renderResults = () => {
        const { count } = this.state;
        return (
            <Box padding={4}>
                <span>{count} samples found.</span>
            </Box>
        );
    }

    private readonly renderCounting = () => {
        return (
            <Box padding={4}>
                <span>Counting results...</span><CircularProgress size="small" />
            </Box>
        );
    }

    private readonly renderError = () => {
        return (
            <Box padding={4}>
                <span>Cannot count the resulting samples.</span>
            </Box>
        );
    }

    private readonly countResults = async () => {
        const { searchFilter } = this.props;
        const queryParams = [];
        for (const studyId of (searchFilter.studyIds || [])) {
            queryParams.push(`studyId=${studyId}`);
        }
        for (const cellLine of (searchFilter.tissueCellLines || [])) {
            queryParams.push(`tissueCellLine=${cellLine}`);
        }
        const queryParamStr = 0 === queryParams.length ? "" : `?${queryParams.join("&")}`;
        const url = `samples/count${queryParamStr}`;

        this.abortController.abort();
        this.abortController = new AbortController();
        this.setState({ count: -1, loading: true, error: false });
        try {
            const count = await MechACovClient.get<number>(url, {}, this.abortController.signal);
            this.setState({ count: count, loading: false });
        } catch (error) {
            if ("AbortError" !== error.name) {
                this.setState({ count: -1, loading: false, error: true });
            }
        }
    }
};


export default Component;