'use client';

import { useEffect, useRef, useState } from 'react';

export default function Drawing() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const CANVAS_SCALE = 2;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas!.getContext('2d');
    context!.fillStyle = '#fff';
    context!.fillRect(0, 0, context!.canvas.width, context!.canvas.height);
    context!.closePath();
    context!.scale(2, 2);
    context!.lineCap = 'round';
    context!.strokeStyle = '#222222';
    context!.lineWidth = 7;
    context!.fillStyle = '#fff';
    contextRef.current = context;
    return () => {};
  }, []);

  const startDrawing = ({ nativeEvent }: any) => {
    setIsDrawing(true);
    const { offsetX: x, offsetY: y } = nativeEvent;
    contextRef.current!.beginPath();
    contextRef.current!.moveTo(x / CANVAS_SCALE, y / CANVAS_SCALE);
  };

  const stopDrawing = () => {
    contextRef.current!.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }: any) => {
    if (!isDrawing) return;
    const { offsetX: x, offsetY: y } = nativeEvent;
    contextRef.current!.lineTo(x / CANVAS_SCALE, y / CANVAS_SCALE);
    contextRef.current!.stroke();
  };

  const clear = ({ nativeEvent }: any) => {
    contextRef.current!.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    contextRef.current!.closePath();
    contextRef.current!.beginPath();
    contextRef.current!.fillStyle = '#fff';
    contextRef.current!.fillRect(0, 0, contextRef.current!.canvas.width, contextRef.current!.canvas.height);
  };

  return (
    <div>
      <button
        onClick={clear}
        className={`
          w-28 h-10 bg-neutral-400 dark:bg-neutral-600 
          hover:bg-neutral-500 dark:hover:bg-neutral-500 
          text-neutral-100 dark:text-neutral-200
          rounded
          mb-5
        `}
      >
        CLEAR
      </button>
      <br />
      <div>
        <canvas onMouseDown={startDrawing} onMouseUp={stopDrawing} onMouseMove={draw} ref={canvasRef} width={240} height={240} />
      </div>
    </div>
  );
}
