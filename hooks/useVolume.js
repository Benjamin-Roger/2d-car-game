import { useState, useEffect } from "react";

import { getSettings, setSettings } from "@/context/settingsControl";

export function useVolume() {
  const [volume, setVolume] = useState(0);

  const setMicSettings = setSettings();

  let audioContext;
  let analyser;
  let microphone;
  let javascriptNode;

  useEffect(() => {
    if (navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: false })
        .then(function (stream) {
          setMicSettings({ type: "microphone", value: true });
          setMicSettings({ type: "microphoneAuthorized", value: true });

          audioContext = new AudioContext();
          analyser = audioContext.createAnalyser();
          microphone = audioContext.createMediaStreamSource(stream);
          javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

          analyser.smoothingTimeConstant = 0.8;
          analyser.fftSize = 1024;
          microphone.connect(analyser);
          analyser.connect(javascriptNode);
          javascriptNode.connect(audioContext.destination);
          javascriptNode.onaudioprocess = function () {
            var array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(array);
            var values = 0;

            var length = array.length;
            for (var i = 0; i < length; i++) {
              values += array[i];
            }

            var average = values / length;

            if (average > 5) {
              setVolume(Math.round(average, 2));
            }
          };
        })
        .catch(function (err) {
          /* handle the error */

          console.log(err);
        });
    }
  }, []);

  return { counter: volume, reachThreshold: volume > 30 };
}
