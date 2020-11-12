import React from 'react';
import { Box, Button, CircularProgress, Dialog, DialogTitle, DialogContent } from '@material-ui/core';

import Experiment from '../../models/Experiment';



interface ComponentProps {
    experiment: Experiment | undefined;

}


class Component extends React.PureComponent<ComponentProps> {

    render() {
        const { experiment } = this.props;
        return (
            <Dialog maxWidth="md" fullWidth open={!!experiment}>
                <DialogTitle>Sending experiment...</DialogTitle>
                <DialogContent>
                    <CircularProgress />
                </DialogContent>
            </Dialog>
        );
    }
}


export default Component;