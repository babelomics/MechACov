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
import ChartCard from "./ui-lib/ChartCard/ChartCard";
import { RAINFALL } from "../data/melb-monthly-rainfall";
import { TEMPERATURE } from "../data/melb-monthly-temperature";
import { getMonthNameByOrder } from "../utils/month-mapping";
import { TooltipContainerStyles } from "../constants/tooltip-container-styles";

const RainFallTemperatureComposedChart: React.FC = () => {
  const data = RAINFALL["2019"].map((rainfall, index) => ({
    ...rainfall,
    temperature: TEMPERATURE["2019"][index].temperature
  }));

  return (
    <ChartCard heading="Melbourne 2019 monthly rainfall and temperature">
      <ResponsiveContainer width="100%" height={220}>
        <ComposedChart data={data} >
        {/* <ComposedChart data={data} fontSize={14}> */}
          <defs>
            <linearGradient id="rainGradient" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#3066BE88" />
              <stop offset="100%" stopColor="#3066BE" />
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
            yAxisId="left"
            dataKey="rainfall"
            unit="ml"
            orientation="left"
            width={35}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            yAxisId="right"
            dataKey="temperature"
            unit="°C"
            domain={["auto", "auto"]}
            orientation="right"
            width={35}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            // labelFormatter={getMonthNameByOrder}
            cursor={false}
            contentStyle={TooltipContainerStyles}
            itemStyle={{ paddingBottom: 0 }}
          />
          <Area
            yAxisId="left"
            dataKey="rainfall"
            name="Rainfall"
            type="basis"
            fill="url(#rainGradient)"
            unit="ml"
          />
          <Line
            yAxisId="right"
            dataKey="temperature"
            name="Temperature"
            type="basis"
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
