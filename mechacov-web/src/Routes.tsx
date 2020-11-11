import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Home from './routes/home/Home';
import About from './routes/about/About';
import Experiment from './routes/experiment/Experiment';


function Routes() {
    return (
        <Switch>
            <Route path="/home">
                <Home />
            </Route>
            <Route path="/about">
                <About />
            </Route>
            <Route path="/experiment">
                <Experiment />
            </Route>
            <Route path="/" exact>
                <Redirect to="/home" />
            </Route>
        </Switch>
    );
}


export default Routes;


