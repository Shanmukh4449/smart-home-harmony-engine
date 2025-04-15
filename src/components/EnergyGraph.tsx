
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ApplianceOutput } from "@/utils/fuzzyLogic";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
  Cell
} from "recharts";

interface EnergyGraphProps {
  data: ApplianceOutput;
}

const EnergyGraph: React.FC<EnergyGraphProps> = ({ data }) => {
  const graphData = [
    { name: "AC", usage: data.ac, color: "#9b87f5" },
    { name: "Oven", usage: data.oven, color: "#F97316" },
    { name: "Refrigerator", usage: data.refrigerator, color: "#0EA5E9" },
    { name: "Fan", usage: data.fan, color: "#10B981" },
    { name: "Light", usage: data.light, color: "#FBBF24" }
  ];

  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg rounded-md border border-gray-200">
          <p className="font-semibold">{`${label}`}</p>
          <p className="text-sm">
            <span className="font-medium">Usage: </span>
            <span 
              className={`${
                payload[0].value! > 70 
                  ? "text-red-500" 
                  : payload[0].value! > 50 
                    ? "text-yellow-500" 
                    : "text-green-500"
              } font-semibold`}
            >
              {`${payload[0].value}%`}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full h-[400px] animate-fade-in">
      <CardContent className="p-4 h-full">
        <h2 className="text-lg font-semibold mb-4">Energy Usage by Appliance</h2>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart
            data={graphData}
            margin={{
              top: 20,
              right: 30,
              left: 0,
              bottom: 20,
            }}
            className="animate-fade-in"
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="name" tick={{ fill: '#6E59A5' }} />
            <YAxis 
              domain={[0, 100]} 
              label={{ value: 'Energy Usage (%)', angle: -90, position: 'insideLeft', fill: '#6E59A5' }} 
              tick={{ fill: '#6E59A5' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: "10px" }} />
            <Bar 
              dataKey="usage" 
              name="Energy Usage" 
              radius={[4, 4, 0, 0]} 
              barSize={40}
              fillOpacity={0.9}
              animationDuration={1000}
            >
              {graphData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default EnergyGraph;
