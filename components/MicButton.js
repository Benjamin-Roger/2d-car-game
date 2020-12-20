import { useState } from "react";

import { Drawer, Fab } from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";

import { getSettings, setSettings } from "@/context/settingsControl";

const MicButton = () => {
  const { microphone, microphoneAuthorized } = getSettings();
  const setMicSettings = setSettings();

  return (
    <>
      {microphoneAuthorized ? (
        <Fab
          color="primary"
          aria-label="Toggle microphone"
          onClick={() =>
            setMicSettings({ type: "microphone", value: !microphone })
          }
        >
         { microphone ? <MicIcon /> : <MicOffIcon />}
        </Fab>
      ) : (
        false
      )}
    </>
  );
};

export default MicButton;
