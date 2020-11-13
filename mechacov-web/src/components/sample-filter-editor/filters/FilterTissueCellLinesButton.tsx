import { Button, Dialog } from '@material-ui/core';
import React from 'react';
import SampleFilter from '../../../models/SampleFilter';
import SampleFilterEditor from '../SampleFilterEditor';

import FilterTissueCellLinesDialog from './FilterTissueCellLinesDialog';


interface ComponentProps {
    tissueCellLines: string[] | undefined;
    setTissueCellLines: (newTissueCellLines: string[]) => void;
}


interface ComponentState {
    open: boolean;
}


class Component extends React.PureComponent<ComponentProps, ComponentState> {

    state = {
        open: false
    };

    render() {
        const { tissueCellLines, setTissueCellLines} = this.props;
        const { open } = this.state;
        const active = 0 < (tissueCellLines || []).length;
        return (
            <>
                <Button fullWidth variant="contained" color={active ? "primary" : "default"} onClick={this.handleOpen}>Tissue Cell Lines</Button>
                <FilterTissueCellLinesDialog open={open} tissueCellLines={tissueCellLines} onClose={this.handleClose} setTissueCellLines={setTissueCellLines} />
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