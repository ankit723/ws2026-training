"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dividerRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState(50); // start from middle

  useEffect(() => {
    const container = containerRef.current as HTMLDivElement;
    const divider = dividerRef.current as HTMLDivElement;

    const handleMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();

      let left = e.clientX - rect.left;

      // clamp inside container
      left = Math.max(0, Math.min(left, rect.width));

      const per = (left * 100) / rect.width;

      divider.style.left = `${per}%`;
      setPosition(per);
    };

    container.addEventListener("mousemove", handleMove);

    return () => {
      container.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div
        className="relative w-[1000px] h-[800px] overflow-hidden"
        ref={containerRef}
      >
        {/* Before Image (Bottom) */}
        <Image
          src="/before.png"
          alt="Before image"
          fill
          className="object-cover"
        />

        {/* After Image (Top - Clipped) */}
        <Image
          src="/after.png"
          alt="After image"
          fill
          className="object-cover"
          style={{
            clipPath: `inset(0 ${100 - position}% 0 0)`
          }}
        />

        {/* Divider */}
        <div
          ref={dividerRef}
          className="absolute top-0 bottom-0 w-[4px] bg-white z-10"
          style={{
            left: `${position}%`,
            transform: "translateX(-50%)"
          }}
        />

        {/* Handle */}
        <div
          className="absolute w-6 h-6 bg-white border border-black rounded-full z-20"
          style={{
            left: `${position}%`,
            top: "50%",
            transform: "translate(-50%, -50%)"
          }}
        />
      </div>
    </div>
  );
}