
import React from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface RangeSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  icon?: React.ReactNode;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = "",
  icon,
}) => {
  return (
    <div className="w-full space-y-2 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon && <span className="text-smart-purple">{icon}</span>}
          <Label htmlFor={label} className="text-sm font-medium">
            {label}
          </Label>
        </div>
        <span className="text-sm font-medium text-smart-dark-purple">
          {value}
          {unit}
        </span>
      </div>
      <Slider
        id={label}
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={(vals) => onChange(vals[0])}
        className="py-1"
      />
    </div>
  );
};

export default RangeSlider;
