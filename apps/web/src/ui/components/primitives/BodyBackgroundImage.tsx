"use client";

import { useEffect, useState } from "react";

import { cn } from "~/ui/utils";
import { useWindowHasFocus } from "~/ui/hooks";

const images = [
  "/Siranor cuddling Zougui.jpg",
  "/Velgaros kissing Zougui.jpg",
  "/Alfie kissing Zougui.png",
  "/Alison transforming Zougui.png",
] as const;

export interface BodyBackgroundImageProps extends React.ComponentProps<"div"> {}

export const BodyBackgroundImage = ({
  className,
  ...props
}: BodyBackgroundImageProps) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const hasFocus = useWindowHasFocus();

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 500000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      {...props}
      data-has-focus={!hasFocus ? "true" : undefined}
      className={cn(
        `inset fixed -z-10 h-svh w-svw transition-[filter]
        data-has-focus:blur-3xl`,
        className,
      )}
    >
      {images
        .filter((_, i) => loaded || i === imageIndex)
        .map((image, index) => (
          <img
            key={image}
            data-active={imageIndex === index ? "true" : undefined}
            className="pointer-events-none object-cover opacity-0
              transition-opacity duration-500 data-active:opacity-100"
            src={image}
            alt=""
            aria-hidden
            onLoad={() => setLoaded(true)}
          />
        ))}
    </div>
  );
};
