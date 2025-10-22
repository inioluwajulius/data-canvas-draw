import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, BarChart4 } from "lucide-react";

export const ChartTypeSelector = ({ activeType, onTypeChange }) => {
  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-accent/5">
      <CardContent className="p-4">
        <div className="flex gap-2">
          <Button
            variant={activeType === "bar" ? "default" : "outline"}
            onClick={() => onTypeChange("bar")}
            className={`flex-1 ${
              activeType === "bar" 
                ? "bg-gradient-to-r from-primary to-primary-glow hover:opacity-90" 
                : "border-primary/20 hover:bg-primary/5"
            }`}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Bar Chart
          </Button>
          <Button
            variant={activeType === "histogram" ? "default" : "outline"}
            onClick={() => onTypeChange("histogram")}
            className={`flex-1 ${
              activeType === "histogram" 
                ? "bg-gradient-to-r from-primary to-primary-glow hover:opacity-90" 
                : "border-primary/20 hover:bg-primary/5"
            }`}
          >
            <BarChart4 className="w-4 h-4 mr-2" />
            Histogram
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
