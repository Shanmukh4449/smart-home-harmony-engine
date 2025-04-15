
// Function to compute appliance values based on fuzzy logic rules
export type ApplianceOutput = {
  ac: number;
  oven: number;
  refrigerator: number;
  fan: number;
  light: number;
};

export type ApplianceRecommendation = {
  appliance: string;
  usage: number;
  recommendation: string;
};

// Simplified fuzzy logic calculation
export function calculateApplianceUsage(
  temperature: number,
  timeOfDay: number,
  energyUsage: number,
  userPresence: number
): ApplianceOutput {
  // Normalize inputs to 0-1 range for easier calculations
  const tempNorm = temperature / 40; // 0-40 range to 0-1
  const timeNorm = timeOfDay / 24; // 0-24 range to 0-1
  const energyNorm = energyUsage / 100; // 0-100 range to 0-1
  
  // AC - affected by temperature, energy usage, and user presence
  const acOutput = userPresence
    ? Math.min(100, (tempNorm * 100) - (energyNorm * 20))
    : 0;
  
  // Oven - affected by time of day, energy usage, and user presence
  let ovenOutput = 0;
  if (userPresence) {
    // Morning (0-12h) and afternoon (12-18h)
    if (timeOfDay >= 0 && timeOfDay <= 12) {
      ovenOutput = Math.min(100, (0.5 - energyNorm) * 120);
    } else if (timeOfDay > 12 && timeOfDay <= 18) {
      ovenOutput = Math.min(100, (0.7 - energyNorm) * 140);
    } else {
      // Night (18-24h)
      ovenOutput = Math.min(100, (0.3 - energyNorm) * 100);
    }
  }
  ovenOutput = Math.max(0, ovenOutput); // Ensure non-negative
  
  // Refrigerator - always on, but adjusts based on energy usage
  const refrigeratorOutput = Math.max(30, 100 - (energyNorm * 50));
  
  // Fan - affected by temperature and user presence
  const fanOutput = userPresence
    ? Math.min(100, (tempNorm * 120) - (energyNorm * 10))
    : 0;
  
  // Light - affected by time of day and user presence
  let lightOutput = 0;
  if (userPresence) {
    // Morning (5-10h): low
    if (timeOfDay >= 5 && timeOfDay <= 10) {
      lightOutput = 40;
    }
    // Afternoon (10-17h): medium
    else if (timeOfDay > 10 && timeOfDay <= 17) {
      lightOutput = 20;
    }
    // Evening/Night (17-23h): high
    else if (timeOfDay > 17 && timeOfDay <= 23) {
      lightOutput = 80;
    }
    // Late night/early morning (23-5h): medium-low
    else {
      lightOutput = 30;
    }
  }
  
  return {
    ac: Math.max(0, Math.round(acOutput)),
    oven: Math.max(0, Math.round(ovenOutput)),
    refrigerator: Math.max(0, Math.round(refrigeratorOutput)),
    fan: Math.max(0, Math.round(fanOutput)),
    light: Math.max(0, Math.round(lightOutput))
  };
}

export function getRecommendations(usages: ApplianceOutput): ApplianceRecommendation[] {
  const applianceNames = ["AC", "Oven", "Refrigerator", "Fan", "Light"];
  const usageValues = [usages.ac, usages.oven, usages.refrigerator, usages.fan, usages.light];
  
  return applianceNames.map((name, index) => {
    const usage = usageValues[index];
    let recommendation: string;
    
    if (usage > 70) {
      recommendation = `Consider reducing the usage of ${name} to save energy.`;
    } else if (usage > 50) {
      recommendation = `${name} is using a moderate amount of energy. Consider optimizing its usage.`;
    } else {
      recommendation = `${name} usage is low. Keep it up!`;
    }
    
    return {
      appliance: name,
      usage,
      recommendation
    };
  });
}
