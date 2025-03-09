"use client"

import { TrendingUp } from "lucide-react"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useMemo, useState } from "react"

const chartConfig = {
  spending: {
    label: "Spending",
    color: "hsl(var(--chart-1))",
  },
  goal: {
    label: "Goal",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function SpendingGoalChart({ data, goalAmount }: any) {
    const [totalExpense, setTotalExpense] = useState(0)
    useEffect(() => {
        let total = 0
        const spend = data.filter((data: any) => data.required !== -1)
        for (let i = 0; i < spend.length; i++) {
            total += Math.abs((spend[i]).amount);
        }
        setTotalExpense(Number(total))
    }, [data])

    const chartData = useMemo(() => {
        const spendingAmount = totalExpense
        const GoalAmount = goalAmount
        console.log("ChartData calculation - spending:", totalExpense, "goal:", goalAmount);

        return [
            { name: "Collection", spending: Number(spendingAmount), goal: Number(GoalAmount) }
        ]

    }, [totalExpense, goalAmount])
    
    const percentOfGoal = chartData[0].goal === 0 
    ? 0 // Handle division by zero
    : (chartData[0].spending / chartData[0].goal) * 100;


    return (
        <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
            <CardTitle className="text-lg">Your Spending Goal Progress</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 items-center pb-0">
            <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square w-full max-w-[250px]"
            >
            <RadialBarChart
                data={chartData}
                endAngle={180}
                innerRadius={80}
                outerRadius={130}
            >
                <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
                />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                    content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                            <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) - 16}
                            className="fill-foreground text-2xl font-bold"
                            >
                            {(percentOfGoal).toFixed(2)}%
                            </tspan>
                            <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 4}
                            className="fill-muted-foreground"
                            >
                            left till spending goal
                            </tspan>
                        </text>
                        )
                    }
                    }}
                />
                </PolarRadiusAxis>
                <RadialBar
                dataKey="goal"
                stackId="a"
                cornerRadius={5}
                fill="hsl(var(--chart-2))"
                className="stroke-transparent stroke-2"
                />
                <RadialBar
                dataKey="spending"
                fill="hsl(var(--chart-1))"
                stackId="a"
                cornerRadius={5}
                className="stroke-transparent stroke-2"
                />
            </RadialBarChart>
            </ChartContainer>
        </CardContent>
        </Card>
    )
}
