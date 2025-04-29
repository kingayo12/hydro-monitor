import React, { useState, useEffect } from "react";
import { Droplets, Thermometer, Waves, Gauge, Leaf, Bell, RefreshCw } from "lucide-react";
import MetricCard from "../components/MetricCard";

const Dashboard = () => {
  const [sensorData, setSensorData] = useState({
    ph: [{ value: 6.5, unit: "" }],
    humidity: [{ value: 60, unit: "%" }],
    nutrient: [{ value: 1200, unit: "ppm" }],
    waterTemp: [{ value: 22, unit: "°C" }],
    airTemp: [{ value: 28, unit: "°C" }],
  });
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData((prevData) => ({
        ph: [{ ...prevData.ph[0], value: prevData.ph[0].value + (Math.random() * 0.4 - 0.2) }],
        humidity: [
          { ...prevData.humidity[0], value: prevData.humidity[0].value + (Math.random() * 10 - 5) },
        ],
        nutrient: [
          {
            ...prevData.nutrient[0],
            value: prevData.nutrient[0].value + (Math.random() * 200 - 100),
          },
        ],
        waterTemp: [
          {
            ...prevData.waterTemp[0],
            value: prevData.waterTemp[0].value + (Math.random() * 1 - 0.5),
          },
        ],
        airTemp: [
          { ...prevData.airTemp[0], value: prevData.airTemp[0].value + (Math.random() * 2 - 1) },
        ],
      }));
      setLastUpdated(new Date());
    }, 5000); // Changed to 5000 milliseconds (5 seconds)

    return () => clearInterval(interval);
  }, []);

  const getLatestReading = (dataKey) => {
    return sensorData[dataKey]?.[0];
  };

  const getStatus = (value, min, max) => {
    if (value === undefined) return "normal";
    if (value < min * 0.9 || value > max * 1.1) return "critical";
    if (value < min || value > max) return "warning";
    return "normal";
  };

  const phReading = getLatestReading("ph");
  const humidityReading = getLatestReading("humidity");
  const nutrientReading = getLatestReading("nutrient");
  const waterTempReading = getLatestReading("waterTemp");
  const airTempReading = getLatestReading("airTemp");

  return (
    <div className='animate-fade-in'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold text-gray-900'>System Dashboard</h1>
        <div className='flex items-center'>
          <span className='text-sm text-gray-500 mr-3'>
            Last updated: {lastUpdated.toLocaleTimeString()}
          </span>
          <button className='ml-2 flex items-center justify-center p-2 text-gray-600 hover:text-gray-900 bg-white rounded-full shadow-sm hover:shadow transition-all'>
            <Bell size={18} />
          </button>
        </div>
      </div>

      {/* Current Readings */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6'>
        <MetricCard
          title='pH Level'
          value={phReading?.value}
          unit={phReading?.unit}
          icon={<Droplets size={24} />}
          status={getStatus(phReading?.value, 5.5, 7.0)}
          min={5.5}
          max={7.0}
          timestamp={phReading?.timestamp}
        />
        <MetricCard
          title='Humidity'
          value={humidityReading?.value}
          unit={humidityReading?.unit}
          icon={<Waves size={24} />}
          status={getStatus(humidityReading?.value, 40, 80)}
          min={40}
          max={80}
          timestamp={humidityReading?.timestamp}
        />
        <MetricCard
          title='Nutrient Level'
          value={nutrientReading?.value}
          unit={nutrientReading?.unit}
          icon={<Leaf size={24} />}
          status={getStatus(nutrientReading?.value, 500, 1500)}
          min={500}
          max={1500}
          timestamp={nutrientReading?.timestamp}
        />
        <MetricCard
          title='Water Temperature'
          value={waterTempReading?.value}
          unit={waterTempReading?.unit}
          icon={<Thermometer size={24} />}
          status={getStatus(waterTempReading?.value, 18, 26)}
          min={18}
          max={26}
          timestamp={waterTempReading?.timestamp}
        />
        <MetricCard
          title='Air Temperature'
          value={airTempReading?.value}
          unit={airTempReading?.unit}
          icon={<Gauge size={24} />}
          status={getStatus(airTempReading?.value, 18, 30)}
          min={18}
          max={30}
          timestamp={airTempReading?.timestamp}
        />
      </div>
    </div>
  );
};

export default Dashboard;
