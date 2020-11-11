import React from 'react'
import {
    Grid,
    AppBar,
    Toolbar,
    Typography,
    Box,
    Button,
} from '@material-ui/core'
import { styles } from './StyleMenuToolbar'
import Sliderbar from '../sidebar/Sidebar'

import CloseIcon from '@material-ui/icons/Close';
import { Link, Route, Switch } from 'react-router-dom';

function MenuToolbar() {
    const classes = styles
    return (
        <Grid container className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Sliderbar />
                    <Typography
                        className={classes.title}
                        variant='h5'
                    >
                        MechACov
                    </Typography>
                    <Box flexGrow={1} />
                    <Switch>
                        <Route path="/home"></Route>
                        <Route>
                            <Button component={Link} to="/home" color="inherit"><CloseIcon /></Button>
                        </Route>
                    </Switch>
                </Toolbar>
            </AppBar>
        </Grid>
    );
}


export default MenuToolbar; 