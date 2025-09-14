import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

export interface DataPoint {
  x: string;
  y: number;
}

interface DataInputProps {
  data: DataPoint[];
  onDataChange: (data: DataPoint[]) => void;
}

export const DataInput = ({ data, onDataChange }: DataInputProps) => {
  const [newX, setNewX] = useState("");
  const [newY, setNewY] = useState("");

  const addDataPoint = () => {
    if (!newX.trim() || !newY.trim()) {
      toast.error("Please enter both X and Y values");
      return;
    }

    const yValue = parseFloat(newY);
    if (isNaN(yValue)) {
      toast.error("Y value must be a number");
      return;
    }

    const newDataPoint: DataPoint = {
      x: newX.trim(),
      y: yValue,
    };

    onDataChange([...data, newDataPoint]);
    setNewX("");
    setNewY("");
    toast.success("Data point added!");
  };

  const removeDataPoint = (index: number) => {
    const newData = data.filter((_, i) => i !== index);
    onDataChange(newData);
    toast.success("Data point removed!");
  };

  const loadSampleData = () => {
    const sampleData: DataPoint[] = [
      { x: "Jan", y: 65 },
      { x: "Feb", y: 78 },
      { x: "Mar", y: 90 },
      { x: "Apr", y: 81 },
      { x: "May", y: 56 },
      { x: "Jun", y: 95 },
    ];
    onDataChange(sampleData);
    toast.success("Sample data loaded!");
  };

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-accent/5">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Data Input
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={loadSampleData}
            className="border-primary/20 hover:bg-primary/5"
          >
            Load Sample
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="x-value" className="text-sm font-medium">X Value (Label)</Label>
            <Input
              id="x-value"
              value={newX}
              onChange={(e) => setNewX(e.target.value)}
              placeholder="e.g., Jan, Category A"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="y-value" className="text-sm font-medium">Y Value (Number)</Label>
            <Input
              id="y-value"
              type="number"
              value={newY}
              onChange={(e) => setNewY(e.target.value)}
              placeholder="e.g., 100"
              className="mt-1"
            />
          </div>
        </div>
        
        <Button
          onClick={addDataPoint}
          className="w-full bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity"
          size="sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Data Point
        </Button>

        {data.length > 0 && (
          <div className="space-y-2 max-h-48 overflow-y-auto">
            <Label className="text-sm font-medium">Current Data Points</Label>
            {data.map((point, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-muted/50 rounded-md"
              >
                <span className="text-sm">
                  <span className="font-medium">{point.x}</span>: {point.y}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeDataPoint(index)}
                  className="h-7 w-7 p-0 hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};