import Link from "next/link";

import { getCarSpecs, setCarSpecs } from "@/context/carSpecs";

import { teal, blueGrey } from "@material-ui/core/colors";

const cars = require("../data/cars.json");

const cleanName = (string) =>
  string
    .trim()
    .toLowerCase()
    .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));

const CarSelector = () => {
  const currentCar = getCarSpecs();
  const pickCar = setCarSpecs();

  const handleSelect = (car) => {
    pickCar({ type: car.id });
  };

  return (
    <>
      <div className="container px-3 text-center">
        <h2 className="text-2xl font-bold">Pick a car</h2>
        <hr className="w-24 mx-auto my-5 shadow-sm"  style={{ borderColor: teal[700] }} />
        <div className="flex gap-10 justify-center flex-wrap">
          {cars.map((car) => (
            <button
              key={car.id}
              className={`car-button p-3 py-5 h-24 shadow-sm rounded w-full grid grid-cols-2 items-center overflow-hidden ${
                currentCar.id == car.id ? "shadow-xl" : false
              }`}
              style={{ background: blueGrey[50] }}
              onClick={() => handleSelect(car)}
            >
              <p className="text-xl font-bold">{cleanName(car.longName)}</p>
              <div className="relative flex justify-center ">
                <img
                  src={`/images/${car.className}.png`}
                  title={cleanName(car.longName)}
                  alt={cleanName(car.longName)}
                  className="h-30 absolute top-0 duration-150"
                />
              </div>
            </button>
          ))}
        </div>
      </div>
      <style jsx>
        {`
          .car-button:hover img {
            top: -15px;
          }
        `}
      </style>
    </>
  );
};

export default CarSelector;
