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

  const initSession = async () => {
    setLoading(true);

    const session = await ort.InferenceSession.create('./onnx_model.onnx', { executionProviders: ['webgl'], graphOptimizationLevel: 'all' });

    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

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
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    const imgData = context!.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    const imgArray = new Float32Array(imgData.data);

    // const input = new Tensor(imgArray, 'float32');
    // console.log('input ->', input);
    // if (!session.current) return;
    // const outputMap = await session.current.run([input]);
    // console.log('outputMap', outputMap);
    // console.log('input', input);
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

    updatePredictions();
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

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.href = canvas!.toDataURL('image/png');
    link.download = 'canvas.png';
    link.click();
  };

  const onnxruntime = async () => {
    const canvas = canvasRef.current;

    const imageData = await Jimp.read(canvas!.toDataURL('image/png')).then((imageBuffer: Jimp) => {
      return imageBuffer.resize(280, 280);
    });

    console.log('Jimp imageData', imageData);

    const dataUrl = await imageData.getBase64Async(Jimp.MIME_PNG);
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'image.png'; // Set the desired file name and extension

    // Simulate a click to trigger the download
    link.click();

    // Clean up by removing the temporary anchor element
    link.remove();
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
          <button onClick={onnxruntime}>onnxruntime</button>
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
