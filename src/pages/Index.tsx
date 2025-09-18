import { useState } from "react";
import { DataInput, DataPoint } from "@/components/DataInput";
import { ChartDisplay } from "@/components/ChartDisplay";
import { ChartTypeSelector } from "@/components/ChartTypeSelector";
import { TrendingUp } from "lucide-react";

const Index = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [chartType, setChartType] = useState<"bar" | "histogram">("bar");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-primary to-primary-glow rounded-xl shadow-lg">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Chart Builder
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create beautiful bar charts and histograms from your data. Add data points and visualize them instantly.
          </p>
        </div>

        {/* Chart Type Selector */}
        <div className="max-w-md mx-auto mb-8">
          <ChartTypeSelector activeType={chartType} onTypeChange={setChartType} />
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Data Input Section */}
          <div className="lg:col-span-1">
            <DataInput data={data} onDataChange={setData} />
          </div>

          {/* Chart Display Section */}
          <div className="lg:col-span-2">
            <ChartDisplay data={data} chartType={chartType} />
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-card to-accent/5 p-6 rounded-xl shadow-lg border-0">
              <h3 className="text-xl font-semibold mb-3 text-primary">Bar Chart</h3>
              <p className="text-muted-foreground">
                Perfect for comparing different categories or groups. Each bar represents a data point with its label and value.
              </p>
            </div>
            <div className="bg-gradient-to-br from-card to-accent/5 p-6 rounded-xl shadow-lg border-0">
              <h3 className="text-xl font-semibold mb-3 text-primary">Histogram</h3>
              <p className="text-muted-foreground">
                Shows the distribution of your data by grouping values into bins. Great for understanding data patterns.
              </p>
            </div>
          </div>
        </div>

        {/* Attribution Section */}
        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-primary/10 to-primary-glow/10 p-4 rounded-lg border border-primary/20">
            <p className="text-sm text-muted-foreground">
              Created by Computer Science Student of{" "}
              <span className="font-semibold text-primary">Ladoke Akintola University of Technology (LAUTECH)</span>
              {" "}Class 27
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
