import React from "react";
import {
    ResponsiveContainer,
    AreaChart,
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
import { getMonthNameByOrder } from "../../utils/month-mapping";
import { TooltipContainerStyles } from "../../constants/tooltip-container-styles";

const RainFallAreaChart: React.FC = () => {
    return (
        <ChartCard heading="Melbourne 2019 monthly rainfall">
            <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={RAINFALL["2019"]} fontSize={14}>
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
                    <XAxis dataKey="month" tickFormatter={getMonthNameByOrder} />
                    <YAxis
                        unit="ml"
                        orientation="left"
                        width={35}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip
                        labelFormatter={getMonthNameByOrder}
                        cursor={false}
                        contentStyle={TooltipContainerStyles}
                    />
                    <Area
                        dataKey="rainfall"
                        name="Rainfall"
                        unit="ml"
                        type="basis"
                        fill="url(#rainGradient)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </ChartCard>
    );
};

export default RainFallAreaChart;
