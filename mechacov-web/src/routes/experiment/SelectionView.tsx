import { Box, Button, Grid, Paper } from '@material-ui/core';
import React from 'react';
import Sample from '../../models/Sample';



interface ComponentProps {
    controls: Sample[];
    cases: Sample[];
}


class Component extends React.PureComponent<ComponentProps> {

    render() {
        const { controls, cases } = this.props;
        return (
            <Box padding={4}>
                <Paper elevation={1}>
                    <Box padding={4}>
                        <Grid container xs={12} sm={6} md={8}>
                            <Grid item xs={8}>Number of controls</Grid>
                            <Grid item xs={4}>{controls.length}</Grid>
                            <Grid item xs={8}>Number of cases</Grid>
                            <Grid item xs={4}>{cases.length}</Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Box>
        );
    }

}


export default Component;