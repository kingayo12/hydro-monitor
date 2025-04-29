import React, { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "../components/lib/Utils"; // Corrected import path
import { format, isSameDay } from "date-fns";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

const Calendar = ({ mode, selected, onSelect, onClose, initialFocus }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const containerRef = useRef(null);
  const firstDayRef = useRef(null);

  const days = [];
  const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  const startDate = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1 - monthStart.getDay(),
  );

  for (let i = 0; i < monthEnd.getDate() + monthStart.getDay(); i++) {
    const day = new Date(startDate.getFullYear(), startDate.getMonth(), i);
    days.push(day);
  }

  // Effects for handling focus
  useEffect(() => {
    if (initialFocus && firstDayRef.current) {
      firstDayRef.current.focus();
    }
  }, [initialFocus, currentMonth]);

  // Function to check if a day is within the selected range
  const isDateInRange = (day) => {
    if (mode === "range" && selected) {
      const { from, to } = selected;
      if (from && to) {
        return day >= from && day <= to;
      } else if (from) {
        return isSameDay(day, from);
      }
    } else if (mode === "single" && selected) {
      return isSameDay(day, selected);
    }
    return false;
  };

  const handleDayClick = (day) => {
    if (mode === "range") {
      if (!selected || !selected.from) {
        onSelect({ from: day, to: undefined });
      } else if (selected.from && !selected.to) {
        if (day < selected.from) {
          onSelect({ from: day, to: selected.from });
        } else {
          onSelect({ from: selected.from, to: day });
        }
      } else if (selected.from && selected.to) {
        onSelect({ from: day, to: undefined });
      }
    } else if (mode === "single") {
      onSelect(day);
    }
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (!containerRef.current) return;

      let target = e.target;

      if (target.classList.contains("day")) {
        const dayValue = parseInt(target.getAttribute("data-day") || "", 10);
        if (isNaN(dayValue)) return;

        let newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayValue);

        switch (e.key) {
          case "ArrowLeft":
            newDate = new Date(newDate.setDate(newDate.getDate() - 1));
            break;
          case "ArrowRight":
            newDate = new Date(newDate.setDate(newDate.getDate() + 1));
            break;
          case "ArrowUp":
            newDate = new Date(newDate.setDate(newDate.getDate() - 7));
            break;
          case "ArrowDown":
            newDate = new Date(newDate.setDate(newDate.getDate() + 7));
            break;
          case "Enter":
            handleDayClick(newDate);
            onClose();
            return;
          case "Escape":
            onClose();
            return;
          case "PageUp":
            newDate = new Date(newDate.setMonth(newDate.getMonth() - 1));
            break;
          case "PageDown":
            newDate = new Date(newDate.setMonth(newDate.getMonth() + 1));
            break;
          default:
            return;
        }
        setCurrentMonth(newDate);

        const newDayElement = containerRef.current.querySelector(
          `[data-day="${newDate.getDate()}"]`,
        );
        if (newDayElement) {
          newDayElement.focus();
        }

        e.preventDefault();
      }
    },
    [currentMonth, onClose, selected, mode],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div ref={containerRef} className='rounded-md border shadow-md p-3 bg-white'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-lg font-semibold'>{format(currentMonth, "MMMM")}</h2>
        <div className='flex items-center gap-2'>
          <Button
            variant='ghost'
            size='icon'
            onClick={() =>
              setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
            }
          >
            <ChevronLeft className='h-4 w-4' />
          </Button>
          <Button
            variant='ghost'
            size='icon'
            onClick={() =>
              setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
            }
          >
            <ChevronRight className='h-4 w-4' />
          </Button>
        </div>
      </div>
      <div className='grid grid-cols-7 gap-1'>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className='text-center text-xs font-medium text-gray-500'>
            {day}
          </div>
        ))}
        {days.map((day, index) => {
          const isSelected = isDateInRange(day);
          const isToday = isSameDay(day, new Date());
          const isOutOfMonth = day.getMonth() !== currentMonth.getMonth();
          return (
            <button
              key={index}
              ref={index === 0 ? firstDayRef : null}
              className={cn(
                "day aspect-square rounded-md text-sm",
                "transition-colors duration-200",
                "flex items-center justify-center",
                isToday && "bg-blue-500 text-white",
                isSelected && "bg-purple-500 text-white",
                !isOutOfMonth ? "text-gray-900" : "text-gray-400",
                "hover:bg-gray-100",
                "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2",
                "data-[disabled]:opacity-50 data-[disabled]:pointer-events-none",
              )}
              onClick={() => handleDayClick(day)}
              data-day={day.getDate()}
              disabled={isOutOfMonth}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};
Calendar.displayName = "Calendar";
export default Calendar;
