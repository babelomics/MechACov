import React from 'react';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';
import ExperimentCreatorButton from '../experiment/ExperimentCreatorButton';



const useStyles = makeStyles(theme => ({
    typography: {
        color: 'black',
    },
    iconHome: {
        fontSize: 50,
        color: blue[500],
        marginTop: theme.spacing(3),
    },
    box: {
        padding: 0,
        margin: 'auto',
    },
}));

function Home() {
    const classes = useStyles();
    return (
        <Box margin={16}>
            <Grid container justify="center" alignItems="center">
                <Grid item xs={12} md={6}>
                    <Box margin="auto" width="80%" height="80%" display="flex" flexDirection="column">
                        <img src="/resources/logo-mechacov.svg" alt="MechACov" style={{ margin: "auto", width: "80%", height: "80%", objectFit: "contain" }} />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box display="flex" flexDirection="column" justifyContent="space-evenly" alignItems="center">
                        <Box margin={2}>
                            <Typography className={classes.typography} variant='h4'>Welcome to <strong>MechACov</strong>!</Typography>
                        </Box>
                        <Typography variant="h6">
                            The development of biomedical high-throughput technologies has made omic analyses more affordable and, thus, accessible. This technological boom has rapidly taken us to a scenario where we are gathering a vast amount of data at public repositories, such as GEO, EGA, SRA or ArrayExpress, changing the data challenge, that now lies in the integration of all the available data, and in drawing conclusions from it as a whole.
                        </Typography>
                        <Box height="1vh" />
                        <Typography variant="h6">
                            Given the recent events of COVID-19 pandemic, we expect to be flooded with a huge amount of omics data from cells or patients infected with SARS-CoV-2 in the upcoming years, since several initiatives are arising worldwide. These studies have great value by themselves, however, the joint effort of all the research institutions around the globe will show more power after analysing all the generated data as a whole.
                        </Typography>
                        <Box height="1vh" />
                        <Typography variant="h6">
                            In this project we aim to develop a tool that would be able to retrieve all the transcriptomic information available at several public data repositories and to optimize a workflow to perform gene expression and mechanistic meta-analyses with a simple but robust methodology. This workflow will be able to deal with several issues regarding automatization the meta-analysis process, such as the heterogeneity of samples, the access to unified metadata, standardize variable codification, sample selection or cross-platform effect. We will work in all these aspects trying to find the best solution for each issue, using already available open workflows and resources that meet ELIXIR criteria, or developing new ones if needed.
                        </Typography>
                        <Box padding={4}>
                            <ExperimentCreatorButton />
                            {/* <Button component={Link} to="/experiment" variant="contained" color="primary">Run an experiment!</Button> */}
                        </Box>

                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}


export default Home;
