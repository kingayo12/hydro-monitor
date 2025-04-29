import React, { useEffect, useRef, useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useAnimate, usePresence, motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Box = ({ setDashboardTitle }) => {
  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate();
  const boxRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true); // State for skeleton loading

  useEffect(() => {
    // Simulate loading delay (replace with your actual data fetching if needed)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Update the dashboard title based on the current location
    if (location.pathname === "/soilphlevel") {
      setDashboardTitle("Soilphlevel");
    } else if (location.pathname === "/settings") {
      setDashboardTitle("Settings");
    } else if (location.pathname === "/theme") {
      setDashboardTitle("Theme");
    } else if (location.pathname === "/") {
      setDashboardTitle("Logout");
    }
  }, [location, setDashboardTitle]);

  useEffect(() => {
    if (isPresent && !loading) {
      boxRefs.current.forEach((boxRef, index) => {
        animate(
          boxRef,
          { opacity: 1, x: 0, scale: 1 },
          {
            duration: 0.6,
            delay: 0.1 * index,
            easing: [0.17, 0.67, 0.83, 0.67],
          },
        );
      });
    } else if (!isPresent) {
      boxRefs.current.forEach((boxRef, index) => {
        animate(
          boxRef,
          { opacity: 0, x: -20, scale: 0.95 },
          {
            duration: 0.4,
            delay: 0.05 * index,
            easing: [0.32, 0, 0.67, 0],
          },
        ).then(() => {
          if (index === boxRefs.current.length - 1) {
            safeToRemove();
          }
        });
      });
    }
  }, [isPresent, safeToRemove, animate, loading]);

  const openSoilph = () => {
    navigate("/soilphlevel");
  };

  const openHumidity = () => {
    navigate("/humidity");
  };

  const openNutrient = () => {
    navigate("/nutrientlevel");
  };

  return (
    <div className='box-assigned grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 px-4 md:px-10 lg:px-20 py-3 md:py-5 w-full'>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          data-toggle='tooltip'
          title='double click '
          className='dashbg px-2 h-24 md:h-32 bg-white rounded-sm shadow-lg border cursor-pointer'
          ref={(ref) => (boxRefs.current[index] = ref)}
          data-index={index}
          onDoubleClick={index === 0 ? openSoilph : index === 1 ? openHumidity : openNutrient}
          initial={{ opacity: 0, x: 20, scale: 0.95 }}
          animate={{ opacity: loading ? 0.7 : 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -20, scale: 0.95 }}
          transition={{ duration: 0.6, delay: index * 0.1, ease: [0.17, 0.67, 0.83, 0.67] }}
        >
          {loading ? (
            <div className='flex flex-col justify-center items-center h-full w-full'>
              <Skeleton width={80} height={40} />
              <Skeleton width={100} height={20} className='mt-2' />
            </div>
          ) : (
            <div className='details flex justify-center items-center w-full h-full'>
              <div className='unassigned-num text-3xl md:text-5xl mr-2 md:mr-3'>
                {index === 0 ? "5.5" : index === 1 ? "70%" : "Good"}
              </div>
              <div className='unassined-context flex gap-1 md:gap-2 flex-col capitalize text-xs md:text-sm'>
                <div className='unassined-title text-black font-semibold'>
                  {index === 0 ? "PH Level" : index === 1 ? "Humidity" : "Nutrient Level"}
                </div>
                <div className='actions flex flex-row justify-center items-center'>
                  <div
                    className={`text-${index === 1 ? "red" : "green"}-600 mr-0.5 md:mr-1 text-sm`}
                  >
                    {index === 1 ? <FaArrowUp /> : <FaArrowDown />}
                  </div>
                  <div className='down'></div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default Box;
