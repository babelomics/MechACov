import { Button, Dialog } from '@material-ui/core';
import React from 'react';
import SampleFilter from '../../../models/SampleFilter';
import SampleFilterEditor from '../SampleFilterEditor';

import FilterGroupDialog from './FilterGroupDialog';


interface ComponentProps {
    values: string[] | undefined;
    setValues: (newValues: string[]) => void;
}


interface ComponentState {
    open: boolean;
}


class Component extends React.PureComponent<ComponentProps, ComponentState> {

    state = {
        open: false
    };

    render() {
        const { values, setValues} = this.props;
        const { open } = this.state;
        const active = 0 < (values || []).length;
        return (
            <>
                <Button fullWidth variant="contained" color={active ? "primary" : "default"} onClick={this.handleOpen}>Group</Button>
                <FilterGroupDialog open={open} values={values} onClose={this.handleClose} setValues={setValues} />
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