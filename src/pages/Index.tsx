
import React, { useState, useEffect } from "react";
import RangeSlider from "@/components/RangeSlider";
import ApplianceCard from "@/components/ApplianceCard";
import RecommendationList from "@/components/RecommendationList";
import EnergyGraph from "@/components/EnergyGraph";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Thermometer, 
  Clock, 
  Battery, 
  Home, 
  BarChart3, 
  Wind,
  ChefHat,
  Square,
  Fan,
  Lightbulb
} from "lucide-react";
import { calculateApplianceUsage, getRecommendations, ApplianceOutput } from "@/utils/fuzzyLogic";

const Index = () => {
  // Input states
  const [temperature, setTemperature] = useState(25);
  const [timeOfDay, setTimeOfDay] = useState(12);
  const [energyUsage, setEnergyUsage] = useState(50);
  const [userPresence, setUserPresence] = useState(1);

  // UI states
  const [showGraph, setShowGraph] = useState(false);
  const [appliances, setAppliances] = useState<ApplianceOutput>({
    ac: 0,
    oven: 0,
    refrigerator: 0,
    fan: 0,
    light: 0
  });

  // Calculate appliance usages whenever inputs change
  useEffect(() => {
    const result = calculateApplianceUsage(
      temperature,
      timeOfDay,
      energyUsage,
      userPresence
    );
    setAppliances(result);
  }, [temperature, timeOfDay, energyUsage, userPresence]);

  // Generate recommendations
  const recommendations = getRecommendations(appliances);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8 pb-12 dashboard-gradient">
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-smart-purple to-smart-dark-purple bg-clip-text text-transparent animate-pulse-soft">
            Smart Home Energy Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Monitor and optimize your home's energy consumption with our intelligent dashboard
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <span className="inline-flex items-center rounded-md bg-smart-light-purple px-2 py-1 text-xs font-medium text-smart-dark-purple">
              <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-smart-purple animate-pulse"></span>
              Fuzzy Logic Powered
            </span>
            <span className="inline-flex items-center rounded-md bg-smart-green px-2 py-1 text-xs font-medium text-green-800">
              Energy Efficient
            </span>
            <span className="inline-flex items-center rounded-md bg-smart-yellow px-2 py-1 text-xs font-medium text-amber-800">
              Smart Controls
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Input Controls Column */}
          <div className="md:col-span-4 space-y-6">
            <Card className="overflow-hidden border-t-4 border-t-smart-purple shadow-md">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Home className="h-5 w-5 text-smart-purple" />
                  <span>Input Parameters</span>
                </h2>
                
                <div className="space-y-6">
                  <RangeSlider
                    label="Temperature"
                    value={temperature}
                    onChange={setTemperature}
                    min={0}
                    max={40}
                    step={1}
                    unit="°C"
                    icon={<Thermometer className="h-4 w-4" />}
                  />
                  
                  <RangeSlider
                    label="Time of Day"
                    value={timeOfDay}
                    onChange={setTimeOfDay}
                    min={0}
                    max={24}
                    step={1}
                    unit="h"
                    icon={<Clock className="h-4 w-4" />}
                  />
                  
                  <RangeSlider
                    label="Energy Usage"
                    value={energyUsage}
                    onChange={setEnergyUsage}
                    min={0}
                    max={100}
                    step={1}
                    unit="%"
                    icon={<Battery className="h-4 w-4" />}
                  />
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <Home className="h-4 w-4 text-smart-purple" />
                      <Label htmlFor="user-presence" className="text-sm font-medium">
                        User Presence
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Label htmlFor="user-presence" className={`text-sm ${userPresence === 0 ? 'font-semibold' : 'text-gray-500'}`}>
                        Absent
                      </Label>
                      <Switch 
                        id="user-presence" 
                        checked={userPresence === 1}
                        onCheckedChange={(checked) => setUserPresence(checked ? 1 : 0)}
                      />
                      <Label htmlFor="user-presence" className={`text-sm ${userPresence === 1 ? 'font-semibold' : 'text-gray-500'}`}>
                        Present
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Button 
              className="w-full bg-smart-purple hover:bg-smart-dark-purple transition-all duration-300 shadow-md hover:shadow-lg"
              onClick={() => setShowGraph(prev => !prev)}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              {showGraph ? "Hide Energy Graph" : "Show Energy Graph"}
            </Button>
          </div>
          
          {/* Results Column */}
          <div className="md:col-span-8 space-y-6">
            {/* Appliance Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <ApplianceCard 
                name="AC" 
                usage={appliances.ac} 
                icon={<Wind className="h-5 w-5" />}
                color="bg-smart-purple"
              />
              <ApplianceCard 
                name="Oven" 
                usage={appliances.oven} 
                icon={<ChefHat className="h-5 w-5" />}
                color="bg-orange-500"
              />
              <ApplianceCard 
                name="Refrigerator" 
                usage={appliances.refrigerator} 
                icon={<Square className="h-5 w-5" />}
                color="bg-blue-500"
              />
              <ApplianceCard 
                name="Fan" 
                usage={appliances.fan} 
                icon={<Fan className="h-5 w-5" />}
                color="bg-emerald-500"
              />
              <ApplianceCard 
                name="Light" 
                usage={appliances.light} 
                icon={<Lightbulb className="h-5 w-5" />}
                color="bg-amber-500"
              />
            </div>
            
            {/* Energy Graph (conditional) */}
            {showGraph && (
              <EnergyGraph data={appliances} />
            )}
            
            {/* Recommendations */}
            <RecommendationList recommendations={recommendations} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
