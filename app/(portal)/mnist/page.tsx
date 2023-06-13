'use client';

import { useEffect, useRef, useState } from 'react';
import * as ort from 'onnxruntime-web';
import { Tensor } from 'onnxruntime-web';
import Jimp from 'jimp';
import './mnist.css';

export default function Mnist() {
  const CANVAS_SIZE = 280;
  const CANVAS_SCALE = 0.5;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const session = useRef<ort.InferenceSession>();
  const [loading, setLoading] = useState<boolean>(false);
  const [predictions, setPredictions] = useState<any>([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const debounceRef = useRef<any>(undefined);
  // console.log('predictions', predictions);

  const initSession = async () => {
    setLoading(true);

    await ort.InferenceSession.create('./onnx_model.onnx', { executionProviders: ['webgl'], graphOptimizationLevel: 'all' });

    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    // const image = new Image();
    // image.src = './4.png';

    // image.addEventListener('load', () => {
    //   context.drawImage(image, 0, 0);
    // });
    // context.lineWidth = 28;
    // context.lineJoin = 'round';
    // context.font = '28px sans-serif';
    // context.textAlign = 'center';
    // context.textBaseline = 'middle';
    // context.fillStyle = '#fff';
    // context.fillText('Draw a number here...', CANVAS_SIZE / 2, CANVAS_SIZE / 2);
    // clearCanvas();

    // Set up event listeners
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
  };

  const endSession = async () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    canvas.removeEventListener('mousedown', startDrawing);
    canvas.removeEventListener('mousemove', draw);
    canvas.removeEventListener('mouseup', stopDrawing);
    canvas.removeEventListener('mouseout', stopDrawing);
    setLoading(false);
  };

  useEffect(() => {
    initSession();

    setLoading(false);

    // Cleanup code
    return () => {
      endSession();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startDrawing = (event: MouseEvent) => {
    isDrawing.current = true;
    draw(event);
  };

  const updatePredictions = async () => {
    onnxruntime();
  };

  const draw = (event: MouseEvent) => {
    if (!isDrawing.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    // const x = event.clientX - rect.left;
    // const y = event.clientY - rect.top;
    const CANVAS_SIZE = 280;
    const CANVAS_SCALE = 0.5;
    const x = event.offsetX / CANVAS_SCALE;
    const y = event.offsetY / CANVAS_SCALE;
    if (!context) return;

    // Drawing code
    // context.fillStyle = 'black';
    // context.strokeStyle = 'black';
    // context.lineWidth = 5;
    // context.lineCap = 'round';
    // context.fillRect(x, y, 20, 20);
    // context.lineWidth = 28;
    context.lineJoin = 'round';
    context.font = '28px sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    const radius = 15;
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fill();
    context.fillStyle = '#212121';
    context.fillRect(x - 10, y - 10, 15, 15);

    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      updatePredictions();
    }, 150);
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas || !context) return;

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    setPredictions([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.href = canvas!.toDataURL('image/png');
    link.download = 'canvas.png';
    link.click();
  };

  const onnxruntime = async () => {
    console.log('onnxruntime');
    async function loadImageFromPath(pngImage: string, width: number = 280, height: number = 280): Promise<Jimp> {
      // Use Jimp to load the image and resize it.
      const imageData = await Jimp.read(pngImage).then((imageBuffer: Jimp) => {
        return imageBuffer.resize(width, height);
      });

      return imageData;
    }

    function imageDataToTensor(image: Jimp, dims: number[]): Tensor {
      // 1. Get buffer data from image and create R, G, and B arrays.
      var imageBufferData = image.bitmap.data;
      const [redArray, greenArray, blueArray] = new Array(new Array<number>(), new Array<number>(), new Array<number>());

      // // 2. Loop through the image buffer and extract the R, G, and B channels
      // for (let i = 0; i < imageBufferData.length; i += 4) {
      //   redArray.push(imageBufferData[i]);
      //   greenArray.push(imageBufferData[i + 1]);
      //   blueArray.push(imageBufferData[i + 2]);
      //   // skip data[i + 3] to filter out the alpha channel
      // }

      // // 3. Concatenate RGB to transpose [224, 224, 3] -> [3, 224, 224] to a number array
      // const transposedData = redArray.concat(greenArray).concat(blueArray);

      // // 4. convert to float32
      // let i,
      //   l = transposedData.length; // length, we need this for the loop
      // // create the Float32Array size 3 * 224 * 224 for these dimensions output
      const float32Data = new Float32Array(dims[1] * dims[2] * dims[3]);
      // for (i = 0; i < l; i++) {
      //   float32Data[i] = transposedData[i] / 255.0; // convert to float
      // }
      // 5. create the tensor object from onnxruntime-web.
      const inputTensor = new Tensor('float32', float32Data, [313600]);
      return inputTensor;
    }

    const canvas = canvasRef.current;
    const context = canvas!.getContext('2d');
    // const pngImage = canvas!.toDataURL('image/png');
    const imgData = context!.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    // const imageDataJimp = await loadImageFromPath(pngImage);
    // console.log('Jimp imageData', imageDataJimp);

    const dims: number[] = [1, 4, 280, 280];
    // const imageTensor = imageDataToTensor(imageDataJimp, dims);
    const imageTensor = new Tensor('float32', new Float32Array(imgData.data), [313600]);
    // console.log('imageTensor ->', imageTensor);

    async function runSqueezenetModel(preprocessedData: any): Promise<void> {
      // Create session and set options. See the docs here for more options:
      //https://onnxruntime.ai/docs/api/js/interfaces/InferenceSession.SessionOptions.html#graphOptimizationLevel
      const session = await ort.InferenceSession.create('./onnx_model.onnx', { executionProviders: ['webgl'], graphOptimizationLevel: 'all' });
      // console.log('Inference session created');
      // Run inference and get results.
      // var [results, inferenceTime] =  await runInference(session, preprocessedData);
      // console.log('session', session);

      // create feeds with the input name from model export and the preprocessed data.
      const feeds: Record<string, ort.Tensor> = {};
      feeds[session.inputNames[0]] = preprocessedData;

      const outputData = await session.run(feeds);
      // console.log('session.inputNames[0]', session.outputNames[0]);
      // console.log('outputData', outputData[session.outputNames[0]].data);
      setPredictions(Array.prototype.slice.call(outputData[session.outputNames[0]].data));
      // console.log('settings predictions');
    }

    runSqueezenetModel(imageTensor);

    // // Download PNG
    // const dataUrl = await imageDataJimp.getBase64Async(Jimp.MIME_PNG);
    // const link = document.createElement('a');
    // link.href = dataUrl;
    // link.download = 'image.png'; // Set the desired file name and extension

    // // Simulate a click to trigger the download
    // link.click();

    // // Clean up by removing the temporary anchor element
    // link.remove();
  };

  const predictionBarHeight = (prediction: any) => {
    // console.log('predictionBarHeight', prediction);
    return `${prediction * 100}%`;
  };

  const backgroundColorBar = (prediction: any) => {
    const max = Math.max(...predictions);
    if (prediction === max) return `#00F0FF`;
    return '#E0E0E0';
  };

  if (loading) return <div>Loading...</div>;

  return (
    <main>
      <div className="flex flex-col items-center">Mnist</div>
      <div className="card elevation">
        <canvas ref={canvasRef} className="canvas elevation" id="canvas" width="280" height="280" />

        <div className="button" id="clear-button" onClick={clearCanvas}>
          CLEAR
        </div>

        <div className="button" id="download-button">
          <button onClick={handleDownload}>Download as PNG</button>
        </div>

        <div className="button" id="onnxruntime-button">
          <button onClick={onnxruntime}>Predict once</button>
        </div>

        <div className="predictions">
          {predictions.map((e: any, i: number) => (
            <div key={i} className="prediction-col">
              <div className="prediction-bar-container">
                <div className="prediction-bar" style={{ height: predictionBarHeight(e), backgroundColor: backgroundColorBar(e) }}></div>
              </div>
              <div className="prediction-number">{i}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
