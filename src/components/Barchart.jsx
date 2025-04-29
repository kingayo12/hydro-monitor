import React from 'react';
import { Bar } from 'react-chartjs-2';

const Barchart = ({ startDate, endDate }) => {
  const soilPHData = {
    labels: generateDayLabels(startDate, endDate), // Dynamically generated day labels
    datasets: [
      {
        label: 'Soil pH Level',
        data: filterSoilPHData(startDate, endDate), // Filtered pH level data 
        backgroundColor: (context) => {
            const index = context.dataIndex;
            const date = new Date();
            const currentDay = date.getDate();
  
            // Check if the current bar represents the present day
            if (index + 1 === currentDay) {
              return 'rgba(0, 136, 12, 0.8)'; // Red background color for the present day
            } else {
              return 'rgba(0, 88, 109, 0.6)'; // Default background color for other bars
            }
          },
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Day of the Month',
        },
      },
      y: {
        title: {
          display: true,
          text: 'pH Level',
        },
        suggestedMin: 6.0, // Customize the y-axis minimum value if needed
        suggestedMax: 8.0, // Customize the y-axis maximum value if needed
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
    // Replace this with your actual soil pH level data
    const soilPHLevelData = [
        6.5, 6.8, 6.7, 7.0, 6.9, 6.6, 6.5, 6.8, 6.7, 7.0, 6.9, 6.6, 6.5, 6.8, 6.7,
        7.0, 6.9, 6.6, 6.5, 6.8, 6.7, 7.0, 6.9, 6.6, 6.5, 6.8, 6.7, 7.0, 6.5, 6.5, 
        7.5, 2.5, 6.5]; // Replace with your actual pH level data

    // Perform data filtering based on startDate and endDate
    // Assuming you have an array of pH level measurements with corresponding dates
    // Filter the data within the selected date range
    const filteredData = soilPHLevelData.filter((measurement, index) => {
      // Replace this with your actual date data for each pH level measurement
      const date = new Date(2023, 7, index + 1); // Example: August 1, 2023, to September 6, 2023
      return date >= new Date(startDate) && date <= new Date(endDate);
    });

    return filteredData;
  }

  return (
    <div>
      <Bar id='barchart' data={soilPHData} options={options} />
    </div>
  );
};

export default Barchart;
