import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Home from './routes/home/Home';
import About from './routes/about/About';
import ExperimentRoute from './routes/experiment/Experiment';
import DataExplorer from './routes/visualizations/DataExplorer';


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
                <ExperimentRoute />
            </Route>
            <Route path="/explorer">
                <DataExplorer />
            </Route>
            <Route path="/" exact>
                <Redirect to="/home" />
            </Route>
        </Switch>
    );
}


export default Routes;


