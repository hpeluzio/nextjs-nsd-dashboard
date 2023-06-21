'use client';

import { useEffect, useRef, useState } from 'react';
import * as ort from 'onnxruntime-web';
import { Tensor } from 'onnxruntime-web';

export default function Mnist() {
  const CANVAS_SIZE = 280;
  const CANVAS_SCALE = 2;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const isDrawing = useRef(false);
  const [predictions, setPredictions] = useState<any>([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const debounceRef = useRef<any>(undefined);
  const [session, setSession] = useState<ort.InferenceSession | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const initSession = async () => {
    setLoading(true);
    const canvas = canvasRef.current;
    const context = canvas!.getContext('2d');

    contextRef.current = context;
    context!.scale(2, 2);
    context!.lineCap = 'round';
    context!.strokeStyle = '#222222';
    context!.lineWidth = 7;
    context!.fillStyle = '#fff';

    const newOrtSession = await ort.InferenceSession.create('./onnx_model.onnx', { executionProviders: ['webgl'], graphOptimizationLevel: 'all' });
    setSession(newOrtSession);
    setLoading(false);
  };

  useEffect(() => {
    initSession();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startDrawing = ({ nativeEvent }: any) => {
    isDrawing.current = true;
    const { offsetX: x, offsetY: y } = nativeEvent;
    contextRef.current!.beginPath();
    contextRef.current!.moveTo(x / CANVAS_SCALE, y / CANVAS_SCALE);
  };

  const stopDrawing = ({ nativeEvent }: any) => {
    isDrawing.current = false;
    contextRef.current!.closePath();
  };

  const draw = ({ nativeEvent }: any) => {
    if (!isDrawing.current) return;
    const { offsetX: x, offsetY: y } = nativeEvent;
    contextRef.current!.lineTo(x / CANVAS_SCALE, y / CANVAS_SCALE);
    contextRef.current!.stroke();

    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      updatePredictions();
    }, 100);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas || !context) return;

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

  const updatePredictions = async () => {
    const canvas = canvasRef.current;
    const context = canvas!.getContext('2d');
    const imgData = context!.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    const imageTensor = new Tensor('float32', new Float32Array(imgData.data), [313600]);

    // const session = await ort.InferenceSession.create('./onnx_model.onnx', { executionProviders: ['webgl'], graphOptimizationLevel: 'all' });
    const feeds: Record<string, ort.Tensor> = {};
    feeds[session!.inputNames[0]] = imageTensor;

    const outputData = await session!.run(feeds);
    setPredictions(Array.prototype.slice.call(outputData[session!.outputNames[0]].data));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
        className="mb-5 rounded bg-white"
        width="280"
        height="280"
      />

      <div className="flex flex-col">
        <button
          className={`
          w-28 h-10 bg-neutral-400 dark:bg-neutral-600 
          hover:bg-neutral-500 dark:hover:bg-neutral-500 
          text-neutral-100 dark:text-neutral-200
          rounded
          mb-5
        `}
          onClick={clearCanvas}
        >
          CLEAR
        </button>

        <button
          className={`
          w-28 h-14 bg-neutral-400 dark:bg-neutral-600 
          hover:bg-neutral-500 dark:hover:bg-neutral-500 
          text-neutral-100 dark:text-neutral-200
          rounded
          mb-5
        `}
          onClick={handleDownload}
        >
          Download as PNG
        </button>
      </div>

      <div className="flex">
        {predictions.map((e: any, i: number) => (
          <div key={i} className="pt-0 pe-2">
            <div className="flex flex-col-reverse h-36 w-4 bg-neutral-600 dark:bg-neutral-300">
              <div style={{ height: `${e * 100}%` }} className={`${e === Math.max(...predictions) ? 'bg-green-600' : 'bg-green-300'}`}></div>
            </div>
            <div className="text-lg">{i}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
