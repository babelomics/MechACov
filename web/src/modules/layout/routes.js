import React from 'react'
import Home from './Home'
import Explore from './Explore'

import About from './About'

import HomeIcon from '@material-ui/icons/HomeTwoTone';
import ExploreIcon from '@material-ui/icons/BarChartTwoTone';
import AboutIcon from '@material-ui/icons/InfoTwoTone';

export const routesPublic = [
    {
        name: "Home",
        path: '/home',
        component: Home,
        menuList: true,
        icon: <HomeIcon />
    },
    {
        name: "Explore Datasets",
        path: '/explore',
        component: Explore,
        menuList: true,
        icon: <ExploreIcon />,
    },
    {
        name: "About",
        path: '/about',
        component: About,
        menuList: true,
        icon: <AboutIcon />,
    }];