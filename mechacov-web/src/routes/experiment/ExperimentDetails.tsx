import { Grid, Paper } from '@material-ui/core';
import React from 'react';
import Experiment from '../../models/Experiment';


interface ComponentProps {
    experiment: Experiment;
}


function Component(props: ComponentProps) {
    const { experiment } = props;
    return (
        <Paper>
            <Grid container>
                <Grid item xs={6}>Experiment</Grid>
                <Grid item xs={6}>{experiment.experimentId}</Grid>
                <Grid item xs={6}>Created on</Grid>
                <Grid item xs={6}>{experiment.creationDate}</Grid>
            </Grid>
        </Paper>
    );
}


export default Component;