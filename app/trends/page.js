"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DemandChart from "../components/DemandChart";
import { historicalData } from "../data/mockData";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Helper function for consistent date formatting
const formatDate = (date) => {
  if (!date) return "";
  return date.toISOString().split("T")[0];
};

export default function TrendsPage() {
  const defaultStartDate = new Date();
  defaultStartDate.setDate(defaultStartDate.getDate() - 7);

  const [dateRange, setDateRange] = useState([defaultStartDate, new Date()]);

  // Filter data based on selected date range
  const filteredData = historicalData.filter((item) => {
    const itemDate = new Date(item.date);
    return (
      dateRange[0] &&
      dateRange[1] &&
      itemDate >= dateRange[0] &&
      itemDate <= dateRange[1]
    );
  });

  const barChartData = {
    labels: filteredData.map((d) => formatDate(new Date(d.date))),
    datasets: [
      {
        label: "Peak Demand Forecast",
        data: filteredData.map((d) => d.peakDemandForecast),
        backgroundColor: "rgba(56, 189, 248, 0.8)",
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "rgb(229, 231, 235)",
        },
      },
      title: {
        display: true,
        text: "Peak Demand Forecast Periods",
        color: "rgb(229, 231, 235)",
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: "rgba(229, 231, 235, 0.1)",
        },
        ticks: {
          color: "rgb(229, 231, 235)",
        },
      },
      x: {
        grid: {
          color: "rgba(229, 231, 235, 0.1)",
        },
        ticks: {
          color: "rgb(229, 231, 235)",
        },
      },
    },
  };

  const insights = [
    {
      title: "Peak Usage Forecast",
      description: "Highest demand expected between 2 PM - 4 PM",
    },
    {
      title: "Weekly Forecast",
      description: "Weekday demand predicted to be 20% higher than weekends",
    },
    {
      title: "Monthly Forecast",
      description: "June expected to show highest demand due to cooling needs",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-white/90">
          Demand Trends & Analysis
        </h1>

        {/* Filters */}
        <div className="card p-6 rounded-xl mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Date Range
              </label>
              <DatePicker
                selectsRange={true}
                startDate={dateRange[0]}
                endDate={dateRange[1]}
                onChange={(update) => setDateRange(update)}
                className="bg-slate-800 text-white p-2 rounded-lg border border-slate-700"
                dateFormat="yyyy-MM-dd"
              />
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="card p-6 rounded-xl">
            <DemandChart
              data={filteredData}
              title="Historical Demand Forecast Trends"
            />
          </div>
          <div className="card p-6 rounded-xl">
            <Bar options={barOptions} data={barChartData} />
          </div>
        </div>

        {/* Insights */}
        <div className="card p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Key Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {insights.map((insight, index) => (
              <div key={index} className="p-4 bg-slate-800 rounded-lg">
                <h3 className="font-semibold text-blue-400 mb-2">
                  {insight.title}
                </h3>
                <p className="text-gray-300">{insight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
