// Mock data for Delhi electricity demand forecasting

// Constants
export const LAST_ACTUAL_DATE = "2024-12-10"; // Last date for which we have actual data

// Generate historical data with both actual and predicted values
const generateHistoricalData = () => {
  const data = [];
  const startDate = new Date("2022-12-10"); // Starting 2 years before last actual date
  const endDate = new Date("2025-12-31"); // Including future predictions
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const isActualDataAvailable = currentDate <= new Date(LAST_ACTUAL_DATE);
    const baseValue =
      3000 + Math.sin((currentDate.getMonth() * Math.PI) / 6) * 1000; // Seasonal variation
    const dayVariation = Math.sin((currentDate.getDay() * Math.PI) / 3.5) * 200; // Weekly variation

    const actualValue = isActualDataAvailable
      ? Math.round(baseValue + dayVariation + (Math.random() - 0.5) * 400)
      : null;

    const predictedValue = Math.round(
      baseValue + dayVariation + (Math.random() - 0.5) * 600
    );

    data.push({
      date: currentDate.toISOString().split("T")[0],
      actual: actualValue,
      predicted: predictedValue,
      peakDemand: isActualDataAvailable
        ? Math.round(baseValue * 1.2 + Math.random() * 200)
        : null,
      peakDemandForecast: Math.round(baseValue * 1.2 + Math.random() * 300),
      lowestDemand: isActualDataAvailable
        ? Math.round(baseValue * 0.7 + Math.random() * 200)
        : null,
      lowestDemandForecast: Math.round(baseValue * 0.7 + Math.random() * 300),
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }
  return data;
};

// Generate 24-hour data for a specific date
export const generateHourlyData = (targetDate) => {
  const isActualDataAvailable =
    new Date(targetDate) <= new Date(LAST_ACTUAL_DATE);
  const baseValue = 3000;
  return Array.from({ length: 24 }, (_, hour) => {
    const timeVariation = Math.sin(((hour - 12) * Math.PI) / 12) * 1000; // Daily pattern
    const actualValue = isActualDataAvailable
      ? Math.round(baseValue + timeVariation + (Math.random() - 0.5) * 200)
      : null;

    return {
      hour,
      actual: actualValue,
      predicted: Math.round(
        baseValue + timeVariation + (Math.random() - 0.5) * 400
      ),
    };
  });
};

export const historicalData = generateHistoricalData();

// Current day's data
export const todaysDemandData = generateHourlyData(
  new Date().toISOString().split("T")[0]
);

// Alert templates
export const generateAlerts = (date) => {
  const dateObj = new Date(date);
  const isActualDataAvailable = dateObj <= new Date(LAST_ACTUAL_DATE);
  const peakHour = 14 + Math.floor(Math.random() * 3); // Peak between 2-4 PM

  return [
    {
      id: 1,
      type: "warning",
      message: `Peak demand ${
        isActualDataAvailable ? "observed" : "expected"
      } at ${peakHour}:00`,
      severity: "high",
    },
    {
      id: 2,
      type: "info",
      message: `High demand period ${
        isActualDataAvailable ? "recorded" : "forecasted"
      } between ${peakHour - 1}:00 - ${peakHour + 1}:00`,
      severity: "medium",
    },
    {
      id: 3,
      type: "tip",
      message:
        "Consider using heavy appliances during off-peak hours (11 PM - 5 AM)",
      severity: "low",
    },
  ];
};

export const energySourceBreakdown = {
  Coal: 45,
  Solar: 20,
  Wind: 15,
  Hydro: 12,
  Nuclear: 5,
  Other: 3,
};

export const alerts = [
  {
    id: 1,
    type: "warning",
    message: "Peak demand expected today at 3:00 PM",
    severity: "high",
  },
  {
    id: 2,
    type: "info",
    message: "High demand period forecasted between 2 PM - 4 PM",
    severity: "medium",
  },
  {
    id: 3,
    type: "tip",
    message:
      "Consider using heavy appliances during off-peak hours (11 PM - 5 AM)",
    severity: "low",
  },
];
