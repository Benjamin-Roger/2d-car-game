import { getCarSpecs } from "@/context/carSpecs";
import React, { useState, useEffect } from "react";

const Car = (props) => {
  const currentCar = getCarSpecs();

  return (
    <>
      <div {...props} className={`car ${currentCar.id}`}></div>
    </>
  );
};

export default Car;
