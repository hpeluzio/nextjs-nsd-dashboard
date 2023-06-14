'use client';

import { useEffect, useRef, useState } from 'react';

export default function CanvasDrawing() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  var image: HTMLImageElement;
  const [topResultLabel, setLabel] = useState('');

  const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx!.fillStyle = '#fff';
    ctx!.fillRect(0, 0, ctx!.canvas.width, ctx!.canvas.height);
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
    ctx.fill();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas!.getContext('2d');
    context!.fillStyle = '#fff';
    context!.fillRect(0, 0, context!.canvas.width, context!.canvas.height);
    let frameCount = 0;
    let animationFrameId: any;
    const render = () => {
      frameCount++;
      draw(context!, frameCount);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();
    draw(context!, frameCount);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const displayImageAndRunInference = () => {
    console.log('Oi');
  };

  return (
    <div>
      <button
        onClick={displayImageAndRunInference}
        className={`
          w-28 h-10 bg-neutral-400 dark:bg-neutral-600 
          hover:bg-neutral-500 dark:hover:bg-neutral-500 
          text-neutral-100 dark:text-neutral-200
          rounded
          mb-5
        `}
      >
        Canvas
      </button>
      <br />
      <div>
        <canvas ref={canvasRef} width={240} height={240} />
      </div>
    </div>
  );
}
