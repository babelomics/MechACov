import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Home from './routes/home/Home';
import About from './routes/about/About';
import ExperimentRoute from './routes/experiment/ExperimentRoute';

import Prueba1 from './routes/pruebas/Prueba1';
import Prueba2 from './routes/pruebas/Prueba2';


function Routes() {
    return (
        <Switch>
            <Route path="/home">
                <Home />
            </Route>
            <Route path="/about">
                <About />
            </Route>
            <Route path="/experiments/:experimentId">
                <ExperimentRoute />
            </Route>
            <Route path="/prueba1">
                <Prueba1 />
            </Route>
            <Route path="/prueba2">
                <Prueba2 />
            </Route>
            <Route path="/" exact>
                <Redirect to="/home" />
            </Route>
        </Switch>
    );
}


export default Routes;
