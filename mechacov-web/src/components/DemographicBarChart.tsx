import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Cell
} from "recharts";
import ChartCard from "./ui-lib/ChartCard/ChartCard";
import { AGE_GROUP } from "../data/website-visit-age-group";
import { COLORS } from "../constants/colors";
import { TooltipContainerStyles } from "../constants/tooltip-container-styles";
import { getMonthNameByOrder } from "../utils/month-mapping";

const DemographicBarChart: React.FC = () => {
  return (
    <ChartCard heading="Website visit age group">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart layout="horizontal" data={AGE_GROUP} >
        {/* <BarChart layout="horizontal" data={AGE_GROUP} fontSize={14}> */}
          <CartesianGrid
            vertical={false}
            strokeDasharray="3 3"
            stroke="#d6d9da"
          />
          <XAxis dataKey="age" tickLine={false} />
          <YAxis unit="%" width={35} axisLine={false} tickLine={false} />
          <Tooltip
            cursor={false}
            contentStyle={TooltipContainerStyles}
            labelFormatter={label => `Age: ${label}`}
          />
          <Bar dataKey="percentage" name="Percentage" fill="#007acc" unit="%">
            {AGE_GROUP.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default DemographicBarChart;
