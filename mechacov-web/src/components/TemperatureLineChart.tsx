import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line
} from "recharts";
import ChartCard from "./ui-lib/ChartCard/ChartCard";
import { TEMPERATURE } from "../data/melb-monthly-temperature";
import { getMonthNameByOrder } from "../utils/month-mapping";
import { TooltipContainerStyles } from "../constants/tooltip-container-styles";

const TemperatureLineChart: React.FC = () => {
  return (
    <ChartCard heading="Melbourne 2019 monthly temperature">
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={TEMPERATURE["2019"]} >
        {/* <LineChart data={TEMPERATURE["2019"]} fontSize={14}> */}
          <CartesianGrid
            vertical={false}
            strokeDasharray="3 3"
            stroke="#d6d9da"
          />
          <XAxis dataKey="month" tickFormatter={getMonthNameByOrder} />
          <YAxis
            unit="°C"
            domain={["auto", "auto"]}
            width={35}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            // labelFormatter={getMonthNameByOrder}
            cursor={false}
            contentStyle={TooltipContainerStyles}
          />
          <Line
            dataKey="temperature"
            name="Temperature"
            type="monotone"
            stroke="#EF5B5B"
            fill="#EF5B5B"
            unit="°C"
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default TemperatureLineChart;
