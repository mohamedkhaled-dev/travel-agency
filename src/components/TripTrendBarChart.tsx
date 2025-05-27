"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { ChartTooltipContent } from "@/components/ui/chart";

interface TripTrendData {
  travelStyle: string;
  count: number;
}

interface TripTrendBarChartProps {
  data: TripTrendData[];
}

const chartConfig = {
  count: {
    label: "Trips",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const TripTrendBarChart = ({ data }: TripTrendBarChartProps) => {
  return (
    <div className="space-y-8">
      <Card className="border-none shadow-sm bg-white">
        <CardHeader>
          <CardTitle className="text-center font-bold">
            Trips Trend 
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={data}
              layout="vertical"
              margin={{
                left: 5, 
                bottom: 30,
                top: 0,
                right: 5,
              }}
            >
              <CartesianGrid horizontal={false} />
              <XAxis
                type="number"
                dataKey="count"
                tickMargin={10}
                hide={false} 
                label={{
                  value: "Number of Trips",
                  position: "insideBottom",
                  offset: -20,
                  style: { textAnchor: "middle", fontWeight: "bold" },
                }}
              />
              <YAxis
                type="category"
                dataKey="travelStyle"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
                label={{
                  value: "Travel Style",
                  angle: -90,
                  position: "insideLeft",
                  style: { textAnchor: "middle", fontWeight: "bold" },
                }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    hideLabel
                    className="bg-white border-0"
                  />
                }
              />
              <Bar
                dataKey="count"
                fill="#6366f1"
                radius={[0, 10, 10, 0]}
                barSize={60}
              >
                <LabelList
                  dataKey="travelStyle"
                  position="insideLeft"
                  offset={8}
                  className="fill-white"
                  fontSize={10}
                  fontWeight={600}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};
export default TripTrendBarChart;
