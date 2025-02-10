"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const ThreeDCard = ({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const { left, top, width, height } = card.getBoundingClientRect();
    const mouseX = event.clientX - left;
    const mouseY = event.clientY - top;
    const rotateXUnnormalized = ((mouseY - height / 2) / height) * -10;
    const rotateYUnnormalized = ((mouseX - width / 2) / width) * 10;
    setRotateX(rotateXUnnormalized);
    setRotateY(rotateYUnnormalized);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center py-20",
        containerClassName
      )}
      style={{
        perspective: "1000px",
      }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX,
          rotateY,
        }}
        className={cn(
          "relative hover:shadow-xl transition-all duration-200 ease-linear cursor-pointer",
          className
        )}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
