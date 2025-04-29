import React from "react";

import { cn } from "../components/lib/Utils"; // Assuming you have a utility function for class names

const Button = React.forwardRef(({ className, variant, size, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
        variant === "outline" && "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100",
        variant === undefined && "bg-blue-500 text-white hover:bg-blue-600", // Default button style
        size === "icon" && "p-2 rounded-full",
        size === undefined && "px-4 py-2", // Default size
        className,
      )}
      {...props}
    >
      {props.children} {/* Render children */}
    </button>
  );
});
Button.displayName = "Button";

export default Button;
