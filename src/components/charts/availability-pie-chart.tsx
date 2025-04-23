"use client";
import { Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { browser: "chrome", vehicles: 275, fill: "var(--color-chrome)" },
  { browser: "safari", vehicles: 200, fill: "var(--color-safari)" },
];
const chartConfig = {
  vehicles: {
    label: "Veículos",
  },
  chrome: {
    label: "Disponível",
    color: "var(--chart-2)",
  },
  safari: {
    label: "Indisponível",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;
export function AvailabilityPieChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Disponibilidade dos Veículos</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="vehicles" hideLabel />}
            />
            <Pie data={chartData} dataKey="vehicles" />
            <ChartLegend
              content={<ChartLegendContent nameKey="browser" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
