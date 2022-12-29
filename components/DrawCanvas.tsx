'use client';

import type { FC } from 'react';
import { useEffect, useRef } from 'react';
import { useDraw } from '../hooks/useDraw';

export interface DrawCanvasProps {
  clear: boolean;
  resetClear: () => void;
}

const DrawCanvas: FC<DrawCanvasProps> = ({ clear, resetClear }) => {
  const canvasRef = useRef(null);
  const parentRef = useRef(null);
  const [clearHandler] = useDraw(canvasRef, parentRef);

  useEffect(() => {
    if (clear) {
      clearHandler();
      resetClear();
    }
  });

  return (
    <div
      className="h-4/6 w-8/12 rounded-3xl border-8 border-black bg-white shadow-[1px_4px_10px_5px_rgba(0,0,0,0.25)]"
      ref={parentRef}
      // onResize={}
    >
      <canvas height={600} ref={canvasRef} width={1280}></canvas>
    </div>
  );
};

export default DrawCanvas;
