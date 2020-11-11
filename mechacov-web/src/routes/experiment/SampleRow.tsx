
import React from 'react';
import { Checkbox, TableCell, TableRow } from '@material-ui/core';

import Sample from '../../models/Sample';


interface ComponentProps {
    sample: Sample;
    isControl: boolean;
    isCase: boolean;
    toggleControl: (sample: Sample) => void;
    toggleCase: (sample: Sample) => void;
}


class Component extends React.PureComponent<ComponentProps> {

    render() {
        const { sample, isControl, isCase } = this.props;

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
                <TableCell><Checkbox checked={isControl} onChange={this.handleControlChange} /></TableCell>
                <TableCell><Checkbox checked={isCase} onChange={this.handleCaseChange} /></TableCell>

            </TableRow>
        );
    }

    private readonly handleControlChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        const { sample, toggleControl } = this.props;
        toggleControl(sample);
    }

    private readonly handleCaseChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        const { sample, toggleCase } = this.props;
        toggleCase(sample);
    }


}




export default Component;