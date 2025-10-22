import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ChartDisplay = ({ data, chartType }) => {
  // Generate colors for each bar
  const getBarColor = (index) => {
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

  const processDataForHistogram = (validData) => {
    if (validData.length === 0) return [];

    // For histogram, we create bins based on Y values and count frequencies
    const values = validData.map(d => d.y);
    const min = Math.min(...values);
    const max = Math.max(...values);
    
    // Handle edge case where all values are the same
    if (min === max) {
      return [{
        x: `${min}`,
        y: values.length,
      }];
    }
    
    const binCount = Math.min(8, Math.max(4, Math.ceil(Math.sqrt(values.length))));
    const binSize = (max - min) / binCount;

    // Create bins with ranges as labels
    const bins = Array.from({ length: binCount }, (_, i) => {
      const start = min + i * binSize;
      const end = min + (i + 1) * binSize;
      return {
        x: `${start.toFixed(1)}-${end.toFixed(1)}`,
        y: 0,
        range: [start, end],
      };
    });

    // Count values that fall into each bin
    values.forEach(value => {
      let binIndex = Math.floor((value - min) / binSize);
      // Handle edge case where value equals max
      if (binIndex >= binCount) binIndex = binCount - 1;
      bins[binIndex].y++;
    });

    return bins;
  };

  // Filter out invalid data points for both chart types
  const validData = data.filter(d => d && typeof d.y === 'number' && !isNaN(d.y) && d.x);
  const chartData = chartType === "histogram" ? processDataForHistogram(validData) : validData;
  const title = chartType === "bar" ? "Bar Chart (Individual Values)" : "Histogram (Frequency Distribution)";
  const yAxisLabel = chartType === "bar" ? "Value" : "Frequency";

  if (validData.length === 0) {
    return (
      <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-accent/5">
        <CardContent className="flex items-center justify-center h-96">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary/20 to-primary-glow/20 rounded-full flex items-center justify-center">
              <BarChart className="w-8 h-8 text-primary" />
            </div>
            <p className="text-muted-foreground">Add data points to see your {chartType === "bar" ? "bar chart" : "histogram"}</p>
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
                label={{ 
                  value: yAxisLabel, 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle', fill: "hsl(var(--foreground))" }
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
                formatter={(value, name) => [
                  value, 
                  chartType === "histogram" ? "Frequency" : "Value"
                ]}
                labelFormatter={(label) => 
                  chartType === "histogram" ? `Range: ${label}` : `Category: ${label}`
                }
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
