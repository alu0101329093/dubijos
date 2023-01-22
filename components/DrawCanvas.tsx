'use client';

import * as tf from '@tensorflow/tfjs';
import type { FC } from 'react';
import { useEffect, useRef } from 'react';
import { useDraw } from '../hooks/useDraw';
import classNames from '../public/model/class_names.json';

export interface DrawCanvasProps {
  clear: boolean;
  resetClear: () => void;
  predict: boolean;
  resetPredict: () => void;
  setPrediction: (prediction: string) => void;
}

const DrawCanvas: FC<DrawCanvasProps> = ({
  clear,
  resetClear,
  predict,
  resetPredict,
  setPrediction,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const [clearHandler] = useDraw(canvasRef, parentRef);

  useEffect(() => {
    if (clear) {
      clearHandler();
      setPrediction('...');
      resetClear();
    }
  }, [clear, clearHandler, resetClear, setPrediction]);

  useEffect(() => {
    if (predict) {
      const canvas = canvasRef.current;
      if (canvas == null) return;
      const context = canvas.getContext('2d');
      if (context == null) return;

      const tryPrediction = async (): Promise<void> => {
        const getDrawZone = (imgData: ImageData): ImageData => {
          const size = canvas.width * canvas.height * 4;
          let minWidth = 0;
          let minHeight = 0;
          let maxWidth = canvas.width;
          let maxHeight = canvas.height;

          for (let i = 3; i < size; i += 4) {
            if (imageData.data[i] !== 0) {
              minHeight = Math.floor(i / (canvas.width * 4));
              break;
            }
          }

          for (let i = size - 1; i > 0; i -= 4) {
            if (imageData.data[i] !== 0) {
              maxHeight = Math.floor(i / (canvas.width * 4));
              break;
            }
          }

          for (let i = 0; i < canvas.width; ++i) {
            for (let j = 0; j < canvas.height; ++j) {
              if (imageData.data[i * 4 + 3 + j * canvas.width * 4] !== 0) {
                minWidth = i;
                break;
              }
            }
            if (minWidth !== 0) break;
          }

          for (let i = canvas.width - 1; i >= 0; --i) {
            for (let j = canvas.height - 1; j >= 0; --j) {
              if (imageData.data[i * 4 + 3 + j * canvas.width * 4] !== 0) {
                maxWidth = i;
                break;
              }
            }
            if (maxWidth !== canvas.width) break;
          }

          return context.getImageData(
            minWidth,
            minHeight,
            maxWidth - minWidth,
            maxHeight - minHeight
          );
        };

        const preprocess = (imgData: ImageData): tf.Tensor<tf.Rank> => {
          const drawData = getDrawZone(imgData);
          const imageData = new ImageData(
            drawData.data.map((value, index) => {
              if (drawData.data[(Math.floor(index / 4) + 1) * 4 - 1] === 0)
                return 255;
              return value;
            }),
            drawData.width,
            drawData.height
          );

          const image = tf.browser.fromPixels(imageData, 1);

          const resized = tf.image.resizeBilinear(image, [28, 28]).toFloat();
          const offset = tf.scalar(255.0);
          const normalized = tf.scalar(1.0).sub(resized.div(offset));
          const batched = normalized.expandDims(0);
          return batched;
        };

        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        // context.putImageData(imageData, 0, 0);

        const model = await tf.loadLayersModel('/model/model.json');
        const prediction = (
          model.predict(preprocess(imageData)) as tf.Tensor
        ).dataSync();

        // const response = await fetch('/api/predict', {
        //   method: 'POST',
        //   body: imageBuffer,
        // });

        setPrediction(classNames[tf.argMax(prediction).dataSync()[0]]);
      };

      tryPrediction().catch(null);
      resetPredict();
    }
  }, [predict, resetPredict, setPrediction]);

  return (
    <div
      className="h-4/6 w-8/12 rounded-3xl border-8 border-black bg-white shadow-[1px_4px_10px_5px_rgba(0,0,0,0.25)]"
      ref={parentRef}
    >
      <canvas height={600} ref={canvasRef} width={1280}></canvas>
    </div>
  );
};

export default DrawCanvas;
