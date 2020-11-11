import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Typography, Drawer, Button, List, Divider, ListItem, ListItemText,
    ListItemIcon
} from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu'
import { Link } from 'react-router-dom'

import HomeIcon from '@material-ui/icons/HomeTwoTone';
import ExploreIcon from '@material-ui/icons/BarChartTwoTone';
import AboutIcon from '@material-ui/icons/InfoTwoTone';


const useStyles = makeStyles(theme => ({
    list: {
        width: 250,
        height: 1000
    },
    fullList: {
        width: "auto",
    },
    link: {
        textDecoration: "none",
        color: 'black',
    },
    menuIcon: {
        color: "white",
    },
    title: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        color: 'black',
        fontWeight: 'bold',

    }
}));


export default function Sliderbar() {

    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false
    });

    const toggleDrawer = (side, open) => event => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setState({ ...state, [side]: open });
    };

    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >

            <List>
                <ListItem>
                    <ListItemText className={classes.title}>
                        <Typography className={classes.title} variant='h5'>
                            MechAcov
            </Typography>
                    </ListItemText>
                </ListItem>

                <Divider />

                <Link to="/home" className={classes.link}>
                    <ListItem button >
                        <ListItemIcon><HomeIcon /></ListItemIcon>
                        <ListItemText>Home</ListItemText>
                    </ListItem>
                </Link>

                <Link to="/experiment" className={classes.link}>
                    <ListItem button >
                        <ListItemIcon><ExploreIcon /></ListItemIcon>
                        <ListItemText>Experiment</ListItemText>
                    </ListItem>
                </Link>

                <Link to="/about" className={classes.link}>
                    <ListItem button >
                        <ListItemIcon><AboutIcon /></ListItemIcon>
                        <ListItemText>About</ListItemText>
                    </ListItem>
                </Link>
            </List>

            <Divider />

        </div>
    );

    return (
        <div>
            <Button onClick={toggleDrawer("left", true)}>
                <MenuIcon mr={4} className={classes.menuIcon} />
            </Button>
            <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
                {sideList("left")}
            </Drawer>
        </div>
    );
}