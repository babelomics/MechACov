import React from 'react';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';



const useStyles = makeStyles(theme => ({
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
        margin: 'auto',
    },
}));

function Home() {
    const classes = useStyles();
    return (
        <Grid container
            direction="column"
            justify="space-evenly"
            alignItems="center">
            <Grid item xs={12} sm={6}><HomeIcon className={classes.iconHome} /></Grid>
            <Grid item xs={12} sm={6}><Typography className={classes.typography} variant='h4'>Welcome !</Typography></Grid>
            <Grid item sm={12}>
                <Box padding={4}>
                    <Button component={Link} to="/experiment" variant="contained" color="primary">Run an experiment!</Button>
                </Box>
            </Grid>
        </Grid>
    );
}


export default Home;
