import React, { PureComponent } from 'react';
import { Grid } from '@material-ui/core';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ScatterChart, Scatter, BarChart, Bar
} from 'recharts';

import DemographicPieChart from "../../components/DemographicPieChart";
import DemographicBarChart from "../../components/DemographicBarChart";
import RainFallBarChart from "../../components/RainFallBarChart";
import TemperatureLineChart from "../../components/TemperatureLineChart";
import RainFallAreaChart from "../../components/RainFallAreaChart";
import RainFallTemperatureComposedChart from "../../components/RainFallTemperatureComposedChart";
import "../../styles.css";

// DATA
import { dataLineChart } from '../../data/dataLineChart';
import { dataRadar } from '../../data/dataRadar';
import { dataScatter } from '../../data/dataScatter';
import { dataBar } from '../../data/dataBar';

export default class Prueba3 extends PureComponent {

    render() {
        return (

            <div>
                <RainFallBarChart />
                <RainFallAreaChart />

                <TemperatureLineChart />

                <RainFallTemperatureComposedChart />

                <DemographicPieChart />
                <DemographicBarChart />

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
            </div>

        );
    }
}
