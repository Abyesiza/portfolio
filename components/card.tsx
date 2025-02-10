"use client";


import Image from "next/image";
import React from "react";
import { ThreeDCard } from "@/components/ui/3d-card";

export function Card() {
  return (
    <ThreeDCard className="w-[450px] h-auto">
      <div className="relative w-full h-full p-8 flex flex-col items-start justify-start gap-4">
        <Image
          src="/path-to-your-image.jpg"
          alt="Project thumbnail"
          width={400}
          height={300}
          className="rounded-lg shadow-md"
        />
        <h3 className="text-2xl font-bold text-neutral-200">Project Title</h3>
        <p className="text-neutral-400">
          Project description goes here. This is a brief overview of what the project does and what technologies were used.
        </p>
      </div>
    </ThreeDCard>
  );
}
