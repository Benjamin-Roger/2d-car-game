import { useReducer, useContext, createContext } from "react";

const cars = require("../data/cars.json");

export const CarSpecsContext = createContext();
export const CarSpecsDispatchContext = createContext();

const reducer = (state, action) => {
  try {
    return cars.find((c) => c.id == action.type);
  } catch {
    throw new Error(`Unknown action: ${action.type}`);
  }
};

// Car physics

const initialCar = cars.find((c) => c.id == 'sedan');

export const CarSpecsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialCar);

  return (
    <CarSpecsDispatchContext.Provider value={dispatch}>
      <CarSpecsContext.Provider value={state}>
        {children}
      </CarSpecsContext.Provider>
    </CarSpecsDispatchContext.Provider>
  );
};

export const getCarSpecs = () => useContext(CarSpecsContext);
export const setCarSpecs = () => useContext(CarSpecsDispatchContext);
