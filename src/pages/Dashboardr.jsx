import React, { useEffect, useState } from "react";
import MasterLayout from "../Layouts/MasterLayout";
import LoadingAnimation from "../components/LoadingAnimation";
import Chart from "chart.js/auto";
import Box from "../components/Box";
import Progress from "../components/Progress";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [chart, setChart] = useState(null);
  const [user, setUser] = useState(null); // State to hold the authenticated user
  const navigate = useNavigate();
  const auth = getAuth();

  // Function to handle category change
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Function to handle priority change
  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false); // Set loading to false once auth state is determined
      if (!currentUser) {
        // Redirect to login page if user is not authenticated
        navigate("/"); // Assuming "/" is your login route
      }
    });

    return () => unsubscribe(); // Cleanup the listener
  }, [auth, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      // Simulate fetching data (you might fetch user-specific data from Firebase here)
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Reduced simulation time
      // setIsLoading(false); // Moved to onAuthStateChanged
    };

    // Only fetch data if the user is logged in
    if (user) {
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    if (!isLoading && user) {
      updateLineChart();
    }
  }, [isLoading, user, selectedCategory, priority, startDate, endDate]);

  // Function to update the line chart
  const updateLineChart = async () => {
    const initialData = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Ph value",
          data: [1, 6, 7, 7, 7, 4, 4, 5, 3, 5, 6, 5, 0],
          borderColor: "rgba(0, 136, 0, 1)",
          backgroundColor: "rgba(0, 136, 0, 0.8)",
          fill: true,
          pointBorderColor: "transparent",
          pointBorderWidth: 4,
          tension: 0.5,
        },
        {
          label: "Humidity",
          data: [10, 10, 12, 12, 11, 10, 8, 13, 13, 11, 14, 14, 0],
          borderColor: "rgba(10, 25, 250, 1)",
          backgroundColor: "rgba(10, 50, 260, 0.8)",
          fill: true,
          pointBorderColor: "transparent",
          tension: 0.5,
        },
        {
          label: "Nutrient Level",
          data: [20, 22, 21, 18, 2, 19, 20, 13, 13, 11, 14, 14, 20],
          borderColor: "rgba(142, 18, 230, 1)",
          backgroundColor: "rgba(142, 18, 230, 0.8)",
          fill: true,
          pointBorderColor: "transparent",
          tension: 0.5,
        },
      ],
    };
    // Function to filter the data based on selected options
    const filterData = async () => {
      let filteredData = { ...initialData };

      if (selectedCategory) {
        filteredData.datasets = filteredData.datasets.filter((dataset) =>
          dataset.label.toLowerCase().includes(selectedCategory.toLowerCase()),
        );
      }

      if (priority) {
        filteredData.datasets = filteredData.datasets.filter((dataset) =>
          dataset.label.toLowerCase().includes(priority.toLowerCase()),
        );
      }

      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);

      if (!isNaN(startDateObj.getTime()) && !isNaN(endDateObj.getTime())) {
        const startIndex = startDateObj.getMonth();
        const endIndex = endDateObj.getMonth();
        filteredData.labels = initialData.labels.slice(startIndex, endIndex + 1);
        filteredData.datasets.forEach((dataset) => {
          dataset.data = dataset.data.slice(startIndex, endIndex + 1);
        });
      }

      return filteredData;
    };

    // Function to render the chart
    const renderChart = async () => {
      const filteredData = await filterData();

      const chartOptions = {
        responsive: true,
        animation: {
          duration: 2000, // Set the duration of the animation in milliseconds
          easing: "easeOutQuart", // Set the easing function for the animation
        },
        interaction: {
          mode: "index",
          intersect: false,
        },
        stacked: false,
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            min: 2,
            max: 30,
            ticks: {
              stepSize: 2,
              callback: (value) => value,
            },
            title: {
              display: true,
              text: "Values",
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Plant Break down ",
            position: "top",
          },
        },
        datasets: {
          line: {
            pointRadius: 0, // disable for all `'line'` datasets
          },
        },
        elements: {
          point: {
            radius: 0, // default to disabled in all datasets
          },
        },
      };

      const ctx = document.getElementById("lineChart").getContext("2d");
      if (chart) {
        chart.data = filteredData;
        chart.update();
      } else {
        setChart(
          new Chart(ctx, {
            type: "line",
            data: filteredData,
            options: chartOptions,
          }),
        );
      }
    };

    renderChart();
  };

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <MasterLayout>
      <div className='dashboard flex flex-row px-8  h-full'>
        <div className='right-d w-full h-screen pt-14 ml-1 my-5 p-20'>
          <div className='user-name mb-5 flex flex-col ml-5'>
            <p className='text-[var(--small-color)]'>Hi There</p>
            <p className=' text-2xl font-bold'>{user ? user.displayName || user.email : "User"}</p>
          </div>
          <div className='dasboard_boxes'>
            <Box />
          </div>

          <Progress />
          <div className='two-boxes flex flex-row'>
            <div className='plant-activities flex flex-col'>
              <div className='plant-act-header flex flex-row justify-between'>
                <div className='header-tilte'>
                  <p>plant growth activity</p>
                </div>
                <div className='plant-days-btn'>
                  <button className=' w-20 rounded-2xl btn5'>weekly</button>
                </div>
              </div>
              <div className='plant-act-content flex flex-row'>
                <div className='seed-phase gap-2 mt-20 flex-1 flex flex-col justify-center items-center'>
                  <div className='phase-img'></div>
                  <div className='phase-content'>
                    <p className=' text-sm'>seed phase </p>
                    <p className='text-xs text-gray-400 text-center'>week 1</p>
                  </div>
                </div>
                <div className='vegetation-phase bl-2 flex-1 gap-2 mt-14 flex flex-col justify-center items-center'>
                  <div className='phase-img'></div>
                  <div className='phase-content'>
                    <p className=' text-sm'> vegetation </p>
                    <p className='text-xs text-gray-400 text-center'>week 2</p>
                  </div>
                </div>
                <div className='final growth bl-2 flex-1 gap-2 mt-6 flex flex-col justify-center items-center'>
                  <div className='phase-img'></div>
                  <div className='phase-content'>
                    <p className=' text-sm'>Final growth </p>
                    <p className='text-xs text-gray-400 text-center'>week 3</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='graph-rep w-full flex item-center justify-center px-4 '>
              <canvas id='lineChart'></canvas>
            </div>
          </div>
        </div>
        <div className='left-d w-96  wiet'>
          <div className='pics-filter'>1</div>
          <div className='filter flex flex-col gap-1'>
            <h3 className='text-xl font-semibold mb-6 border-b pb-3'>Filter Options</h3>

            {/* Category Filter */}
            <div className='p-2'>
              <label htmlFor='category' className='block text-sm font-medium text-gray-700 mb-2'>
                Category
              </label>
              <select
                id='category'
                value={selectedCategory}
                onChange={handleCategoryChange}
                className='block w-full rounded-lg border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500 p-2'
              >
                <option value=''>All</option>
                <option value='Ph'>Ph</option>
                <option value='Humidity'>Humidity</option>
                <option value='Nutrient'>Nutrient Level</option>
              </select>
            </div>

            {/* Priority Filter */}
            <div className='p-2'>
              <label htmlFor='priority' className='block text-sm font-medium text-gray-700 mb-2'>
                Priority
              </label>
              <select
                id='priority'
                value={priority}
                onChange={handlePriorityChange}
                className='block w-full rounded-lg border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2'
              >
                <option value=''>All</option>
                <option value='Ph'>Ph</option>
                <option value='Humidity'>Humidity</option>
                <option value='Nutrient'>Nutrient Level</option>
              </select>
            </div>

            {/* Date Range Filter */}
            <div className='p-2'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Date Range</label>
              <input
                type='date'
                id='start-date'
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className='block w-full mb-3 rounded-lg border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 p-2'
              />
              <input
                type='date'
                id='end-date'
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className='block w-full rounded-lg border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 p-2 mt-2'
              />
            </div>

            {/* Reset Button */}
            <div className='text-center'>
              <button
                className='btn2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out'
                onClick={() => {
                  setSelectedCategory("");
                  setPriority("");
                  setStartDate("");
                  setEndDate("");
                }}
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
};

export default Dashboard;
