"use client";
import { useEffect } from "react";

/**
 * @param onResize - коллбэк, который будет вызываться при изменении размера окна.
 */

export const useWindowResize = (
  onResize: (width: number, height: number) => void
) => {
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      onResize(width, height);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [onResize]);
};
