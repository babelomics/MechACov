import { Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@material-ui/core';
import React from 'react';
import MechACovClient from '../../clients/MechacovClient';
import Sample from '../../models/Sample';

import SampleFilter from '../../models/SampleFilter';
import SampleRow from './SampleRow';



interface ComponentProps {
    sampleFilter: SampleFilter;
    experimentId: string;
}


interface ComponentState {
    pageSize: number;
    page: number;
    samples: Sample[];
    sampleCount: number;
}


class AvailableSamples extends React.PureComponent<ComponentProps, ComponentState> {

    private abortController = new AbortController();
    private abortControllerForCount = new AbortController();

    state = {
        pageSize: 10,
        page: 0,
        samples: [],
        sampleCount: 0,
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
        const { samples, sampleCount, page, pageSize } = this.state;

        const pageSampleCount = samples.length;
        const numEmpties = pageSize - pageSampleCount;

        return (
            <Paper>
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
        const { sampleFilter } = this.props;
        this.abortControllerForCount.abort();
        this.abortControllerForCount = new AbortController();
        MechACovClient.countSamples(sampleFilter, this.abortControllerForCount.signal).then((sampleCount: number) => {
            this.setState({ sampleCount: sampleCount });
        }).catch((error: Error) => {
            if ("AbortError" !== error.name) {

            }
        });
    }
}



export default AvailableSamples;