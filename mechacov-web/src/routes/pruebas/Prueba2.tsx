import React from 'react';
import { Box, Typography, Tab, makeStyles, Theme, AppBar, Tabs, Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import HistogramBar from '../visualizations/HistogramBar';
import PieChart from '../visualizations/PieChart';

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

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('META-ANALYSIS', 159, 6.0, 24, 40),
    createData('STUDY A', 237, 90, 37, 43),
    createData('STUDY B', 262, 160, 24, 60),
    createData('STUDY C', 305, 37, 67, 43),
    createData('STUDY D', 356, 160, 49, 39),
];



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
                <Grid container spacing={3}>

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
                                                <TableCell align="right">{row.calories}</TableCell>
                                                <TableCell align="right">{row.fat}</TableCell>
                                                <TableCell align="right">{row.carbs}</TableCell>
                                                <TableCell align="right">{row.protein}</TableCell>
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

            </TabPanel>
            <TabPanel value={value} index={2}>
                Page Three
      </TabPanel>
        </div>
    );
}

