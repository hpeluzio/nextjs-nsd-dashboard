'use client';

import { useRef, useState } from 'react';
import { IMAGE_URLS } from '@/app/utils/data/sample-image-urls';
import { inferenceSqueezenet } from '@/app/utils/predict';
import './onnxruntime.css';

interface Props {
  height: number;
  width: number;
}

const ImageCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  var image: HTMLImageElement;
  const [topResultLabel, setLabel] = useState('');
  const [topResultConfidence, setConfidence] = useState('');
  const [inferenceTime, setInferenceTime] = useState('');

  // Load the image from the IMAGE_URLS array
  const getImage = () => {
    var sampleImageUrls: Array<{ text: string; value: string }> = IMAGE_URLS;
    var random = Math.floor(Math.random() * (9 - 0 + 1) + 0);
    // console.log("sampleImageUrls[random]", sampleImageUrls[random]);
    return sampleImageUrls[random];
  };

  // Draw image and other  UI elements then run inference
  const displayImageAndRunInference = () => {
    // Get the image
    image = new Image();
    var sampleImage = getImage();
    image.src = sampleImage.value;
    console.log('image', image);
    // Clear out previous values.
    setLabel(`Inferencing...`);
    setConfidence('');
    setInferenceTime('');

    // Draw the image on the canvas
    const canvas = canvasRef.current;
    const ctx = canvas!.getContext('2d');
    image.onload = () => {
      console.log('ctx', ctx);
      ctx!.drawImage(image, 0, 0, 240, 240);
    };

    // Run the inference
    submitInference();
  };

  const submitInference = async () => {
    // Get the image data from the canvas and submit inference.
    var [inferenceResult, inferenceTime] = await inferenceSqueezenet(image.src);

    // Get the highest confidence.
    var topResult = inferenceResult[0];

    // Update the label and confidence
    setLabel(topResult.name.toUpperCase());
    setConfidence(topResult.probability);
    setInferenceTime(`Inference speed: ${inferenceTime} seconds`);
  };

  return (
    <div>
      <main>
        <button onClick={displayImageAndRunInference}>Run Squeezenet inference</button>
        <br />
        <div>
          <canvas ref={canvasRef} width={240} height={240} />
        </div>
        <div>
          {topResultLabel} - {topResultConfidence}
        </div>
        <div>inferenceTime:{inferenceTime}</div>
      </main>
    </div>
  );
};

export default ImageCanvas;
