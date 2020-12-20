import { useRef, useEffect, useState } from "react";

import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { useKeys } from "@/hooks/useKeys";
import { useVolume } from "@/hooks/useVolume";

import { getMobileControls } from "@/context/mobileControls";
import { getCarSpecs } from "@/context/carSpecs";
import { getSettings } from "@/context/settingsControl";

export const useCar = () => {
  // Set canvas context
  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);

  const { windowWidth, windowHeight } = useWindowDimensions(); //get initial dimensions

  // Get current pressed keys on mobile
  const MobileControlKeys = getMobileControls();

  // Get volume management value
  const { microphone } = getSettings();
  const volumeGas = useVolume();

  // Aggregate into single controls
  const keyActive = (key) => {
    if (key === "up" && volumeGas.reachThreshold && microphone) return true;
    return MobileControlKeys[key] || keysDown[key];
  };

  // Get current car specifications
  const {
    maxPower,
    maxReverse,
    powerFactor,
    reverseFactor,
    drag,
    angularDrag,
    turnSpeed,
    className,
  } = getCarSpecs();

  //   Set initial car value
  var initialCar = {
    styles: "",
    x: windowWidth / 2,
    y: windowHeight / 2,
    xVelocity: 0,
    yVelocity: 0,
    power: 0,
    reverse: 0,
    angle: 0,
    angularVelocity: 0,
    isThrottling: false,
    isReversing: false,
    isDrifting: false,
    highestDrift: 0,
    driftCounter: 0,
  };
  const [carAttrs, setCarAttrs] = useState(initialCar);

  // Canvas - Need resizing
  const [needResize, setNeedResize] = useState(true);

  // Get current pressed keys on desktop
  const keysDown = useKeys();

  // Car value update
  function driveCar(car) {
    const canTurn = car.power > 0.0025 || car.reverse;

    const pressingUp = keyActive("up");
    const pressingDown = keyActive("down");

    if (car.isThrottling !== pressingUp || car.isReversing !== pressingDown) {
      car.isThrottling = pressingUp;
      car.isReversing = pressingDown;
    }

    const turnLeft = canTurn && keyActive("left");
    const turnRight = canTurn && keyActive("right");

    if (car.isTurningLeft !== turnLeft) {
      car.isTurningLeft = turnLeft;
    }
    if (car.isTurningRight !== turnRight) {
      car.isTurningRight = turnRight;
    }

    updateCar(car);
  }

  function updateCar(car) {
    // Move the car

    if (car.x > windowWidth) {
      car.x -= windowWidth;
    } else if (car.x < 0) {
      car.x += windowWidth;
    }

    if (car.y > windowHeight) {
      car.y -= windowHeight;
    } else if (car.y < 0) {
      car.y += windowHeight;
    }

    if (car.isThrottling) {
      car.power += powerFactor * car.isThrottling;
    } else {
      car.power -= powerFactor / 2;
    }
    if (car.isReversing) {
      car.reverse += reverseFactor;
    } else {
      car.reverse -= reverseFactor;
    }

    car.power = Math.max(0, Math.min(maxPower, car.power));
    car.reverse = Math.max(0, Math.min(maxReverse, car.reverse));

    const direction = car.power > car.reverse ? 1 : -1;

    if (car.isTurningLeft) {
      car.angularVelocity -= direction * turnSpeed * car.isTurningLeft;
    }
    if (car.isTurningRight) {
      car.angularVelocity += direction * turnSpeed * car.isTurningRight;
    }

    car.xVelocity += Math.sin(car.angle) * (car.power - car.reverse);
    car.yVelocity += Math.cos(car.angle) * (car.power - car.reverse);

    car.x += car.xVelocity;
    car.y -= car.yVelocity;
    car.xVelocity *= drag;
    car.yVelocity *= drag;
    car.angle += car.angularVelocity;
    car.angularVelocity *= angularDrag;

    if (
      car.power < maxPower / 6 ||
      (car.power > maxPower / 8 && car.isReversing)
    ) {
      car.isDrifting = false;

      // Set max score
      if (car.driftCounter > car.highestDrift)
        car.highestDrift = car.driftCounter;
      car.driftCounter = 0;
    }

    if (car.power > maxPower / 6 || car.reverse) {
      if (
        (car.reverse > maxReverse * 0.9 || car.power > maxPower * 0.9) &&
        Math.abs(car.angularVelocity) < 0.1 * angularDrag
      ) {
        car.isDrifting = false;

        // Set max score
        if (car.driftCounter > car.highestDrift)
          car.highestDrift = car.driftCounter;

        car.driftCounter = 0;
      } else {
        car.isDrifting = true;

        // // add deceleration if the car is drifting
        // if (car.isDrifting && (car.isTurningLeft ?? car.isTurningRight))
        //   car.power -= (powerFactor * 6) / 5;

        car.driftCounter += 1 / 2;
      }
    }

    setCarAttrs({
      ...car,
      styles: `translate(${car.x}px, ${car.y}px) rotate(${
        (car.angle * 180) / Math.PI
      }deg)`,
    });
  }

  function update() {
    driveCar({ ...carAttrs });
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const renderCtx = canvas.getContext("2d");
    renderCtx.fillStyle = "rgba(0, 0, 0, 1)"; // tire marks color

    const handleResize = (e) => {
      setNeedResize(true);
    };

    if (needResize) {
      // Resize canvas to full window size
      canvas.width = windowWidth;
      canvas.height = windowHeight;

      setNeedResize(false);
    }

    // initial render
    if (canvasRef.current === undefined) {
      handleResize();
    }

    // Render tire marks on cavas
    function renderOnCanvas() {
      const { x, y, angle, isDrifting } = carAttrs;

      const prevImage = new Image();

      prevImage.onload = () => {
        prevImage.src = canvas.toDataURL();

        renderCtx.drawImage(prevImage, 0, 0);
      };

      if (isDrifting) {
        renderCtx.fillRect(
          // left wheel
          x -
            Math.cos(angle + (3 * Math.PI) / 2) * 4 +
            Math.cos(angle + (2 * Math.PI) / 2) * 4,
          y -
            Math.sin(angle + (3 * Math.PI) / 2) * 4 +
            Math.sin(angle + (2 * Math.PI) / 2) * 4,
          1,
          2
        );
        renderCtx.fillRect(
          // right wheel
          x -
            Math.cos(angle + (3 * Math.PI) / 2) * 4 +
            Math.cos(angle + (4 * Math.PI) / 2) * 4,
          y -
            Math.sin(angle + (3 * Math.PI) / 2) * 4 +
            Math.sin(angle + (4 * Math.PI) / 2) * 4,
          1,
          2
        );

        setContext(renderCtx);
      }
    }

    const interval = setInterval(() => {
      window.addEventListener("resize", handleResize);

      update();

      if (carAttrs.isDrifting) {
        renderOnCanvas();
      }
    }, 1000 / 60);

    return function cleanup() {
      clearInterval(interval);
    };
  }, [carAttrs]);

  return { car: carAttrs, canvasRef };
};





