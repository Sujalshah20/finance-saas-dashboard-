"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface MetricCardProps {
  data: {
    title: string;
    value: string;
    trend: string;
    isPositive: boolean;
    chartData: { day: string; value: number }[];
    barData: { day: string; value: number }[];
  };
}

export function MetricCard({ data }: MetricCardProps) {
  const color = data.isPositive ? "#22C55E" : "#EF4444";

  return (
    <Card className="p-6 rounded-2xl shadow-sm border-slate-100 bg-white">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-slate-900 font-bold text-lg mb-2">{data.title}</h3>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-slate-900">{data.value}</span>
            <span className={cn("text-sm font-semibold", data.isPositive ? "text-green-500" : "text-red-500")}>
              {data.trend}
            </span>
          </div>
        </div>
        <div className="h-12 w-16 min-w-0 min-h-0">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
            <BarChart data={data.barData}>
              <Bar dataKey="value" fill={color} radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>


      <div className="h-32 mt-4 min-w-0 min-h-0">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
          <LineChart data={data.chartData}>
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={color} 
              strokeWidth={3} 
              dot={false}
            />
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: "#94a3b8" }} 
              dy={10}
            />
            <YAxis hide domain={['dataMin - 20', 'dataMax + 20']} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
