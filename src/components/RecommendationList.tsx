
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ApplianceRecommendation } from "@/utils/fuzzyLogic";
import { Check, AlertTriangle, Info } from "lucide-react";

interface RecommendationListProps {
  recommendations: ApplianceRecommendation[];
}

const RecommendationList: React.FC<RecommendationListProps> = ({
  recommendations,
}) => {
  return (
    <div className="space-y-2 animate-fade-in">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">Energy Saving Recommendations</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-green-500" />
            <span className="text-xs text-gray-600">Low</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Info className="h-4 w-4 text-yellow-500" />
            <span className="text-xs text-gray-600">Moderate</span>
          </div>
          <div className="flex items-center gap-1.5">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <span className="text-xs text-gray-600">High</span>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        {recommendations.map((rec) => (
          <Card key={rec.appliance} className="overflow-hidden border-l-4 animate-fade-in transition-all hover:shadow-md"
            style={{
              borderLeftColor: rec.usage > 70 
                ? 'rgb(239, 68, 68)' 
                : rec.usage > 50 
                  ? 'rgb(234, 179, 8)' 
                  : 'rgb(34, 197, 94)'
            }}
          >
            <CardContent className="p-3 flex items-start gap-2">
              {rec.usage > 70 ? (
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
              ) : rec.usage > 50 ? (
                <Info className="h-5 w-5 text-yellow-500 mt-0.5 shrink-0" />
              ) : (
                <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
              )}
              <div>
                <span className="font-medium">{rec.appliance}: </span>
                <span className="text-gray-700 dark:text-gray-300">{rec.recommendation}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecommendationList;
