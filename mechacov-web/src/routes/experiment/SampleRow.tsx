
import React from 'react';
import { Checkbox, TableCell, TableRow } from '@material-ui/core';

import Sample from '../../models/Sample';


interface ComponentProps {
    sample: Sample;
}


class Component extends React.PureComponent<ComponentProps> {

    render() {
        const { sample } = this.props;
        return (
            <TableRow>
                <TableCell>{sample.id}</TableCell>
                <TableCell>{sample.studyId}</TableCell>
                <TableCell>{sample.gsmId}</TableCell>
                <TableCell>{sample.columnId}</TableCell>
                <TableCell>{sample.group}</TableCell>
                <TableCell>{sample.hpi}</TableCell>
                <TableCell>{sample.moi}</TableCell>
                <TableCell>{sample.strain}</TableCell>
                <TableCell>{sample.tissueCellLine}</TableCell>
                <TableCell>{sample.platform}</TableCell>
                <TableCell>{sample.platformDetails}</TableCell>
            </TableRow>
        );
    }
}




export default Component;