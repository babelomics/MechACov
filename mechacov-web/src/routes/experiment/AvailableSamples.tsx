import React from 'react';
import { connect } from 'react-redux';
import { Box, Button, ButtonGroup, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@material-ui/core';

import MechACovClient from '../../clients/MechacovClient';
import Experiment from '../../models/Experiment';
import Sample from '../../models/Sample';

import SampleFilter from '../../models/SampleFilter';
import SampleRow from './SampleRow';
import SampleCounterActionTypes from '../../action-types/SampleCounterActionTypes';
import SampleCounterActions from '../../actions/SampleCounterActions';



interface ComponentProps {
    sampleFilter: SampleFilter;
    experimentId: string;
    sampleCount: number;
    resetSampleCount: () => void;
    setSampleCount: (count: number) => void;
}


interface ComponentState {
    pageSize: number;
    page: number;
    samples: Sample[];
}


class AvailableSamples extends React.PureComponent<ComponentProps, ComponentState> {

    private abortController = new AbortController();
    private abortControllerForCount = new AbortController();

    state = {
        pageSize: 10,
        page: 0,
        samples: [],
    };

    componentDidMount() {
        this.fetchPage(0);
        this.countSamples();
    }

    componentDidUpdate(prevProps: ComponentProps) {
        const { experimentId, sampleFilter } = this.props;
        if (experimentId !== prevProps.experimentId || sampleFilter !== prevProps.sampleFilter) {
            this.fetchPage(0);
            this.countSamples();
        }
    }

    componentWillUnmount() {
        this.abortController.abort();
        this.abortControllerForCount.abort();
    }

    render() {
        const { samples, page, pageSize } = this.state;
        const { sampleCount } = this.props;

        const pageSampleCount = samples.length;
        const numEmpties = pageSize - pageSampleCount;

        return (
            <Paper>
                <Box margin={4} display="flex" flexDirection="row-reverse">
                    <ButtonGroup color="default" variant="contained">
                        <Button variant="contained">Add all to controls</Button>
                        <Button variant="contained">Remove all from controls</Button>
                        <Button variant="contained">Add all to cases</Button>
                        <Button variant="contained">Remove all from cases</Button>

                    </ButtonGroup>
                </Box>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Study</TableCell>
                                <TableCell>GSM</TableCell>
                                <TableCell>Column</TableCell>
                                <TableCell>Group</TableCell>
                                <TableCell>HPI</TableCell>
                                <TableCell>MOI</TableCell>
                                <TableCell>Strain</TableCell>
                                <TableCell>Tissue cell type</TableCell>
                                <TableCell>Platform</TableCell>
                                <TableCell>Platform details</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {samples.map((sample: Sample) => <SampleRow key={sample.id} sample={sample} />)}
                            {0 < numEmpties && <TableRow><TableCell rowSpan={numEmpties} colSpan={10} /></TableRow>}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination count={sampleCount} onChangePage={this.handlePageChange} onChangeRowsPerPage={this.handlePageSizeChange} page={page} rowsPerPage={pageSize} />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Paper>
        );
    }

    private readonly handlePageChange = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number) => {
        this.fetchPage(page);
    }

    private readonly handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        this.setState({ pageSize: parseInt(event.target.value, 10) }, () => {
            this.fetchPage(0);
        });
    }

    private readonly fetchPage = (page: number) => {
        const { sampleFilter } = this.props;
        const { pageSize } = this.state;

        this.abortController.abort();
        this.abortController = new AbortController();

        MechACovClient.getSamplePage(sampleFilter, pageSize, page, this.abortController.signal).then((samples: Sample[]) => {
            this.setState({ page: page, samples: samples });
        }).catch((error: Error) => {
            if ("AbortError" !== error.name) {

            }
        });
    }

    private readonly countSamples = () => {
        const { sampleFilter, setSampleCount } = this.props;
        this.abortControllerForCount.abort();
        this.abortControllerForCount = new AbortController();
        MechACovClient.countSamples(sampleFilter, this.abortControllerForCount.signal).then((sampleCount: number) => {
            setSampleCount(sampleCount);
        }).catch((error: Error) => {
            if ("AbortError" !== error.name) {

            }
        });
    }
}


const mapStateToProps = (state: any) => ({
    experimentId: (state.experiment as Experiment).experimentId,
    sampleFilter: state.sampleFilter as SampleFilter,
    sampleCount: (state.sampleCounts.availableCount | 0) as number,
});

const mapDispatchToProps = (dispatch: any) => ({
    resetSampleCount: () => { dispatch(SampleCounterActions.resetAvailable()); },
    setSampleCount: (count: number) => { dispatch(SampleCounterActions.setAvailable(count)); },
});



export default connect(mapStateToProps, mapDispatchToProps)(AvailableSamples);