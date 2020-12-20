import { useReducer, useContext, createContext } from "react";

export const SettingsContext = createContext();
export const SettingsDispatchContext = createContext();

const reducer = (state, action) => {
  try {
    return { ...state, [action.type]: action.value };
  } catch {
    throw new Error(`Unknown action: ${action.type}`);
  }
};

// Car physics

const initialSettings = {
  microphoneAuthorized:false,
  microphone: false,
};

export const SettingsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialSettings);

  return (
    <SettingsDispatchContext.Provider value={dispatch}>
      <SettingsContext.Provider value={state}>
        {children}
      </SettingsContext.Provider>
    </SettingsDispatchContext.Provider>
  );
};

export const getSettings = () => useContext(SettingsContext);
export const setSettings = () => useContext(SettingsDispatchContext);
