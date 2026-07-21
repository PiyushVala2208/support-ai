"use client";

import React from "react";

interface LoaderProps {
  size?: string;
  className?: string;
  light?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ size = "w-24 h-24", className = "", light = false }) => {
  const strokeColor = light ? "#ffffff" : "#000000";
  const ringBColor = light ? "#e4e4e7" : "#7e7e7e";
  const ringCColor = light ? "#a1a1aa" : "#686868";

  return (
    <svg
      viewBox="0 0 240 240"
      className={`pl ${size} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        strokeLinecap="round"
        strokeDashoffset="-330"
        strokeDasharray="0 660"
        strokeWidth="20"
        stroke={strokeColor}
        fill="none"
        r="105"
        cy="120"
        cx="120"
        className="pl__ring pl__ring--a"
      />
      <circle
        strokeLinecap="round"
        strokeDashoffset="-110"
        strokeDasharray="0 220"
        strokeWidth="20"
        stroke={ringBColor}
        fill="none"
        r="35"
        cy="120"
        cx="120"
        className="pl__ring pl__ring--b"
      />
      <circle
        strokeLinecap="round"
        strokeDasharray="0 440"
        strokeWidth="20"
        stroke={ringCColor}
        fill="none"
        r="70"
        cy="120"
        cx="85"
        className="pl__ring pl__ring--c"
      />
      <circle
        strokeLinecap="round"
        strokeDasharray="0 440"
        strokeWidth="20"
        stroke={strokeColor}
        fill="none"
        r="70"
        cy="120"
        cx="155"
        className="pl__ring pl__ring--d"
      />
    </svg>
  );
};

export default Loader;
