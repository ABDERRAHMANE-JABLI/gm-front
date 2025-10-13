"use client";
import React from "react";

type Props = {
  width?: number | string;
  height?: number | string;
  backgroundColor?: string;
  className?: string;
};


const ArtisanIcon: React.FC<Props> = ({width = 100, height = 100, backgroundColor="#D56913", className = ""}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 600 600"  fill="currentColor"  width={width}  height={height} aria-hidden="true">
      <path
        d="M168.75,0l262.5.27c93.2.1,168.75,75.69,168.75,168.85v262.38
        c0,93.16-75.55,168.6-168.75,168.5l-262.5-.27
        c-93.2-.1-168.75-75.69-168.75-168.85V168.5
        C0,75.35,75.55-.09,168.75,0Z"
        fill={backgroundColor}
      />
      <path
        d="M474.2,324.69c0,38.59-57.66,66.02-180.87,66.02s-180.66-27.43-180.66-66.02
        c0-42.5,38.59-76.02,95.54-92.75
        c4.16,29.35,2.34,59.24-5.34,87.87
        c55.56-21.39,41.38-95.77,41.38-95.77
        c13.32-2.02,26.75-3.19,40.22-3.49
        c8.47,32.62,7.9,66.94-1.63,99.26
        c57.2-24.87,41.15-98.1,41.15-98.1
        c14.66,1.25,29.2,3.65,43.48,7.2
        c5.31,30.27,3.72,61.34-4.65,90.9
        c45.1-15.81,43.24-77.88,43.24-77.88
        c41.62,18.32,68.15,47.43,68.15,82.77Z"
        fill="#FFFFFF"
      />
    </svg>
  );
};

export default ArtisanIcon;
