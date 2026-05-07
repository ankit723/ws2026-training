'use client';

import { NextRequest } from "next/server";
import { useEffect, useRef } from "react";

export default function Page(){
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    useEffect(()=>{
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;

        canvas.width = 700;
        canvas.height = 700;

        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        let isDrawing = false;
        let currentColor = "#000000"; // ✅ internal state (NOT React)

        const palette: any[] = [];

        const drawPalette = () => {
            const colors = ["red", "blue", "green", "black"];

            colors.forEach((c, i) => {
                const x = 20 + i * 60;
                const y = 20;
                const size = 40;

                ctx.fillStyle = c;
                ctx.fillRect(x, y, size, size);

                palette.push({ x, y, size, color: c });
            });
        };

        drawPalette();

        const getCoords = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            return {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };

        const isInsidePalette = (x: number, y: number) => {
            return palette.find(item =>
                x >= item.x &&
                x <= item.x + item.size &&
                y >= item.y &&
                y <= item.y + item.size
            );
        };

        canvas.addEventListener("mousedown", (e)=>{
            const { x, y } = getCoords(e);

            const clickedColor = isInsidePalette(x, y);

            if (clickedColor) {
                currentColor = clickedColor.color;
                return; // ❗ stop drawing
            }

            isDrawing = true;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.strokeStyle = currentColor;
        });

        canvas.addEventListener("mousemove", (e)=>{
            if(!isDrawing) return;

            const { x, y } = getCoords(e);
            ctx.lineTo(x, y);
            ctx.stroke();
        });

        canvas.addEventListener("mouseup", () => {
            isDrawing = false;
        });

        canvas.addEventListener("mouseleave", () => {
            isDrawing = false;
        });

    }, [])

    return(
        <div className="w-screen min-h-screen flex justify-center items-center">
            <canvas 
                ref={canvasRef} 
                className="border cursor-crosshair w-[700px] h-[700px]"
            />
        </div>
    )
}