
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LucideIcon } from "lucide-react";

interface ApplianceCardProps {
  name: string;
  usage: number;
  icon: React.ReactNode;
  color: string;
}

const ApplianceCard: React.FC<ApplianceCardProps> = ({
  name,
  usage,
  icon,
  color,
}) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg animate-slide-in card-glow border-t-2" 
      style={{ borderTopColor: color.replace("bg-", "").startsWith("smart") ? "#9b87f5" : color.replace("bg-", "") }}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div
              className={`p-2 rounded-full ${color} text-white`}
            >
              {icon}
            </div>
            <h3 className="font-medium">{name}</h3>
          </div>
          <span className="text-xl font-bold">{usage}%</span>
        </div>
        <Progress
          value={usage}
          className={`h-2 rounded-full ${
            usage > 70
              ? "bg-red-500/20"
              : usage > 50
              ? "bg-yellow-500/20"
              : "bg-green-500/20"
          }`}
          style={{
            ["--progress-foreground" as any]: usage > 70
              ? "rgb(239, 68, 68)"
              : usage > 50
              ? "rgb(234, 179, 8)"
              : "rgb(34, 197, 94)"
          }}
        />
      </CardContent>
    </Card>
  );
};

export default ApplianceCard;
