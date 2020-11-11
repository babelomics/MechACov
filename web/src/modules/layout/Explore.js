import React from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

import StickyHeadTable from '../components/samplesTable/samplesTable'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    typography: {
        color: 'black',
    },
    iconHome: {
        fontSize: 50,
        color: blue[500],
        marginTop: theme.spacing(3),
    },
    box: {
        padding: 0,
        height: "80vh",
        margin: 'auto',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    title: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }
}));

const Explore = (props) => {
    const classes = useStyles();
    return (

        <div>
            <div className={classes.root}>
                <Grid container>
                    <Grid item xs={12}>
                        <br />
                        <Typography className={classes.title} variant={'h2'}>Explore Datasets</Typography>
                        <br />
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>


                        </Paper>
                    </Grid>
                    <Grid item xs={9}>
                    <Paper className={classes.paper}>

                        <StickyHeadTable />
                        </Paper>

                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Explore;
