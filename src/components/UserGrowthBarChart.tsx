// File: /components/UserGrowthBarChart.tsx

"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { ChartTooltipContent } from "@/components/ui/chart";

interface UserGrowthData {
  day: string;
  count: number;
}

interface UserGrowthBarChartProps {
  data: UserGrowthData[];
}

const chartConfig = {
  count: {
    label: "Users",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const UserGrowthBarChart = ({ data }: UserGrowthBarChartProps) => {
  return (
    <Card className="border-none shadow-sm bg-white">
      <CardHeader>
        <CardTitle className="text-center font-bold">User Growth</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              left: 5,
              bottom: 30,
              top: 0,
              right: 5,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => value}
              label={{
                value: "Days",
                position: "insideBottom",
                offset: -20,
                style: { textAnchor: "middle", fontWeight: "bold" },
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => value}
              label={{
                value: "Number of Users",
                angle: -90,
                position: "insideLeft",
                style: { textAnchor: "middle", fontWeight: "bold" },
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent hideLabel className="bg-white border-0" />
              }
            />
            <Bar
              dataKey="count"
              fill="#14b8a6"
              radius={[10, 10, 0, 0]}
              barSize={60}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default UserGrowthBarChart;
