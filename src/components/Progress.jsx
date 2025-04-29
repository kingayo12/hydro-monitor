import React, { useEffect, useState, useRef } from "react";

const Progress = () => {
  const waterTempMin = 15;
  const waterTempMax = 30;
  const airTempMin = 20;
  const airTempMax = 35;

  function getRandomWaterTemp() {
    return Math.random() * (waterTempMax - waterTempMin) + waterTempMin;
  }

  function getRandomAirTemp() {
    return Math.random() * (airTempMax - airTempMin) + airTempMin;
  }

  const [percentage1, setPercentage1] = useState(getRandomWaterTemp());
  const [percentage2, setPercentage2] = useState(getRandomAirTemp());
  const [target1, setTarget1] = useState(getRandomWaterTemp());
  const [target2, setTarget2] = useState(getRandomAirTemp());

  const percentage1Ref = useRef(percentage1);
  const percentage2Ref = useRef(percentage2);

  useEffect(() => {
    percentage1Ref.current = percentage1;
  }, [percentage1]);

  useEffect(() => {
    percentage2Ref.current = percentage2;
  }, [percentage2]);

  useEffect(() => {
    const interval = setInterval(() => {
      // WATER TEMP
      let diff1 = target1 - percentage1Ref.current;
      let step1 = Math.sign(diff1) * Math.max(0.2, Math.abs(diff1) * 0.05);

      if (Math.abs(diff1) > 0.5) {
        const newVal = Math.min(65, Math.max(0, percentage1Ref.current + step1));
        percentage1Ref.current = newVal;
        setPercentage1(newVal);
      } else {
        setTarget1(getRandomWaterTemp());
      }

      // AIR TEMP
      let diff2 = target2 - percentage2Ref.current;
      let step2 = Math.sign(diff2) * Math.max(0.2, Math.abs(diff2) * 0.05);

      if (Math.abs(diff2) > 0.5) {
        const newVal = Math.min(80, Math.max(0, percentage2Ref.current + step2));
        percentage2Ref.current = newVal;
        setPercentage2(newVal);
      } else {
        setTarget2(getRandomAirTemp());
      }
    }, 100);

    return () => clearInterval(interval);
  }, [target1, target2]);

  return (
    <div className='strokes flex flex-wrap justify-center items-center gap-8 w-full min-h-[250px] p-4'>
      {/* Water Temperature */}
      <div className='strokes_wrapper flex flex-col sm:flex-row items-center justify-center gap-3 p-4 min-w-[250px] flex-1'>
        <div className='stroke1 rounded-full relative flex justify-center items-center m-2'>
          <div className='outer rounded-full'>
            <div className='inner rounded-full' style={{ "--progress": `${percentage1}%` }}>
              <div className='number text-sm md:text-base lg:text-xl'>
                {Math.round(percentage1)}°F
              </div>
            </div>
          </div>
          <svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' className='optsvg'>
            <defs>
              <linearGradient id='GradientColor'>
                <stop offset='0%' stopColor='#05ff05' />
                <stop offset='100%' stopColor='#008100' />
              </linearGradient>
            </defs>
            <circle
              cx='80'
              cy='80'
              r='70'
              strokeLinecap='round'
              className='progress-ring-circle'
              style={{ "--progress": `${percentage1}` }} // for stroke1
            />
          </svg>
        </div>
        <div className='st-content w-full sm:w-auto max-w-[200px] md:w-36 flex flex-col gap-2 items-start'>
          <div className='st-header text-sm font-semibold'>Water Temperature</div>
          <div className='st-details text-xs'>Temperature level Good</div>
        </div>
      </div>

      {/* Air Temperature */}
      <div className='strokes_wrapper flex flex-col sm:flex-row items-center justify-center gap-3 p-4 min-w-[250px] flex-1'>
        <div className='stroke2 rounded-full relative flex justify-center items-center m-2'>
          <div className='outer rounded-full'>
            <div className='inner rounded-full' style={{ "--progress": `${percentage2}%` }}>
              <div className='number text-sm md:text-base lg:text-xl'>
                {Math.round(percentage2)}°F
              </div>
            </div>
          </div>
          <svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' className='optsvg'>
            <defs>
              <linearGradient id='GradientColor'>
                <stop offset='0%' stopColor='#14004F' />
                <stop offset='100%' stopColor='#186679' />
              </linearGradient>
            </defs>
            <circle
              cx='80'
              cy='80'
              r='70'
              strokeLinecap='round'
              className='progress-ring-circle'
              style={{ "--progress": `${percentage1}` }} // for stroke1
            />
          </svg>
        </div>
        <div className='st-content w-full sm:w-auto max-w-[200px] md:w-36 flex flex-col gap-2 items-start'>
          <div className='st-header text-sm font-semibold'>Air Temperature</div>
          <div className='st-details text-xs'>Temperature level Good</div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
