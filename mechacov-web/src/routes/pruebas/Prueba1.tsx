import React from 'react';
import {  Grid } from '@material-ui/core';
import HistogramBar from '../visualizations/HistogramBar';
import Heatmap from '../visualizations/Heatmap';


function Prueba1() {
    return (
        <Grid container
            direction="column"
            justify="space-evenly"
            alignItems="center">
            <Grid item sm={12}>
                <br></br>
                 <HistogramBar width={640} height={480} />
            </Grid>
            <Grid item sm={12}>
                <br></br>
                 <Heatmap width={640} height={480} />
            </Grid>
        </Grid>
    );
}

export default Prueba1;
