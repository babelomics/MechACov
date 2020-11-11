
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

import LazyList from '../../components/common/LazyList';
import SampleRow from './SampleRow';

import MechACovClient from './mechacov-client';
import Sample from '../../models/Sample';



const PAGE_SIZE = 50;
const PAGE = 0;



interface WrapperProps {
    children: React.ReactNode;
}


function Wrapper(props: WrapperProps) {
    const { children } = props;
    return (
        <TableRow>
            <TableCell colSpan={11}>
                {children}
            </TableCell>
        </TableRow>
    );
}



interface ComponentProps {
    searchFilter: any;
}


function Component(props: ComponentProps) {
    const { searchFilter } = props;

    const [analyses, setAnalyses] = useState([] as Sample[]);
    const [errorMsg, setErrorMsg] = useState("");

    function fetchPage(page: number, pageSize: number, abortSignal: AbortSignal): Promise<Sample[]> {
        const url = `samplePages/${pageSize}/${page}`;
        return MechACovClient.get<Sample[]>(url, {}, abortSignal);
    }

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
                </TableRow>
            </TableHead>
            <TableBody>
                <LazyList<Sample> Wrapper={Wrapper} items={analyses} setItems={setAnalyses} token={searchFilter} fetchPage={fetchPage}>
                    {
                        analyses.map((sample: Sample) => {
                            return (
                                <SampleRow key={sample.id} sample={sample} />
                            );
                        })
                    }
                </LazyList>
            </TableBody>
        </Table>
    );

};


export default Component;