import React, { useEffect, useState } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import MechACovClient from '../../clients/MechacovClient';
import Experiment from '../../models/Experiment';

import ExperimentDefiner from './ExperimentDefiner';

import { useSelector, useDispatch } from 'react-redux';
import ExperimentActions from '../../actions/ExperimentActions';


function Component() {

    const { experimentId } = useParams() as any;
    const experiment = useSelector((state: any) => state.experiment) as Experiment | null;
    const dispatch = useDispatch();
    

    useEffect(() => {
        const abortController = new AbortController();
        MechACovClient.getExperiment(experimentId, abortController.signal).then((experiment: Experiment) => {
            dispatch(ExperimentActions.set(experiment));
        }).catch((error: Error) => {
            if ("AbortError" !== error.name) {
                // TODO
            }
        });
        return () => { abortController.abort(); };

    }, [experimentId]);

    if (null === experiment) {
        return (
            <div>Loading...</div>
        );
    } else {
        const actualExperiment = experiment as Experiment;
        if ("IN_DEFINITION" === actualExperiment.state) {
            return (
                <ExperimentDefiner />
            );
        } else {
            return (
                <></>
            );
        }
    }
}


export default Component;