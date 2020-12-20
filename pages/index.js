import Head from "next/head";
import { useEffect, useState } from "react";

import Snackbar from "@material-ui/core/Snackbar";

import Canvas from "@/components/Canvas";
import Car from "@/components/Car";
import MobileControls from "@/components/MobileControls";
import Layout from "@/components/Layout";

import { MobileDrivingContextProvider } from "@/context/mobileControls";
import { CarSpecsContextProvider } from "@/context/carSpecs";

import { useCar } from "@/hooks/useCar";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { useVolume } from "@/hooks/useVolume";
import { SettingsContextProvider } from "@/context/settingsControl";
import { getSettings } from "@/context/settingsControl";


function Game() {
  const { car, canvasRef } = useCar();
  const { windowHeight, windowWidth } = useWindowDimensions();

  const [snackScore, toggleSnackScore] = useState(false);
  const [snackVolume, toggleSnackVolume] = useState({
    value: false,
    firstTime: true,
  });

  const {microphone, microphoneAuthorized} = getSettings();
  const volume = useVolume();

  useEffect(() => {
    if (car.highestDrift > 10) toggleSnackScore(true);
  }, [car.highestDrift]);

  useEffect(() => {
    if (snackVolume.firstTime && microphone && microphoneAuthorized) {
      if (volume.reachThreshold)
        toggleSnackVolume({ value: true, firstTime: true });
    }
  }, [volume]);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0"
        ></meta>
      </Head>

      <main>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snackScore}
          onClose={() => toggleSnackScore(false)}
          onClick={() => toggleSnackScore(false)}
          autoHideDuration={6000}
          message={
            <p>
              <span className="font-bold">Best drift :</span>{" "}
              {Math.round(car.highestDrift)} meters
            </p>
          }
        />
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          color="primary"
          open={snackVolume.firstTime && snackVolume.value}
          onClose={() => toggleSnackVolume({ value: false, firstTime: false })}
          onClick={() => toggleSnackVolume({ value: false, firstTime: false })}
          autoHideDuration={6000}
          message={
            <>
              <p className="text-center">
                You've unlocked acceleration by shout. Keep it loud to go forward!
              </p>
            </>
          }
        />
        <Canvas
          canvasRef={canvasRef}
          className="canvas"
          width={windowWidth || 500}
          height={windowHeight || 500}
        />
        <Scene
          car={car}
          dimensions={{ height: windowHeight, width: windowWidth }}
        />
        <MobileControls />
      </main>
    </>
  );
}

const Scene = ({ car, dimensions }) => {
  return (
    <>
      <div className="scene">
        <Car style={{ transform: car.styles }} />
      </div>
    </>
  );
};

const GamePage = () => (
  <SettingsContextProvider>
    <CarSpecsContextProvider>
      <MobileDrivingContextProvider>
        <Layout>
          <Game />
        </Layout>
      </MobileDrivingContextProvider>
    </CarSpecsContextProvider>
  </SettingsContextProvider>
);

export default GamePage;
