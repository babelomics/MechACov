import React, { PureComponent } from 'react';
import { Grid } from '@material-ui/core';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ScatterChart, Scatter, BarChart, Bar
} from 'recharts';


const dataLineChart = [
    {
        name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
    },
    {
        name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
    },
    {
        name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
    },
    {
        name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
    },
    {
        name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
    },
    {
        name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
    },
    {
        name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
    },
];


const dataRadar = [
    {
        subject: 'Math', A: 120, B: 110, fullMark: 150,
    },
    {
        subject: 'Chinese', A: 98, B: 130, fullMark: 150,
    },
    {
        subject: 'English', A: 86, B: 130, fullMark: 150,
    },
    {
        subject: 'Geography', A: 99, B: 100, fullMark: 150,
    },
    {
        subject: 'Physics', A: 85, B: 90, fullMark: 150,
    },
    {
        subject: 'History', A: 65, B: 85, fullMark: 150,
    },
];


const dataScatter = [
    { x: 100, y: 200, z: 200 },
    { x: 120, y: 100, z: 260 },
    { x: 170, y: 300, z: 400 },
    { x: 140, y: 250, z: 280 },
    { x: 150, y: 400, z: 500 },
    { x: 110, y: 280, z: 200 },
];



const dataBar = [
    {
        name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
    },
    {
        name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
    },
    {
        name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
    },
    {
        name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
    },
    {
        name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
    },
    {
        name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
    },
    {
        name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
    },
];


export default class Prueba3 extends PureComponent {

    render() {
        return (
            <Grid container
                direction="row"
                justify="space-evenly"
                alignItems="center">
                <Grid item sm={3}>
                    <br></br>
                    <LineChart
                        width={500}
                        height={500}
                        data={dataLineChart}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeDasharray="5 5" />
                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" strokeDasharray="3 4 5 2" />
                    </LineChart>
                </Grid>
                <br></br>

                <Grid item sm={3}>
                    <RadarChart cx={300} cy={250} outerRadius={150} width={500} height={500} data={dataRadar}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis />
                        <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    </RadarChart>
                </Grid>
                <Grid item sm={3}>


                    <ScatterChart
                        width={400}
                        height={400}
                        margin={{
                            top: 20, right: 20, bottom: 20, left: 20,
                        }}
                    >
                        <CartesianGrid />
                        <XAxis type="number" dataKey="x" name="stature" unit="cm" />
                        <YAxis type="number" dataKey="y" name="weight" unit="kg" />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Scatter name="A school" data={dataScatter} fill="#8884d8" />
                    </ScatterChart>

                </Grid>
                <Grid item sm={3}>

                    <BarChart
                        width={500}
                        height={300}
                        data={dataBar}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                        barSize={20}
                    >
                        <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Bar dataKey="pv" fill="#8884d8" background={{ fill: '#eee' }} />
                    </BarChart>

                </Grid>
            </Grid>
        );
    }
}
