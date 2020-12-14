import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Home from './routes/home/Home';
import ExperimentRoute from './routes/experiment/ExperimentRoute';

import Prueba1 from './routes/pruebas/Prueba1';
import Prueba2 from './routes/pruebas/Prueba2';
import Prueba3 from './routes/pruebas/Prueba3';


function Routes() {
    return (
        <Switch>
            <Route path="/home">
                <Home />
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
            <Route path="/prueba3">
                <Prueba3 />
            </Route>
            <Route path="/" exact>
                <Redirect to="/home" />
            </Route>
        </Switch>
    );
}


export default Routes;
