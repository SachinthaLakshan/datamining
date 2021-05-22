import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import * as faceapi from 'face-api.js';

import { Player } from './components/player/Player';

function App() {
  const videoWidth = 480;
  const videoHeight = 640;
  const [initaiallizing, setInitaiallizing] = useState(false);
  const videoRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + '/models';
      setInitaiallizing(true);
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        //faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        //faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]).then(startVideo);
    };
    loadModels();
  }, []);
  const startVideo = () => {
    navigator.getUserMedia(
      { audio: false, video: true },

      (stream) => (videoRef.current.srcObject = stream),
      function () {
        console.warn('Error getting audio stream from getUserMedia');
      }
    );
  };

  const haddleVideoOnPlay = () => {
    setInterval(async () => {
      if (initaiallizing) {
        setInitaiallizing(false);
      }
      canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
        videoRef.current
      );
      const displaySize = {
        width: videoWidth,
        height: videoHeight,
      };
      faceapi.matchDimensions(canvasRef.current, displaySize);
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        //.withFaceLandmarks()
        .withFaceExpressions();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      // canvasRef.current
      //   .getContext('2d')
      //   .clearReact(0, 0, videoWidth, videoHeight);
      faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
      //faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);

      // console.log(faceapi.draw.drawFaceExpressions());
      // console.log(detections);

      const mood_return = detections.map((item) => {
        var exp = [
          item.expressions.happy,
          item.expressions.neutral,
          item.expressions.sad,
          item.expressions.surprised,
          item.expressions.angry,
        ];
        var getMaxValue = Math.max(...exp);
        var moods = ['happy', 'neutral', 'sad', 'surprised', 'angry'];
        var finalMood;

        for (var i = 0; i <= exp.length; i++) {
          if (getMaxValue === exp[i]) {
            finalMood = moods[i];
          }
        }
        return finalMood;
      });

      console.log('>>>>', mood_return);
    }, 5000);
  };
  return (
    <div className="App">
      <span>{initaiallizing ? 'initaiallizing' : 'ready'}</span>
      <div className="display-flex justify-content-center">
        <video
          ref={videoRef}
          autoPlay
          muted
          height={videoHeight}
          width={videoWidth}
          onPlay={haddleVideoOnPlay}
        />
        <canvas ref={canvasRef} className="position-absolute" />
      </div>
      <div>
        <Player />
      </div>
    </div>
  );
}

export default App;
