import React from 'react';
import { Line } from 'react-chartjs-2';

const Linechart2 = ({ startDate, endDate }) => {
  // Replace this data with your actual soil pH level data
  const soilPHData = {
    labels: generateDayLabels(startDate, endDate), // Dynamically generate day labels
    datasets: [
      {
        label: 'Humidity',
        data: filterSoilPHData(startDate, endDate), // Filtered pH level data
        fill: true,
        backgroundColor: "rgba(108, 2, 5, .1)",
        borderColor: 'rgba(108, 2, 20, 1)',
        pointBorderColor: 'transparent',
        borderWidth: 3,
        // tension: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    animation: {
      duration: 2000, //  duration of the animation in milliseconds
      easing: 'easeOutQuart' // easing function for the animation
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Day of the Month',
        },
        grid: {
            display: false
          },
      },
      y: {
        title: {
          display: true,
          text: 'Humidity in (%)',
        },
        suggestedMin: 10, // Customize the y-axis minimum value if needed
        suggestedMax: 100, // Customize the y-axis maximum value if needed
      },
    },
  };

  // Function to generate day labels dynamically
  function generateDayLabels(startDate, endDate) {
    // ... (your existing code for generating day labels)
    const start = new Date(startDate);
    const end = new Date(endDate);
    const labels = [];

    for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
      labels.push(`Day ${date.getDate()}`);
    }

    return labels;
  }

  // Function to filter soil pH level data based on selected date range
  function filterSoilPHData(startDate, endDate) {
    // actual soil pH level data
    const soilPHLevelData = [ 50, 52, 55, 58, 60, 62, 65, 63, 58, 55, 53, 52, 50, 48, 47, 46, 45, 43, 42, 40, 38, 37, 36, 34,
        33, 32, 30, 28, 27, 45, 23, 26, 27]; // Replace with your actual pH level data

    // Filter the data within the selected date range
    const filteredData = soilPHLevelData.filter((measurement, index) => {
      const date = new Date(2023, 7, index + 1); // Example: July 1, 2023, to July 6, 2023
      return date >= new Date(startDate) && date <= new Date(endDate);
    });

    return filteredData;
  }

  return (
    <div>
      <Line id='barchart' data={soilPHData} options={options} />
    </div>
  );
};

export default Linechart2;
