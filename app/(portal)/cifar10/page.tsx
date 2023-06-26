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
    const newOrtSession = await ort.InferenceSession.create('./cifar10_mnist.onnx', { executionProviders: ['webgl'], graphOptimizationLevel: 'all' });
    setSession(newOrtSession);
  };

  useEffect(() => {
    initSession();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updatePredictions = async () => {
    const canvas = canvasRef.current;
    const context = canvas!.getContext('2d');

    const imageSrc = imageContainerRef!.current!.querySelector('img')!.src;
    const img = new Image();
    img.src = imageSrc;

    context!.drawImage(img, 0, 0, 320, 320);

    const imgData = context!.getImageData(0, 0, 32, 32);
    console.log('imgData', imgData);
    // Remove the alpha channel by setting it to 255 (fully opaque)

    const pixels = imgData.data.filter((_, idx) => (idx + 1) % 4 !== 0).map((e) => e / 255);

    const newImgDataWithoutAlphaChannel = JSON.parse(JSON.stringify(imgData));
    newImgDataWithoutAlphaChannel.data = pixels;
    newImgDataWithoutAlphaChannel.colorSpace = imgData.colorSpace;
    newImgDataWithoutAlphaChannel.height = imgData.height;
    newImgDataWithoutAlphaChannel.width = imgData.width;
    console.log('newImgDataWithoutAlphaChannel', newImgDataWithoutAlphaChannel);
    context!.putImageData(imgData, 0, 0);

    // if (!imageContainerRef) return;
    // const imageSrc = imageContainerRef!.current!.querySelector('img')!.src;
    // console.log('imageSrc', imageSrc);
    // var imageData = await Jimp.default.read(imageSrc).then((imageBuffer: Jimp) => {
    //   return imageBuffer.resize(32, 32).rgba(false);
    // });

    // const response = await fetch(imageSrc);
    // const blob = await response.blob();
    // console.log('blob', blob);
    // const arrayBuffer = await blob.arrayBuffer();
    // console.log('arrayBuffer', arrayBuffer);

    // console.log('imageData', imageData.bitmap.data);

    const imageTensor = new Tensor('float32', new Float32Array(newImgDataWithoutAlphaChannel.data), [1, 3, 32, 32]);
    // const imageTensor = new Tensor('float32', new Float32Array(imageData.bitmap.data), [1 * 3 * 32 * 32]);
    console.log('imageTensor', imageTensor);
    const feeds: Record<string, ort.Tensor> = {};
    feeds[session!.inputNames[0]] = imageTensor;
    const outputData = await session!.run(feeds);
    console.log('outputData', outputData);
    setPredictions(softmax(Array.prototype.slice.call(outputData[session!.outputNames[0]].data)));
  };

  const softmax = (arr: any) => {
    return arr.map((value: any, index: number) => {
      return (
        Math.exp(value) /
        arr
          .map((y: any) => {
            return Math.exp(y);
          })
          .reduce((a: any, b: any) => {
            return a + b;
          })
      );
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
