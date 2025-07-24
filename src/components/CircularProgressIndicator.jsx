// src/components/CircularProgress.jsx
import React from 'react';


export default function CircularProgressIndicator({
  value = 75,
  size = 100,
  trackColor = '#E5E7EB',
  progressColor = '#2E4A78'
}) {
  const strokeWidth = 10;
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  // Dash offset for remaining (100 - value)% of circumference
  const dashOffset = circumference * (1 - value / 100);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="transform -rotate-360"
    >
      {/* Track circle */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke={trackColor}
        strokeWidth={strokeWidth}
        fill="none"
      />
      {/* Progress circle */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke={progressColor}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
      />
      {/* Centered percentage text */}
      <text
        x={center}
        y={center}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={size * 0.2}
        fill={progressColor}
        className="font-inter font-semibold"
      >
        {`${value}%`}
      </text>
    </svg>
  );
}
