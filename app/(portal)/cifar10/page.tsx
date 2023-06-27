'use client';

import { useEffect, useRef, useState } from 'react';
import * as ort from 'onnxruntime-web';
import { Tensor } from 'onnxruntime-web';
import { useInputIImage } from '@/app/hooks/useInputImage';
import * as Jimp from 'jimp';
import { result } from 'lodash';

export default function Cifar10() {
  const { handleFiles, imageContainerRef, resetSelection } = useInputIImage();
  const [predictions, setPredictions] = useState<any>([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  console.log('predictions', predictions);
  const [session, setSession] = useState<ort.InferenceSession | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);
  const CATEGORIES = ['airplane', 'automobile', 'bird', 'cat', 'deer', 'dog', 'frog', 'horse', 'ship', 'truck'];

  const initSession = async () => {
    const newOrtSession = await ort.InferenceSession.create('./cifar10_onnx_mnist.onnx', { executionProviders: ['webgl'], graphOptimizationLevel: 'all' });
    setSession(newOrtSession);
  };

  useEffect(() => {
    initSession();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updatePredictions = async () => {
    const canvas = canvasRef.current;
    const context = canvas!.getContext('2d');

    const src = imageContainerRef!.current!.querySelector('img')!.src;
    const img = new Image();
    img.src = src;

    context!.drawImage(img, 0, 0, 320, 320);

    // Testing
    if (!imageContainerRef) return;
    const imageSrc = imageContainerRef!.current!.querySelector('img')!.src;
    console.log('imageSrc', imageSrc);

    var imageData = await Jimp.default.read(imageSrc).then((imageBuffer: Jimp) => {
      return imageBuffer.resize(32, 32);
    });

    var imageBufferData = imageData.bitmap.data;
    const [redArray, greenArray, blueArray] = new Array(new Array<number>(), new Array<number>(), new Array<number>());

    // 2. Loop through the image buffer and extract the R, G, and B channels
    for (let i = 0; i < imageBufferData.length; i += 4) {
      redArray.push(imageBufferData[i]);
      greenArray.push(imageBufferData[i + 1]);
      blueArray.push(imageBufferData[i + 2]);
      // skip data[i + 3] to filter out the alpha channel
    }
    // 3. Concatenate RGB to transpose [224, 224, 3] -> [3, 224, 224] to a number array
    const transposedData = redArray.concat(greenArray).concat(blueArray);

    // 4. convert to float32
    let l = transposedData.length; // length, we need this for the loop
    // create the Float32Array size 3 * 224 * 224 for these dimensions output
    const float32Data = new Float32Array(3 * 32 * 32);
    for (let i = 0; i < l; i++) {
      float32Data[i] = transposedData[i] / 255.0; // convert to float
    }
    console.log('float32Data', float32Data);
    const imageTensor = new Tensor('float32', new Float32Array(float32Data), [1, 3, 32, 32]);
    // const imageTensor = new Tensor('float32', new Float32Array(imageData.bitmap.data), [1 * 3 * 32 * 32]);
    console.log('imageTensor', imageTensor);
    const feeds: Record<string, ort.Tensor> = {};
    feeds[session!.inputNames[0]] = imageTensor;
    const outputData = await session!.run(feeds);
    console.log('outputData', outputData);
    setPredictions(softmax(Array.prototype.slice.call(outputData[session!.outputNames[0]].data)));
  };

  const softmax = (resultArray: number[]): any => {
    // Get the largest value in the array.
    const largestNumber = Math.max(...resultArray);
    // Apply exponential function to each result item subtracted by the largest number, use reduce to get the previous result number and the current number to sum all the exponentials results.
    const sumOfExp = resultArray.map((resultItem) => Math.exp(resultItem - largestNumber)).reduce((prevNumber, currentNumber) => prevNumber + currentNumber);
    //Normalizes the resultArray by dividing by the sum of all exponentials; this normalization ensures that the sum of the components of the output vector is 1.
    return resultArray.map((resultValue, index) => {
      return Math.exp(resultValue - largestNumber) / sumOfExp;
    });
  };

  // console.log(softmax([2.8755, 8.5021, -2.4129, -2.9235, -4.1324, -7.1361, -1.6027, -6.9043, 3.3541, 6.5398]));

  const result = () => {
    // console.log('Max: ', Math.max(...softmax(predictions)));
    // console.log('Min: ', Math.min(...softmax(predictions)));
    const result = Math.max(...softmax(predictions));
    const idx = softmax(predictions).indexOf(result);

    // const percent = (predictions[7] - Math.min(...predictions)) / (Math.max(...predictions) - Math.min(...predictions));

    return `${CATEGORIES[idx]} - ${softmax(predictions)[idx]}`;
  };

  return (
    <div className="w-full flex items-center flex-col">
      <div>
        <input type="file" accept="image/*" onChange={handleFiles} />
        <div ref={imageContainerRef} className={`w-64  ${loading ? 'hidden' : ''}`} />
      </div>

      <div className={`${!loading ? 'hidden' : ''}`}>Loading... please wait...</div>
      <div className={`flex flex-col items-center ${loading ? 'hidden' : ''}`}>
        <div className="flex m-5 w-full justify-around">
          <button
            className={`
          w-28 h-10 bg-neutral-400 dark:bg-neutral-600 
          hover:bg-neutral-500 dark:hover:bg-neutral-500 
          text-neutral-100 dark:text-neutral-200
          rounded
        `}
            onClick={resetSelection}
          >
            CLEAR
          </button>

          <button
            className={`
          w-28 h-10 bg-neutral-400 dark:bg-neutral-600 
          hover:bg-neutral-500 dark:hover:bg-neutral-500 
          text-neutral-100 dark:text-neutral-200
          rounded
        `}
            onClick={updatePredictions}
          >
            PREDICT
          </button>
        </div>
        <canvas ref={canvasRef} width="320" height="320" />
        <div className="flex flex-col">{result()}</div>
        <div className="flex flex-col">
          {[...softmax(predictions)].map((e: any, i: number) => (
            <div key={i} className="pt-0 pe-2">
              <div className="text-lg">
                {CATEGORIES[i]}: {e}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
