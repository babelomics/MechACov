import React from "react";
import {
    ResponsiveContainer,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Bar,
    Cell
} from "recharts";
import ChartCard from "../ui-lib/ChartCard/ChartCard";
import { AGE_GROUP } from "../../data/website-visit-age-group";
import { COLORS } from "../../constants/colors";
import { TooltipContainerStyles } from "../../constants/tooltip-container-styles";

const DemographicBarChart: React.FC = () => {
    return (
        <ChartCard heading="Website visit age group">
            <ResponsiveContainer width="100%" height={200}>
                {/* BarChart */}
                {/* CartesianGrid */}
                {/* XAxis */}
                {/* YAxis */}
                {/* Tooltip */}
                {/* Bar */}
                <div>Develop chart here</div>
            </ResponsiveContainer>
        </ChartCard>
    );
};

export default DemographicBarChart;
