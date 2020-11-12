import React, { useEffect, useState } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import MechACovClient from '../../clients/MechacovClient';
import Experiment from '../../models/Experiment';

import ExperimentDefiner from './ExperimentDefiner';


function Component() {

    const { experimentId } = useParams() as any;

    const [experiment, setExperiment] = useState(undefined as (Experiment | undefined));

    useEffect(() => {
        const abortController = new AbortController();
        MechACovClient.getExperiment(experimentId, abortController.signal).then((experiment: Experiment) => {
            setExperiment(experiment);
        }).catch((error: Error) => {
            if ("AbortError" !== error.name) {
                // TODO
            }
        });
        return () => { abortController.abort(); };

    }, [experimentId]);

    if (undefined === experiment) {
        return (
            <div>Loading...</div>
        );
    } else {
        const actualExperiment = experiment as unknown as Experiment;
        if ("IN_DEFINITION" === actualExperiment.state) {
            return (
                <ExperimentDefiner experiment={actualExperiment} />
            );
        } else {
            return (
                <></>
            );
        }
    }
}


export default Component;