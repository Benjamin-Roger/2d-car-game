import React, { useEffect, useState, useRef } from "react";

import ControlButton from "@/components/ControlButton";

import { setMobileControls } from "@/context/mobileControls";

const MobileControls = () => {

  const setControls = setMobileControls();

  const handleTouchStart = (direction) => {

    setControls({
      type: "touch",
      value: direction,
    });
  };

  const handleTouchEnd = (direction) => {

    setControls({
      type: "untouch",
      value: direction,
    });
  };

  useEffect(() => {

    window.addEventListener('mouseup',() => {
      handleTouchEnd("down");
      handleTouchEnd("up");
      handleTouchEnd("right");
      handleTouchEnd("left");
    });


  },[])

  return (
    <>
      <div className="mobile-controls fixed bottom-0 left-0 w-full px-4 md:px-10 pb-8 md:pb-12 h-36 flex justify-between lg:justify-end">
        <div className="w-1/2 flex items-end justify-start lg:w-auto">
          <ControlButton
            action="go left"
            onTouchStart={() => handleTouchStart("left")}
            onTouchEnd={() => handleTouchEnd("left")}
            onMouseDown={() => handleTouchStart("left")}
            onMouseUp={() => handleTouchEnd("left")}
          />
          <ControlButton
            action="go right"
            onTouchStart={() => handleTouchStart("right")}
            onTouchEnd={() => handleTouchEnd("right")}
            onMouseDown={() => handleTouchStart("right")}
            onMouseUp={() => handleTouchEnd("right")}
          />
        </div>

        <div className="w-1/2 flex items-end justify-end lg:w-auto">
          <ControlButton
            action="decelerate"
            onTouchStart={() => handleTouchStart("down")}
            onTouchEnd={() => handleTouchEnd("down")}
            onMouseDown={() => handleTouchStart("down")}
            onMouseUp={() => handleTouchEnd("down")}
          />

          <ControlButton
            action="accelerate"
            styles={{
              transform: "translateY(30px)",
            }}
            onTouchStart={() => handleTouchStart("up")}
            onTouchEnd={() => handleTouchEnd("up")}
            onMouseDown={() => handleTouchStart("up")}
            onMouseUp={() => handleTouchEnd("up")}
          />
        </div>
      </div>
    </>
  );
};

export default MobileControls;
