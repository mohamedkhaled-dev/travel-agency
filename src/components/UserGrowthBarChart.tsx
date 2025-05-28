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
        <CardTitle className="text-center font-bold text-lg sm:text-xl">
          User Growth
        </CardTitle>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <ChartContainer config={chartConfig} className="min-h-[280px] sm:min-h-[300px] w-full">
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              left: 5,
              bottom: 20,
              top: 0,
              right: 5,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
              label={{
                value: "Days",
                position: "insideBottom",
                offset: -10,
                style: {
                  textAnchor: "middle",
                  fontWeight: "bold",
                  fontSize: "12px",
                },
              }}
              className="text-xs sm:text-sm"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
              label={{
                value: "Number of Users",
                angle: -90,
                position: "insideLeft",
                style: {
                  textAnchor: "middle",
                  fontWeight: "bold",
                  fontSize: "12px",
                },
              }}
              className="text-xs sm:text-sm"
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
              barSize={40}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default UserGrowthBarChart;
