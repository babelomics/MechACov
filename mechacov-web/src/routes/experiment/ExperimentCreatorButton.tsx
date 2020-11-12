import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Button, CircularProgress, Dialog, DialogTitle, DialogContent } from '@material-ui/core';

import Experiment from '../../models/Experiment';
import { useHistory } from 'react-router-dom';
import MechACovClient from '../../clients/MechacovClient';



interface WorkingProps {
    onError: (error: Error) => void;
}


function Working(props: WorkingProps) {
    const { onError } = props;
    const history = useHistory();

    useEffect(() => {
        const abortController = new AbortController();
        MechACovClient.createExperiment(abortController.signal).then((experiment: Experiment) => {
            history.push(`/experiments/${experiment.experimentId}`)
        }).catch((error: Error) =>  {
            if ("AbortError" !== error.name) {
                onError(error);
            }
        });
        return () => {
            abortController.abort();
        };
    });


    return (
        <Box position="fixed" marginLeft={0} marginTop={0} width="100vw" height="100vh" display="flex" flexDirection="column">
            <Box flexGrow={1} />
            <Box flexGrow={0} padding={4}>
                <div style={{ backgroundColor: "cyan"}}>
                    creating experiment...                
                </div>                
            </Box>
            <Box flexGrow={1} />
        </Box >
    );
}


function Component() {    
    const [working, setWorking] = useState(false);
    const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setWorking(true);
    }, []);

    const handleError = useCallback((error: Error) => {
        setWorking(false);
    }, [setWorking]);

    return (
        <>
            <Button variant="contained" color="primary" onClick={handleClick}>
                Run experiment!
            </Button>
            { working && <Working onError={handleError} />}

        </>
    );
}


export default Component;