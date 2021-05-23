import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import * as faceapi from 'face-api.js';

import { Player } from './components/player/Player';

function App() {
  const videoWidth = 480;
  const videoHeight = 640;
  const [initaiallizing, setInitaiallizing] = useState(false);
  const [moodDetection, setMoodDetection] = useState(false);
  var [expressioncatch, setExpressioncatch] = useState(String);
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
        console.warn('Error getting video stream from getUserMedia');
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
        var finalMood = '';

        for (var i = 0; i <= exp.length; i++) {
          if (getMaxValue === exp[i]) {
            finalMood = moods[i];
          }
        }

        return finalMood;
      });
      var mood = mood_return[0];
      console.log('mood return ', mood_return[0]);
      console.log('mood  ', mood);

      var selectedmood;
      if (mood_return[0] !== 'undefined' && moodDetection === true) {
        if (mood === 'happy') selectedmood = 'happy';
        else if (mood === 'neutral') selectedmood = 'neutral';
        else if (mood === 'sad') selectedmood = 'sad';
        else if (mood === 'surprised') selectedmood = 'surprised';
        else if (mood === 'angry') selectedmood = 'angry';
        else selectedmood = 'nomood';

        //console.log(moodDetection, 'mode dete');
        console.log('selected mood', selectedmood);
        // setExpressioncatch(expressioncatch,selectedmood);
        // console.log("set expression ", setExpressioncatch(selectedmood))
        [expressioncatch, setExpressioncatch] = selectedmood;
        console.log('state:', [expressioncatch, setExpressioncatch]);

        console.log('state exp:', expressioncatch);
      }
    }, 5000);
  };

  const clickHadler = () => {
    setMoodDetection(true);
    console.log('mood detection', moodDetection);
  };
  const clickHadler1 = () => {
    setMoodDetection(false);
    console.log('mood detection 1', moodDetection);
  };

  const WindowHadler = () => {
    return !moodDetection ? (
      <>
        <button
          style={{
            background: 'black',
            width: 200,
            height: 60,
            color: 'white',
          }}
          onClick={clickHadler}
        >
          Click here!
        </button>
        <h1>Catch my mood !!</h1>
      </>
    ) : (
      <>
        <button
          style={{
            background: 'black',
            width: 200,
            height: 60,
            color: 'white',
          }}
          onClick={clickHadler1}
        >
          Click here !
        </button>
        <h1>Catch Again my mood !!</h1>
        <Player expressions="s" />
      </>
    );
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
      <div>{WindowHadler()}</div>
    </div>
  );
}

export default App;
