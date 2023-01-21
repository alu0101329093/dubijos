import type { RefObject } from 'react';
import { useEffect, useState } from 'react';

export interface Position {
  x: number;
  y: number;
}

export const useDraw = (
  canvasRef: RefObject<HTMLCanvasElement>,
  parentRef: RefObject<HTMLDivElement>
): readonly [() => void] => {
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [currentPosition, setCurrentPosition] = useState<Position>();

  const clear = (): void => {
    const canvas = canvasRef.current;
    if (canvas == null) return;

    const context = canvas.getContext('2d');
    if (context == null) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  // TODO: Insert image in canvas
  // const insertImage = (): void => {
  //   const canvas = canvasRef.current;
  //   if (canvas == null) return;

  //   const context = canvas.getContext('2d');
  //   if (context == null) return;

  //   context.putImageData(image, 0, 0);
  // };

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = parentRef.current;
    if (canvas == null || parent == null) return;

    const context = canvas.getContext('2d', { willReadFrequently: true });
    if (context == null) return;

    const pixelRatio = window.devicePixelRatio;

    context.lineWidth = 15;
    context.lineCap = 'round';
    context.setTransform(2 / pixelRatio, 0, 0, 2 / pixelRatio, 0, 0);

    const computePointInCanvas = (event: MouseEvent): Position | undefined => {
      const transform = context.getTransform();
      const x = (event.offsetX - transform.e) / transform.a;
      const y = (event.offsetY - transform.f) / transform.d;

      return { x, y };
    };

    const resizeCanvas = (): void => {
      const { clientWidth: width, clientHeight: height } = parent;
      if (canvas.width === width && canvas.height === height) return;

      const image = context.getImageData(0, 0, canvas.width, canvas.height);
      canvas.width = width;
      canvas.height = height;
      // canvas.width = Math.round(width / 4) * 4;
      // canvas.width = Math.round(height / 4) * 4;
      // canvas.height = Math.round(height / 4) * 4;
      context.putImageData(image, 0, 0);

      setCurrentPosition(undefined);
    };

    const mouseDownHandler = (event: MouseEvent): void => {
      setIsDrawing(true);
      const newPosition = computePointInCanvas(event);
      if (newPosition == null) return;
      console.log('Change position...');
      setCurrentPosition(newPosition);
    };

    const mouseUpHandler = (): void => {
      setIsDrawing(false);
    };

    const mouseMoveHandler = (event: MouseEvent): void => {
      if (!isDrawing || currentPosition == null) return;

      context.beginPath();
      context.moveTo(currentPosition.x, currentPosition.y);
      const newPosition = computePointInCanvas(event);
      if (newPosition == null) return;
      context.lineTo(newPosition.x, newPosition.y);
      context.stroke();
      setCurrentPosition(newPosition);
    };

    resizeCanvas();

    canvas.addEventListener('mousedown', mouseDownHandler);
    canvas.addEventListener('mousemove', mouseMoveHandler);
    window.addEventListener('mouseup', mouseUpHandler);
    window.addEventListener('resize', resizeCanvas);

    return () => {
      canvas.removeEventListener('mousedown', mouseDownHandler);
      canvas.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('mouseup', mouseUpHandler);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [canvasRef, currentPosition, isDrawing, parentRef]);

  return [clear] as const;
};
