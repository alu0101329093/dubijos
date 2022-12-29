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
  const [currentPosition, setCurrentPosition] = useState<Position>({
    x: 0,
    y: 0,
  });

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

    const context = canvas.getContext('2d');
    if (context == null) return;

    context.lineWidth = 5;

    const computePointInCanvas = (event: MouseEvent): Position | undefined => {
      const canvas = canvasRef.current;
      if (canvas == null) return;

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      return { x, y };
    };

    const resizeCanvas = (): void => {
      const { clientWidth: width, clientHeight: height } = parent;
      if (canvas.width === width && canvas.height === height) return;

      const image = context.getImageData(0, 0, canvas.width, canvas.height);
      // TODO: Check pixel ratio use
      // const pixelRatio = window.devicePixelRatio;
      // canvas.width = width * pixelRatio;
      // canvas.height = height * pixelRatio;
      canvas.width = width;
      canvas.height = height;
      // context.scale(pixelRatio, pixelRatio);
      context.putImageData(image, 0, 0);
    };

    const mouseDownHandler = (event: MouseEvent): void => {
      setIsDrawing(true);
      const newPosition = computePointInCanvas(event);
      if (newPosition == null) return;

      setCurrentPosition(newPosition);
    };

    const mouseUpHandler = (): void => {
      setIsDrawing(false);
    };

    const mouseMoveHandler = (event: MouseEvent): void => {
      if (!isDrawing) return;

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
