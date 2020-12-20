import { useRef, useEffect, useState, useCallback } from "react";

// Desktop events listeners

const arrowKeys = {
  up: 38,
  down: 40,
  left: 37,
  right: 39,
};

const arrowKeysReverse = {
  38: "up",
  40: "down",
  37: "left",
  39: "right",
};

export const useKeys = () => {
  const [keysDown, setKeysDown] = useState({
    up: false,
    down: false,
    left: false,
    right: false,
  });

  const handleKeyDown = useCallback((e) => {
    const { keyCode } = e; // a conditional for up

    // onKeyDown event
    setKeysDown((previousPressedKeys) => {
      return { ...previousPressedKeys, [arrowKeysReverse[keyCode]]: true };
    });
  });

  const handleKeyUp = useCallback((e) => {
    const { keyCode } = e;
  
    // onKeyUp event
    setKeysDown((previousPressedKeys) => {
      return { ...previousPressedKeys, [arrowKeysReverse[keyCode]]: false };
    });

  });

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return function cleanup() {
      window.removeEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);
    };
  }, []);

  return keysDown;
};
