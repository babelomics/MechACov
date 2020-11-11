import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

import LazyList from '../../components/common/LazyList';
import SampleRow from './SampleRow';
import MechACovClient from '../../clients/MechacovClient';
import Sample from '../../models/Sample';
import SampleFilter from '../../models/SampleFilter';



const PAGE_SIZE = 50;
const PAGE = 0;



interface WrapperProps {
    children: React.ReactNode;
}


function Wrapper(props: WrapperProps) {
    const { children } = props;
    return (
        <TableRow>
            <TableCell colSpan={13}>
                {children}
            </TableCell>
        </TableRow>
    );
}


interface ComponentProps {
    searchFilter: SampleFilter;
    controls: Set<string>;
    cases: Set<string>;
    toggleControl: (sample: Sample) => void;
    toggleCase: (sample: Sample) => void;    
}


interface ComponentState {
    samples: Sample[];
}



class Component extends React.PureComponent<ComponentProps, ComponentState> {

    state = {
        samples: [],
        refreshing: false,
    };

    render() {
        const { searchFilter, controls, cases, toggleControl, toggleCase } = this.props;
        const { samples } = this.state;

        return (
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
                        <TableCell>Control</TableCell>
                        <TableCell>Case</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <LazyList<Sample> Wrapper={Wrapper} items={samples} setItems={this.setSamples} token={searchFilter} fetchPage={this.fetchPage}>
                        {
                            samples.map((sample: Sample) => {
                                const isCase = cases.has(sample.id);
                                const isControl = !isCase && controls.has(sample.id);
                                return (
                                    <SampleRow key={sample.id} sample={sample} isControl={isControl} isCase={isCase} toggleControl={toggleControl} toggleCase={toggleCase} />
                                );
                            })
                        }
                    </LazyList>
                </TableBody>
            </Table>
        );
    }

    private readonly setSamples = (newSamples: Sample[]) => {
        this.setState({ samples: newSamples });
    }

    private readonly fetchPage = (page: number, pageSize: number, abortSignal: AbortSignal): Promise<Sample[]> => {

        const { searchFilter } = this.props;
        const queryParams = [];
        for (const studyId of (searchFilter.studyIds || [])) {
            queryParams.push(`studyId=${studyId}`);
        }
        for (const cellLine of (searchFilter.tissueCellLines || [])) {
            queryParams.push(`tissueCellLine=${cellLine}`);
        }
        const queryParamStr = 0 === queryParams.length ? "" : `?${queryParams.join("&")}`;
        const url = `samplePages/${pageSize}/${page}${queryParamStr}`;
        return MechACovClient.get<Sample[]>(url, {}, abortSignal);
    }
}


export default Component;