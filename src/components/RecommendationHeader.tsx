
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Info, Check } from "lucide-react";

const RecommendationHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-start gap-4 mb-4 animate-fade-in">
      <div className="flex items-center gap-1.5">
        <Check className="h-4 w-4 text-green-500" />
        <span className="text-sm text-gray-600">Low Usage</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Info className="h-4 w-4 text-yellow-500" />
        <span className="text-sm text-gray-600">Moderate Usage</span>
      </div>
      <div className="flex items-center gap-1.5">
        <AlertTriangle className="h-4 w-4 text-red-500" />
        <span className="text-sm text-gray-600">High Usage</span>
      </div>
    </div>
  );
};

export default RecommendationHeader;
