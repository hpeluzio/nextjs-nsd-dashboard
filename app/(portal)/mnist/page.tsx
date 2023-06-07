'use client';

import { useEffect, useRef } from 'react';
import './mnist.css';
// import './script.js';
import * as ort from 'onnxruntime-web';

export default function Mnist() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    context.fillStyle = '#fff';
    console.log('width, height->', context.canvas.width, 'x', context.canvas.height);
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    // Set up event listeners
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Cleanup code
    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseout', stopDrawing);
    };
  }, []);

  const startDrawing = (event: MouseEvent) => {
    isDrawing.current = true;
    draw(event);
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
    context.lineWidth = 28;
    context.lineJoin = 'round';
    context.font = '28px sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = '#212121';
    const radius = 15;
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fill();
    context.fillRect(x - 10, y - 10, 15, 15);
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
  };

  return (
    <main>
      <div className="flex flex-col items-center">Mnist</div>
      <div className="card elevation">
        <canvas ref={canvasRef} className="canvas elevation" id="canvas" width="280" height="280" />

        <div className="button" id="clear-button" onClick={clearCanvas}>
          CLEAR
        </div>

        <div className="predictions">
          <div className="prediction-col" id="prediction-0">
            <div className="prediction-bar-container">
              <div className="prediction-bar"></div>
            </div>
            <div className="prediction-number">0</div>
          </div>

          <div className="prediction-col" id="prediction-1">
            <div className="prediction-bar-container">
              <div className="prediction-bar"></div>
            </div>
            <div className="prediction-number">1</div>
          </div>

          <div className="prediction-col" id="prediction-2">
            <div className="prediction-bar-container">
              <div className="prediction-bar"></div>
            </div>
            <div className="prediction-number">2</div>
          </div>

          <div className="prediction-col" id="prediction-3">
            <div className="prediction-bar-container">
              <div className="prediction-bar"></div>
            </div>
            <div className="prediction-number">3</div>
          </div>

          <div className="prediction-col" id="prediction-4">
            <div className="prediction-bar-container">
              <div className="prediction-bar"></div>
            </div>
            <div className="prediction-number">4</div>
          </div>

          <div className="prediction-col" id="prediction-5">
            <div className="prediction-bar-container">
              <div className="prediction-bar"></div>
            </div>
            <div className="prediction-number">5</div>
          </div>

          <div className="prediction-col" id="prediction-6">
            <div className="prediction-bar-container">
              <div className="prediction-bar"></div>
            </div>
            <div className="prediction-number">6</div>
          </div>

          <div className="prediction-col" id="prediction-7">
            <div className="prediction-bar-container">
              <div className="prediction-bar"></div>
            </div>
            <div className="prediction-number">7</div>
          </div>

          <div className="prediction-col" id="prediction-8">
            <div className="prediction-bar-container">
              <div className="prediction-bar"></div>
            </div>
            <div className="prediction-number">8</div>
          </div>

          <div className="prediction-col" id="prediction-9">
            <div className="prediction-bar-container">
              <div className="prediction-bar"></div>
            </div>
            <div className="prediction-number">9</div>
          </div>
        </div>
      </div>
    </main>
  );
}
