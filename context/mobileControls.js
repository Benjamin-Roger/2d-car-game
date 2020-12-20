import { useReducer, useContext, createContext } from "react";

export const MobileDrivingContext = createContext();
export const MobileDrivingDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "touch":
      return {
        ...state,
        [action.value]: true,
      };
    case "untouch":
      return {
        ...state,
        [action.value]: false,
      };

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

const initialDirections = {
  up: false,
  down: false,
  left: false,
  right: false,
};

export const MobileDrivingContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialDirections);

  return (
    <MobileDrivingDispatchContext.Provider value={dispatch}>
      <MobileDrivingContext.Provider value={state}>
        {children}
      </MobileDrivingContext.Provider>
    </MobileDrivingDispatchContext.Provider>
  );
};

export const getMobileControls = () => useContext(MobileDrivingContext);
export const setMobileControls = () => useContext(MobileDrivingDispatchContext);

