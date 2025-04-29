import React, { useEffect, useState, useRef } from "react";
import MasterLayout from "../../Layouts/MasterLayout";
import LoadingAnimation from "../LoadingAnimation";
// import SoilPhComponent from './SoilPhComponent';
import Linechart2 from "../Linechart2";

const Humiditymodal = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [newStatus, setnewStatus] = useState(true);
  const circleRef = useRef(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      //   setTicketData(data);
      setIsLoading(false);
    }, 3000);
  }, []);

  const [humiditymodal, sethumiditymodal] = useState(0);

  useEffect(() => {
    const targethumiditymodal = 50; // Set the target Humidity

    const interval1 = setInterval(() => {
      if (humiditymodal < targethumiditymodal) {
        sethumiditymodal(humiditymodal + 1); // Increment Humidity by 0.1 with one decimal place
        const circleElement = circleRef.current;
        if (circleElement) {
          if (humiditymodal < 45) {
            circleElement.setAttribute("stroke", "green");
            setnewStatus("low");
          } else if (humiditymodal > 75) {
            circleElement.setAttribute("stroke", "blue");
            setnewStatus("high");
          } else {
            circleElement.setAttribute("stroke", "#6d0000");
            setnewStatus("good"); // Default color for Humidity between 5.5 and 7.5
          }
        }
      } else {
        clearInterval(interval1);
      }
    }, 80); // Adjust the interval (in milliseconds) as per your requirement

    return () => {
      clearInterval(interval1);
    };
  }, [humiditymodal]);

  useEffect(() => {
    // Set the default start date to the first day of the current month
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    setStartDate(firstDayOfMonth.toISOString().slice(0, 10));

    // Set the default end date to the current date
    setEndDate(today.toISOString().slice(0, 10));
  }, []);

  return (
    <MasterLayout>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <div className=' flex flex-row  h-full'>
          <div className='right-d w-full h-screen pt-9 pl-5 my-5'>
            <div className='ph-level_header'>
              <h2 className='humidity-color text-1xl uppercase font-bold  my-5'>Humidity level</h2>
            </div>
            <div className='phlevel flex flex-row'>
              <div className='phlevel-box mx-2'>
                <div class='heade-phr text-center text-sm capitalize'>Humidity on current time</div>
                <div class='pH-value'>
                  <div className='stroke3  rounded-full  relative'>
                    <div className='outer rounded-full'>
                      <div className='inner  rounded-full'>
                        <div className='number capitalize'>{humiditymodal}</div>
                      </div>
                    </div>

                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      version='1.1'
                      width='160px'
                      height='160px'
                      className='optsvg'
                    >
                      <defs>
                        <linearGradient id='GradientColor'>
                          <stop offset='0%' stop-color='#14004F' />
                          <stop offset='100%' stop-color='#186679' />
                        </linearGradient>
                      </defs>
                      <circle
                        ref={circleRef}
                        cx='80'
                        cy='80'
                        r='70'
                        stroke='#6d0000'
                        stroke-linecap='round'
                      />
                    </svg>
                  </div>
                </div>
                <div class='status'>{newStatus}</div>
              </div>
              <div className='ph-level-data mx-2'>
                <Linechart2 startDate={startDate} endDate={endDate} />
              </div>
            </div>
          </div>
          <div className='left-d w-96 wiet'>
            <div className='pics-filter'></div>
            <div className='filter'>
              <div className='f-title pb-3 font-semibold capitalize px-5 py-1'>Filter</div>
              <div className='date-filter flex flex-col gap-3 px-5 py-2'>
                <label htmlFor='start-date'>Start Date: </label>
                <input
                  className='rounded py-1 px-2 bord5 focus:bg-slate-400'
                  type='date'
                  id='start-date'
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <label htmlFor='end-date'>End Date: </label>
                <input
                  className='rounded py-1 px-2 bord5 focus:bg-slate-400'
                  type='date'
                  id='end-date'
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div className='reset mt-5 px-5 py-5'>Reset Filters</div>
            </div>
          </div>
        </div>
      )}
    </MasterLayout>
  );
};

export default Humiditymodal;
