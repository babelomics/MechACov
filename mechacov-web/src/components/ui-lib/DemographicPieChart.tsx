import React from "react";
import { ResponsiveContainer, PieChart, Tooltip, Pie, Cell } from "recharts";
import ChartCard from "../ui-lib/ChartCard/ChartCard";
import { AGE_GROUP } from "../../data/website-visit-age-group";
import { COLORS } from "../../constants/colors";
import { TooltipContainerStyles } from "../../constants/tooltip-container-styles";
import { getMonthNameByOrder } from "../../utils/month-mapping";

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN) - 10;
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" fontSize={12} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const DemographicPieChart: React.FC = () => {
    return (
        <ChartCard heading="Website visit age group">
            <ResponsiveContainer width="100%" height={200}>
                <PieChart fontSize={14}>
                    <Tooltip
                        cursor={false}
                        contentStyle={TooltipContainerStyles}
                        formatter={(value, name) => [`${value}%`, `Age - ${name}`]}
                    />

                    <Pie
                        dataKey="percentage"
                        data={AGE_GROUP}
                        outerRadius={100}
                        innerRadius={40}
                        name="Percentage"
                        nameKey="age"
                        unit="%"
                        label={renderCustomizedLabel}
                        labelLine={false}
                    >
                        {AGE_GROUP.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </ChartCard>
    );
};

export default DemographicPieChart;
