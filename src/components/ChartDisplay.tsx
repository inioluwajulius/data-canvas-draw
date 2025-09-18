import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataPoint } from "./DataInput";

interface ChartDisplayProps {
  data: DataPoint[];
  chartType: "bar" | "histogram";
}

export const ChartDisplay = ({ data, chartType }: ChartDisplayProps) => {
  // Generate colors for each bar
  const getBarColor = (index: number) => {
    const colors = [
      "hsl(var(--chart-primary))",
      "hsl(var(--chart-secondary))",
      "hsl(var(--chart-accent))",
      "hsl(262 60% 55%)",
      "hsl(200 80% 50%)",
      "hsl(320 80% 60%)",
    ];
    return colors[index % colors.length];
  };

  const processDataForHistogram = (validData: DataPoint[]) => {
    if (validData.length === 0) return [];

    // For histogram, we'll create bins based on Y values - using already filtered data
    const values = validData.map(d => d.y);
    const min = Math.min(...values);
    const max = Math.max(...values);
    
    // Handle edge case where all values are the same
    if (min === max) {
      return [{
        x: `${min}`,
        y: values.length,
        range: [min, min],
      }];
    }
    
    const binCount = Math.min(10, Math.max(3, Math.ceil(Math.sqrt(values.length))));
    const binSize = (max - min) / binCount;

    const bins = Array.from({ length: binCount }, (_, i) => ({
      x: `${(min + i * binSize).toFixed(1)}-${(min + (i + 1) * binSize).toFixed(1)}`,
      y: 0,
      range: [min + i * binSize, min + (i + 1) * binSize],
    }));

    // Use the already validated values array instead of accessing data points again
    values.forEach(value => {
      const binIndex = Math.min(binCount - 1, Math.floor((value - min) / binSize));
      bins[binIndex].y++;
    });

    return bins;
  };

  // Filter out invalid data points for both chart types
  const validData = data.filter(d => d && typeof d.y === 'number' && !isNaN(d.y) && d.x);
  const chartData = chartType === "histogram" ? processDataForHistogram(validData) : validData;
  const title = chartType === "bar" ? "Bar Chart" : "Histogram";

  if (validData.length === 0) {
    return (
      <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-accent/5">
        <CardContent className="flex items-center justify-center h-96">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary/20 to-primary-glow/20 rounded-full flex items-center justify-center">
              <BarChart className="w-8 h-8 text-primary" />
            </div>
            <p className="text-muted-foreground">Add data points to see your chart</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-accent/5">
      <CardHeader>
        <CardTitle className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="hsl(var(--chart-grid))"
                opacity={0.3}
              />
              <XAxis 
                dataKey="x" 
                tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis 
                tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Bar 
                dataKey="y" 
                radius={[4, 4, 0, 0]}
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(index)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};