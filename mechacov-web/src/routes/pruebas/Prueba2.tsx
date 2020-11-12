import React from 'react';
import { Box, Typography, Tab, makeStyles, Theme, AppBar, Tabs, Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import HistogramBar from '../visualizations/HistogramBar';
import PieChart from '../visualizations/PieChart';
import HeatmapPlotly from '../visualizations/HeatmapPlotly';

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `nav-tab-${index}`,
        'aria-controls': `nav-tabpanel-${index}`,
    };
}

interface LinkTabProps {
    label?: string;
    href?: string;
}

function LinkTab(props: LinkTabProps) {
    return (
        <Tab
            component="a"
            onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },

    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    table: {
        minWidth: 650,
    },
}));

function createData(name: string, platform: number, cases: number, controls: number, infected: number) {
    return { name, platform, cases, controls, infected };
}


const rows = [
    createData('META-ANALYSIS', 159, 6.0, 24, 40),
    createData('STUDY A', 237, 90, 37, 43),
    createData('STUDY B', 262, 160, 24, 60),
    createData('STUDY C', 305, 37, 67, 43),
    createData('STUDY D', 356, 160, 49, 39),
];

// function createDataGen(gen: string, logFC: number, PValue: string, adjPVal: number, logFC1: number) {
//     return { gen, logFC, PValue, adjPVal, logFC1 };
// }

// const resultGenExpression = [
//     createDataGen('TXNIP',	4.10977981,	3.71E-09,	4.06E-05,	2.382291661,	0.109048446,	0.268248035,	3.4001,	1.15E-09,	1.69E-08),
// ];



export default function Prueba2() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs
                    variant="fullWidth"
                    value={value}
                    onChange={handleChange}
                    aria-label="nav tabs example"
                >
                    <LinkTab label="Data Exploration" href="/drafts" {...a11yProps(0)} />
                    <LinkTab label="Gene Expression" href="/trash" {...a11yProps(1)} />
                    <LinkTab label="Mechanistic Analysis" href="/spam" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Grid container
                    justify="space-evenly"
                    alignItems="center">

                    <Grid item xs={4}>
                        <PieChart width={600} height={300}></PieChart>
                    </Grid>
                    <Grid item xs={8}>
                        <Paper className={classes.paper}>
                            <Typography variant="h6" >
                                Variables from meta-data
                            </Typography>
                            <br />
                            <TableContainer component={Paper}>
                                <Table className={classes.table} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell></TableCell>
                                            <TableCell align="right">Platform</TableCell>
                                            <TableCell align="right">Cases</TableCell>
                                            <TableCell align="right">Controls</TableCell>
                                            <TableCell align="right">Infected</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <TableRow key={row.name}>
                                                <TableCell component="th" scope="row">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="right">{row.platform}</TableCell>
                                                <TableCell align="right">{row.cases}</TableCell>
                                                <TableCell align="right">{row.controls}</TableCell>
                                                <TableCell align="right">{row.infected}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <HistogramBar width={640} height={480} />
                    </Grid>
                    <Grid item xs={4}>
                        <HistogramBar width={640} height={480} />
                    </Grid>
                    <Grid item xs={4}>
                        <HistogramBar width={640} height={480} />
                    </Grid>
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Grid container
                    justify="space-evenly"
                    alignItems="center"
                    spacing={3}>

                    <Grid item xs={12}>
                        <HeatmapPlotly></HeatmapPlotly>
                    </Grid>
                    <Grid item xs={8}>

                        <TableContainer component={Paper}>
                            <Table className={classes.table} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>study_id</TableCell>
                                        <TableCell align="right">GSE122876</TableCell>
                                        <TableCell align="right"></TableCell>
                                        <TableCell align="right"></TableCell>
                                        <TableCell align="right">GSE139516</TableCell>
                                        <TableCell align="right"></TableCell>
                                        <TableCell align="right"></TableCell>
                                        <TableCell align="right">Meta-analysis</TableCell>
                                        <TableCell align="right"></TableCell>
                                        <TableCell align="right"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>feature_id</TableCell>
                                        <TableCell align="right">logFC</TableCell>
                                        <TableCell align="right">P-Value</TableCell>
                                        <TableCell align="right">adj-P-Val</TableCell>
                                        <TableCell align="right">logFC</TableCell>
                                        <TableCell align="right">P-Value</TableCell>
                                        <TableCell align="right">adj-P-Val</TableCell>
                                        <TableCell align="right">eff Size</TableCell>
                                        <TableCell align="right">P-Value</TableCell>
                                        <TableCell align="right">adj-P-Val</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>TXNIP</TableCell>
                                        <TableCell align="right">4.10977981</TableCell>
                                        <TableCell align="right">0.00000000371</TableCell>
                                        <TableCell align="right">0.0000406</TableCell>
                                        <TableCell align="right">2.382291661</TableCell>
                                        <TableCell align="right">0.109048446</TableCell>
                                        <TableCell align="right">0.268248035</TableCell>
                                        <TableCell align="right">3.4001</TableCell>
                                        <TableCell align="right">0.00000000115</TableCell>
                                        <TableCell align="right">0.0000000169</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>SPCS1</TableCell>
                                        <TableCell align="right">-1.620408488</TableCell>
                                        <TableCell align="right">0.00000000601</TableCell>
                                        <TableCell align="right">0.0000406</TableCell>
                                        <TableCell align="right">-1.869170556</TableCell>
                                        <TableCell align="right">0.028301224</TableCell>
                                        <TableCell align="right">0.113116804</TableCell>
                                        <TableCell align="right">-1.2645</TableCell>
                                        <TableCell align="right">0.00000117</TableCell>
                                        <TableCell align="right">0.0000971</TableCell>
                                    </TableRow>


                                    <TableRow>
                                        <TableCell>GMEB2</TableCell>
                                        <TableCell align="right">1.576110798</TableCell>
                                        <TableCell align="right">0.00000000632</TableCell>
                                        <TableCell align="right">0.0000406</TableCell>
                                        <TableCell align="right">0.489329602</TableCell>
                                        <TableCell align="right">0.109048446</TableCell>
                                        <TableCell align="right">0.268248035</TableCell>
                                        <TableCell align="right">3.4001</TableCell>
                                        <TableCell align="right">0.00000132</TableCell>
                                        <TableCell align="right">0.000103506</TableCell>
                                    </TableRow>


                                    {/* {rows.map((row) => (
                                        <TableRow key={row.name}>
                                            <TableCell component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.platform}</TableCell>
                                            <TableCell align="right">{row.cases}</TableCell>
                                            <TableCell align="right">{row.controls}</TableCell>
                                            <TableCell align="right"></TableCell>
                                            <TableCell align="right"></TableCell>
                                            <TableCell align="right">{row.infected}</TableCell>
                                            <TableCell align="right"></TableCell>
                                            <TableCell align="right"></TableCell>
                                        </TableRow>
                                    ))} */}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Grid>

                </Grid>
            </TabPanel>
            <TabPanel value={value} index={2}>
                Page Three
      </TabPanel>
        </div>
    );
}

