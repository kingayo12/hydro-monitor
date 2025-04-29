import React from 'react';
import Chart from 'chart.js/auto';

const acquisitions = () => {
    const chartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Data 1',
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
        },
        // Add more datasets if needed
      ],
    };

    const chartOptions = {
      // Configure chart options as per your requirements
    };

    const ctx = document.getElementById('lineChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: chartOptions,
    });
  

  return (
          // <div className="graph-option">
            <canvas id="lineChart"></canvas>
          // </div>   
  );
};

export default acquisitions;





// import Chart from 'chart.js/auto'

// (async function() {
//   const data = [
//     { year: 2010, count: 10 },
//     { year: 2011, count: 20 },
//     { year: 2012, count: 15 },
//     { year: 2013, count: 25 },
//     { year: 2014, count: 22 },
//     { year: 2015, count: 30 },
//     { year: 2016, count: 28 },
//   ];

//   new Chart(
//     document.getElementById('acquisitions'),
//     {
//       type: 'bar',
//       data: {
//         labels: data.map(row => row.year),
//         datasets: [
//           {
//             label: 'Acquisitions by year',
//             data: data.map(row => row.count)
//           }
//         ]
//       }
//     }
//   );
// })();
