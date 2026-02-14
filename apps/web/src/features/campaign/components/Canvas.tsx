import { useEffect, useRef } from "react";

type SplitImageCanvasProps = {
  imageA: string;
  imageB: string;
};

export function SplitImageCanvas({ imageA, imageB }: SplitImageCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const imgA = new Image();
    const imgB = new Image();

    imgA.src = imageA;
    imgB.src = imageB;

    Promise.all([
      new Promise<void>((res) => (imgA.onload = () => res())),
      new Promise<void>((res) => (imgB.onload = () => res())),
    ]).then(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const width = Math.min(imgA.width, imgB.width);
      const height = Math.min(imgA.height, imgB.height);
      const halfWidth = Math.floor(width / 2);

      canvas.width = width;
      canvas.height = height;

      // Left half from image A
      ctx.drawImage(imgA, 0, 0, halfWidth, height, 0, 0, halfWidth, height);

      // Right half from image B
      ctx.drawImage(
        imgB,
        width - halfWidth,
        0,
        halfWidth,
        height,
        halfWidth,
        0,
        halfWidth,
        height,
      );
    });
  }, [imageA, imageB]);

  return <canvas ref={canvasRef} />;
}
