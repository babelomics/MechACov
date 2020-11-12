import { Button, Dialog } from '@material-ui/core';
import React from 'react';
import SampleFilter from '../../../models/SampleFilter';
import SampleFilterEditor from '../SampleFilterEditor';

import FilterStudiesDialog from './FilterStudiesDialog';


interface ComponentProps {
    studyIds: string[] | undefined;
    setStudyIds: (newStudyIds: string[]) => void;
}


interface ComponentState {
    open: boolean;
}


class Component extends React.PureComponent<ComponentProps, ComponentState> {

    state = {
        open: false
    };

    render() {
        const { studyIds, setStudyIds} = this.props;
        const { open } = this.state;
        const active = 0 < (studyIds || []).length;
        return (
            <>
                <Button fullWidth variant="contained" color={active ? "primary" : "default"} onClick={this.handleOpen}>Study</Button>
                <FilterStudiesDialog open={open} studyIds={studyIds} onClose={this.handleClose} setStudyIds={setStudyIds} />
            </>
        );

    }

    private readonly handleOpen = () => {
        this.setState({ open: true });
    }

    private readonly handleClose = () => {
        this.setState({ open: false });
    }
}


export default Component;