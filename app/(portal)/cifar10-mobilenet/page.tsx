'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import * as ort from 'onnxruntime-web';
import { Tensor } from 'onnxruntime-web';
import * as Jimp from 'jimp';
import Image from 'next/image';

export default function CoffeeDiseases() {
  const [session, setSession] = useState<ort.InferenceSession | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const CATEGORIES = ['airplane', 'automobile', 'bird', 'cat', 'deer', 'dog', 'frog', 'horse', 'ship', 'truck'];
  const [images, setImages] = useState<File[]>([]);
  const [imageURL, setImageURL] = useState<string>('');
  const [predictions, setPredictions] = useState<any>([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const initSession = async () => {
    setLoading(true);
    const newOrtSession = await ort.InferenceSession.create('./cifar10_mobilenet_v2_82.7400.onnx', {
      executionProviders: ['webgl'],
      graphOptimizationLevel: 'all',
    });
    setSession(newOrtSession);
    setLoading(false);
  };

  useEffect(() => {
    initSession();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updatePredictions = async () => {
    // 1. Get the bugger and resize the image and create R, G, and B arrays.
    var imageData = await Jimp.default.read(imageURL).then((imageBuffer: Jimp) => {
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
    // Normalize according cifar10 mean/std
    const mean = [0.4914, 0.4822, 0.4465];
    const std = [0.2023, 0.1994, 0.201];
    const float32Data = new Float32Array(3 * 32 * 32);
    for (let i = 0; i < l; i++) {
      // float32Data[i] = transposedData[i] / 255.0; // convert to float
      float32Data[i] = (transposedData[i] / 255.0 - mean[i % 3]) / std[i % 3];
    }

    // for (let i = 0; i < l; i++) {
    //   float32Data[i] = (transposedData[i] - mean[i % 3]) / std[i % 3];
    // }

    // 5. create the tensor object from onnxruntime-web.
    const imageTensor = new Tensor('float32', new Float32Array(float32Data), [1, 3, 32, 32]);
    const feeds: Record<string, ort.Tensor> = {};
    feeds[session!.inputNames[0]] = imageTensor;
    const outputData = await session!.run(feeds);
    console.log('outputData: ', Array.prototype.slice.call(outputData[session!.outputNames[0]].data));
    // setPredictions(softmax(Array.prototype.slice.call(outputData[session!.outputNames[0]].data)));
    setPredictions(setProbPredictions(Array.prototype.slice.call(outputData[session!.outputNames[0]].data)));
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

  const setProbPredictions = (probabilities: number[]): any => {
    // Find the minimum value in the array (to handle negative values)
    const minValue = Math.min(...probabilities);

    // Shift all values by the minimum value to make them non-negative
    const shiftedArray = probabilities.map((value) => value - minValue);

    // Calculate the total sum of values after shifting
    const totalSum = shiftedArray.reduce((sum, value) => sum + value, 0);

    // Convert shifted values to percentages
    const percentages = shiftedArray.map((value) => (value / totalSum) * 100);

    return percentages;
  };

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedImages = Array.from(e.target.files);
      setImages(selectedImages);

      const newImageURLs: any[] = [];
      images.forEach((img: any) => newImageURLs.push(URL.createObjectURL(img)));
      setImageURL(URL.createObjectURL(Array.from(e.target.files)[0]));

      // setTimeout(() => updatePredictions(), 500);
    }
  };

  const clear = () => {
    setImages([]);
    setImageURL('');
    setPredictions([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  };

  return (
    <div className="flex items-center flex-col w-full ">
      <h1 className="mb-5">Cifar10 - mobilenet_v2 - 82.7400% acc</h1>
      <div className={`${!loading ? 'hidden' : ''}`}>Loading... please wait...</div>
      <div className={`flex flex-col items-center ${loading ? 'hidden' : ''}`}>
        <div>
          <input type="file" accept="image/*" onChange={(e) => onImageChange(e)} />

          {imageURL !== '' && <Image alt="img" src={imageURL} width="320" height="320" />}
        </div>
        <div className="flex m-5 w-full justify-around">
          <button
            className={`
          w-28 h-10 bg-neutral-400 dark:bg-neutral-600 
          hover:bg-neutral-500 dark:hover:bg-neutral-500 
          text-neutral-100 dark:text-neutral-200
          rounded
        `}
            onClick={clear}
          >
            CLEAR
          </button>

          <button
            className={`
          w-28 h-10 bg-neutral-400 dark:bg-neutral-600 
          hover:bg-neutral-500 dark:hover:bg-neutral-500 
          text-neutral-100 dark:text-neutral-200
          rounded
          ${imageURL === '' && 'opacity-50 hover:'}
        `}
            onClick={updatePredictions}
            disabled={imageURL === ''}
          >
            PREDICT
          </button>
        </div>
        {imageURL !== '' ? (
          <div className="flex">
            {/* <div className="flex flex-col">
              <div className="flex justify-start mr-2">Result:</div>
              <div className="flex justify-start w-48">{result()}</div>
            </div> */}
            <div className="flex flex-col">
              {predictions
                .map((each: number, idx: number) => ({ prediction: each, class: CATEGORIES[idx] }))
                .sort((a: any, b: any) => {
                  if (a.prediction > b.prediction) return -1;
                  if (a.prediction < b.prediction) return 1;
                  if (a.prediction === b.prediction) return 0;
                })
                .map((each: any, idx: number) => (
                  <div
                    key={idx}
                    className={`
                    pt-0 pe-2 flex
                    ${idx === 0 && 'text-green-600 font-bold'}
                  `}
                  >
                    <div className="flex justify-end w-20 mr-2">{each.class}:</div>
                    <div className="flex justify-start w-48">{each.prediction}</div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div>Select a image</div>
        )}
      </div>
    </div>
  );
}
