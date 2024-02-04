import React, { Component } from "react";

import WheelComponent from "react-wheel-of-prizes";

const MapPicker = () => {
  const maps = [
    "SUNSET",
    "LOTUS",
    "PEARL",
    "FRACTURE",
    "BREEZE",
    "ICEBOX",
    "BIND",
    "HAVEN",
    "SPLIT",
    "ASCENT",
  ];
  const segColors = [
    "#815CD1",
    "#F0CF50",
    "#EE4040",
    "#34A24F",
    "#F9AA1F",
    "#EC3F3F",
    "#3DA5E0",
    "#FF9000",
  ];

  return (
    <div className="container flex justify-center items-center h-screen">
      <WheelComponent
        segments={maps}
        segColors={segColors}
        primaryColor="black"
        contrastColor="white"
        buttonText="Spin"
        isOnlyOnce={false}
        size={170}
        upDuration={200}
        downDuration={1000}
        fontFamily="Arial"
        className="canvas w-300 h-200 border border-black"
      />
    </div>
  );
};

export default MapPicker;
