'use client';

// import '@tensorflow/tfjs-backend-cpu';
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
      console.log(`Predict...`);
      const canvas = canvasRef.current;
      if (canvas == null) return;
      const context = canvas.getContext('2d');
      if (context == null) return;

      const tryPrediction = async (): Promise<void> => {
        const preprocess = (imgData: ImageData): tf.Tensor<tf.Rank> => {
          const imageData = new ImageData(
            imgData.data.map((value, index) => {
              if (index % 4 === 3) return 0;
              if (imgData.data[(Math.floor(index / 4) + 1) * 4 - 1] === 0)
                return 255;
              return value;
            }),
            imgData.width,
            imgData.height
          );
          // const imageData = imgData;
          const tensor = tf.browser.fromPixels(imageData, 1);
          // console.log(imageData.data);
          // console.log(tensor.dataSync());
          // console.log(
          //   tf.image.resizeBilinear(tensor, [28, 28]).toFloat().dataSync()
          // );
          // tf.browser.toPixels(tensor, canvas);
          const resized = tf.image.resizeBilinear(tensor, [28, 28]).toFloat();
          const offset = tf.scalar(255.0);
          const normalized = tf.scalar(1.0).sub(resized.div(offset));
          // tf.browser.toPixels(normalized, canvas).then(() => {
          //   console.log(canvas.toDataURL());
          // });
          const batched = normalized.expandDims(0);
          return batched;
        };

        // console.log(`Width: ${canvas.width}`);
        // console.log(`Height: ${canvas.height}`);
        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        // context.putImageData(imageData, 0, 0);

        // const imageBuffer = Buffer.from(imageData.data);

        const model = await tf.loadLayersModel('/model/model.json');
        // console.log(preprocess(imageData).shape);
        const prediction = (
          model.predict(preprocess(imageData)) as tf.Tensor
        ).dataSync();

        // const response = await fetch('/api/predict', {
        //   method: 'POST',
        //   body: imageBuffer,
        // });

        // const prediction = await response.json();
        const array = [];
        for (let i = 0; i < prediction.length; ++i) {
          array.push({ className: classNames[i], value: prediction[i] });
        }
        console.log(array.sort((a, b) => b.value - a.value).slice(0, 5));
        // console.log(tf.argMax(prediction).dataSync()[0]);
        setPrediction(classNames[tf.argMax(prediction).dataSync()[0]]);
      };

      tryPrediction().catch(null);
      // TODO: Try to predict using model
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
