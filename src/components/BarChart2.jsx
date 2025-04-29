import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart2 = ({ startDate, endDate }) => {
  // Replace this data with your actual soil pH level data
  const nutrientlevelData = {
    labels: generateDayLabels(startDate, endDate), // Dynamically generate day labels
    datasets: [
      {
        label: 'Nutrientlevel',
        data: filternutrientleveldata(startDate, endDate), // Filtered pH level data
        fill: true,
        backgroundColor: "rgba(0, 0, 190, .1)",
        borderColor: 'rgba(0, 0, 220, 1)',
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
          text: 'nutrientlevel in (%)',
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
  function filternutrientleveldata(startDate, endDate) {
    // actual soil pH level data
    const nutrientleveldata = [15, 17, 18, 20, 22, 23, 25, 28, 30, 32, 33, 35, 36, 38, 40, 42, 43, 45, 47, 48, 50, 52, 53, 55, 56, 58, 60, 62, 65, 67, 70, 72, 17]; // Replace with your actual pH level data

    // Filter the data within the selected date range
    const filteredData = nutrientleveldata.filter((measurement, index) => {
      const date = new Date(2023, 7, index + 1); // Example: July 1, 2023, to July 6, 2023
      return date >= new Date(startDate) && date <= new Date(endDate);
    });

    return filteredData;
  }

  return (
    <div>
      <Bar id='barchart' data={nutrientlevelData} options={options} />
    </div>
  );
};

export default BarChart2;
