
import React, { useState } from 'react';
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
            <TableCell colSpan={11}>
                {children}
            </TableCell>
        </TableRow>
    );
}



interface ComponentProps {
    searchFilter: SampleFilter;
}


function isSampleFilterEmpty(sampleFilter: SampleFilter) {
    return undefined === sampleFilter.studyIds
        && undefined === sampleFilter.groups
        && undefined === sampleFilter.strains
        && undefined === sampleFilter.tissueCellTypes
        && undefined === sampleFilter.platforms
        && undefined === sampleFilter.platformDetails
        && undefined === sampleFilter.minHpi
        && undefined === sampleFilter.maxHpi
        && undefined === sampleFilter.minMoi
        && undefined === sampleFilter.maxMoi;
}


function Component(props: ComponentProps) {
    const { searchFilter } = props;

    const [analyses, setAnalyses] = useState([] as Sample[]);
    const [errorMsg, setErrorMsg] = useState("");

    function fetchPage(page: number, pageSize: number, abortSignal: AbortSignal): Promise<Sample[]> {
        const queryParams = [];
        for (const studyId of (searchFilter.studyIds || [])) {
            queryParams.push(`studyId=${studyId}`);
        }
        const queryParamStr = 0 === queryParams.length ? "" : `?${queryParams.join("&")}`;
        const url = `samplePages/${pageSize}/${page}${queryParamStr}`;
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