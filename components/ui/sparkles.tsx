"use client";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type SparkleType = {
  id: string;
  createdAt: number;
  color: string;
  size: number;
  style: {
    top: string;
    left: string;
    zIndex: number;
  };
};

type SparklesProps = {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  color?: string;
};

const DEFAULT_COLOR = "hsl(50, 100%, 50%)";

function generateSparkle(color: string = DEFAULT_COLOR): SparkleType {
  return {
    id: String(Math.random()),
    createdAt: Date.now(),
    color,
    size: Math.random() * 10 + 10,
    style: {
      top: Math.random() * 100 + "%",
      left: Math.random() * 100 + "%",
      zIndex: 2,
    },
  };
}

function range(start: number, end?: number, step = 1): number[] {
  const output: number[] = [];
  if (typeof end === "undefined") {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  return output;
}

const Sparkles: React.FC<SparklesProps> = ({
  color = DEFAULT_COLOR,
  children,
  className,
  style,
  ...props
}) => {
  const [sparkles, setSparkles] = useState<SparkleType[]>(() => {
    return range(3).map(() => generateSparkle(color));
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const newSparkles = sparkles.filter((sp) => {
        const delta = now - sp.createdAt;
        return delta < 1000;
      });

      if (newSparkles.length < 3) {
        newSparkles.push(generateSparkle(color));
      }

      setSparkles(newSparkles);
    }, 100);

    return () => clearInterval(interval);
  }, [sparkles, color]);

  return (
    <span className={cn("relative inline-block", className)} style={style} {...props}>
      {sparkles.map((sparkle) => (
        <Sparkle
          key={sparkle.id}
          color={sparkle.color}
          size={sparkle.size}
          style={sparkle.style}
        />
      ))}
      <strong className="relative z-1 font-bold">{children}</strong>
    </span>
  );
};

interface SparkleProps {
  size: number;
  color: string;
  style: React.CSSProperties;
}

const Sparkle: React.FC<SparkleProps> = ({ size, color, style }) => {
  const path =
    "M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z";

  return (
    <span
      className="absolute block animate-sparkle-spin"
      style={style}
    >
      <svg
        className="block animate-sparkle-ping"
        width={size}
        height={size}
        viewBox="0 0 68 68"
        fill="none"
      >
        <path d={path} fill={color} />
      </svg>
    </span>
  );
};

export default Sparkles;
