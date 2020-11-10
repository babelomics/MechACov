
import React from 'react';
import { TableCell, TableRow } from '@material-ui/core';

import Sample from './sample';


interface ComponentProps {
    sample: Sample;
}


function Component(props: ComponentProps) {
    const { sample } = props;

    return (
        <TableRow>
            <TableCell>{sample._id}</TableCell>
            <TableCell>{sample.studyId}</TableCell>
            <TableCell>{sample.gsmId}</TableCell>
            <TableCell>{sample.columnId}</TableCell>
            <TableCell>{sample.group}</TableCell>
            <TableCell>{sample.hpi}</TableCell>
            <TableCell>{sample.moi}</TableCell>
            <TableCell>{sample.strain}</TableCell>
            <TableCell>{sample.tissueCellType}</TableCell>
            <TableCell>{sample.platform}</TableCell>
            <TableCell>{sample.platformDetails}</TableCell>
        </TableRow>
    );
};


export default Component;