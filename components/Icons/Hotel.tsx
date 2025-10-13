"use client";
import React from "react";

type Props = {
  width?: number | string;
  height?: number | string;
  backgroundColor?: string;
};


const HotelIcon: React.FC<Props> = ({
  width = 64,
  height = 64,
  backgroundColor = "#354A99",
}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" fill="currentColor" width={width}  height={height} aria-hidden="true" >
      <path
        d="M168.75,0l262.5.27c93.2.1,168.75,75.69,168.75,168.85v262.38
        c0,93.16-75.55,168.6-168.75,168.5l-262.5-.27
        c-93.2-.1-168.75-75.69-168.75-168.85V168.5
        C0,75.35,75.55-.09,168.75,0Z"
        fill={backgroundColor}
      />

      <g fill="#FFFFFF">
        <path d="M476.26,350.4c-.46-62.93-51.55-113.74-114.48-113.85h-73.8c-6.14,0-11.12,4.99-11.12,11.13v92.54h-112.11v-153.07c0-6.14-4.98-11.13-11.13-11.13s-11.13,4.98-11.13,11.13v209.58c0,6.14,4.98,11.13,11.13,11.13s11.13-4.98,11.13-11.13v-34.26h123.27l165.99-.67v34.93c0,6.14,4.98,11.13,11.13,11.13s11.13-4.98,11.13-11.13h0v-46.33Z" />
        <path d="M252.63,284.39c0,18.42-14.93,33.35-33.35,33.35s-33.35-14.93-33.35-33.35,14.93-33.35,33.35-33.35,33.35,14.93,33.35,33.35Z" />
      </g>
    </svg>
  );
};

export default HotelIcon;
