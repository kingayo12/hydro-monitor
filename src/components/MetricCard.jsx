import React from "react";

const statusConfig = {
  normal: {
    bg: "bg-green-50",
    border: "border-green-100",
    icon: "text-green-500",
    text: "text-green-700",
  },
  warning: {
    bg: "bg-yellow-50",
    border: "border-yellow-100",
    icon: "text-yellow-500",
    text: "text-yellow-700",
  },
  critical: {
    bg: "bg-red-50",
    border: "border-red-100",
    icon: "text-red-500",
    text: "text-red-700",
  },
};

const MetricCard = ({ title, value, unit, icon, status = "normal", min, max, timestamp }) => {
  const { bg, border, icon: iconColor, text } = statusConfig[status];

  return (
    <div
      className={`p-6 rounded-lg shadow-card transition-all duration-300 ease-in-out ${bg} border ${border} animate-fade-in hover:shadow-card-hover `}
    >
      <div className='flex justify-between items-start '>
        <div>
          <h3 className='text-gray-700 font-medium'>{title}</h3>
          <div className='mt-1 flex items-baseline'>
            <span className='text-2xl font-semibold'>{value.toFixed(1)}</span>
            <span className='ml-1 text-gray-500'>{unit}</span>
          </div>
          {min !== undefined && max !== undefined && (
            <div className='mt-1 text-xs text-gray-500'>
              Range: {min} - {max} {unit}
            </div>
          )}
          {timestamp && (
            <div className='mt-2 text-xs text-gray-500'>
              Updated: {new Date(timestamp).toLocaleTimeString()}
            </div>
          )}
        </div>
        <div className={`p-2 rounded-full ${iconColor}`}>{icon}</div>
      </div>

      {min !== undefined && max !== undefined && (
        <div className='mt-3'>
          <div className='bg-gray-200 h-1.5 rounded-full overflow-hidden '>
            <div
              className={`h-full rounded-full ${
                status === "normal"
                  ? "bg-green-500"
                  : status === "warning"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{
                width: `${Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100)}%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MetricCard;
