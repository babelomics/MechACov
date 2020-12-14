import React from "react";
import {
    ResponsiveContainer,
    ComposedChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Area,
    Line
} from "recharts";
import ChartCard from "../ui-lib/ChartCard/ChartCard";
import { RAINFALL } from "../../data/melb-monthly-rainfall";
import { TEMPERATURE } from "../../data/melb-monthly-temperature";
import { getMonthNameByOrder } from "../../utils/month-mapping";
import { TooltipContainerStyles } from "../../constants/tooltip-container-styles";

const RainFallTemperatureComposedChart: React.FC = () => {
    const data = RAINFALL["2019"].map((rainfall, index) => ({
        ...rainfall,
        temperature: TEMPERATURE["2019"][index].temperature
    }));

    return (
        <ChartCard heading="Melbourne 2019 monthly rainfall and temperature">
            <ResponsiveContainer width="100%" height={220}>
                <ComposedChart data={data} fontSize={14}>
                    <defs>
                        <linearGradient id="rainGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3066BE" />
                            <stop offset="100%" stopColor="#3066BE22" />
                        </linearGradient>
                    </defs>
                    <CartesianGrid
                        vertical={false}
                        strokeDasharray="3 3"
                        stroke="#d6d9da"
                    />
                    <XAxis
                        dataKey="month"
                        tickFormatter={getMonthNameByOrder}
                        scale="point"
                    />
                    <YAxis
                        yAxisId="rainfall"
                        unit="ml"
                        orientation="left"
                        width={35}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        yAxisId="temperature"
                        unit="°C"
                        orientation="right"
                        domain={["auto", "auto"]}
                        width={35}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip
                        labelFormatter={getMonthNameByOrder}
                        cursor={false}
                        contentStyle={TooltipContainerStyles}
                        itemStyle={{ paddingBottom: 0 }}
                    />
                    <Area
                        yAxisId="rainfall"
                        dataKey="rainfall"
                        name="Rainfall"
                        unit="ml"
                        type="basis"
                        fill="url(#rainGradient)"
                    />
                    <Line
                        yAxisId="temperature"
                        dataKey="temperature"
                        name="Temperature"
                        type="monotone"
                        stroke="#EF5B5B"
                        fill="#EF5B5B"
                        unit="°C"
                    />
                    <Legend />
                </ComposedChart>
            </ResponsiveContainer>
        </ChartCard>
    );
};

export default RainFallTemperatureComposedChart;
