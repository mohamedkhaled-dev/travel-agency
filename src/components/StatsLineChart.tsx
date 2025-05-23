"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts";

type StatsLineChartData = {
  label: string;
  value: number;
};

interface StatsLineChartProps {
  data: StatsLineChartData[];
  color?: string;
}

const StatsLineChart = ({ data, color }: StatsLineChartProps) => {
  const chartConfig = {
    visitors: {
      label: "Visitors",
      color: color,
    },
  } satisfies ChartConfig;

  return (
    <div className="h-24 w-full">
      <ChartContainer config={chartConfig} className="h-full w-full">
        <LineChart
          accessibilityLayer
          data={data}
          margin={{ left: -20, right: 5, top: 5, bottom: 5 }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tickMargin={4}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent hideLabel className="bg-white border-0" />
            }
          />
          <YAxis tickLine={false} axisLine={false} tickMargin={4} hide />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
};

export default StatsLineChart;
