import React, { useState, useEffect } from "react";
import Button from "../components/Button"; // Import Button
import Calendar from "../components/Calendar"; // Import Calendar
//import { cn } from '../lib/utils'; // Import cn  -- No longer needed, in Button.js and Calendar.js
import { format } from "date-fns";

const DashboardLeft = ({ setStartDate, setEndDate, onResetFilters, startDate, endDate }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    from: startDate ? new Date(startDate) : undefined,
    to: endDate ? new Date(endDate) : undefined,
  });

  useEffect(() => {
    if (dateRange?.from) {
      setStartDate(format(dateRange.from, "yyyy-MM-dd"));
    } else {
      setStartDate("");
    }
    if (dateRange?.to) {
      setEndDate(format(dateRange.to, "yyyy-MM-dd"));
    } else {
      setEndDate("");
    }
  }, [dateRange, setStartDate, setEndDate]);

  const handleDateChange = (selectedDate) => {
    setDateRange(selectedDate);
  };

  const handleReset = () => {
    setDateRange(undefined); // Reset the date range state
    onResetFilters(); // Call the reset function passed from the parent
  };

  return (
    <div className='left-d w-full md:w-96'>
      <div className='pics-filter'>
        {/* You can add an image or other content here */}
        {/* Example: <img src="/path/to/your/image.jpg" alt="Filter" className="w-full h-auto" /> */}
      </div>
      <div className='filter bg-white rounded-lg shadow-md p-4'>
        <h2 className='f-title pb-3 font-semibold capitalize text-lg'>Filter</h2>

        <div className='date-filter space-y-4'>
          <label htmlFor='date-range' className='block text-sm font-medium text-gray-700'>
            Date Range
          </label>
          <div className='relative'>
            <Button
              id='date-range'
              variant={"outline"}
              className='w-full justify-start text-left font-normal' // Removed cn
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            >
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
            {isCalendarOpen && (
              <div className='absolute z-50 mt-2 w-full'>
                <Calendar
                  mode='range'
                  selected={dateRange}
                  onSelect={handleDateChange}
                  onClose={() => setIsCalendarOpen(false)}
                  initialFocus
                />
              </div>
            )}
          </div>
        </div>
        <Button
          variant='outline'
          onClick={handleReset}
          className='mt-6 w-full' // Removed cn
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default DashboardLeft;
