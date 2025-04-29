import React from 'react'
import Chart from 'chart.js/auto';


const Linechart = () => {
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
    <div className=' w-52 h-52'>
       {/* <canvas id="lineChart" width="200px"></canvas> */}
    </div>
  )
}

export default Linechart
