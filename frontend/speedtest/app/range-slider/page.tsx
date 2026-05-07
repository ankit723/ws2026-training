'use client';

import { useState } from "react";

export default function Page(){
    const [min, setMin] = useState(20)
    const [max, setMax] = useState(80)

    return(
        <div className="w-screen h-screen flex flex-col justify-center items-center">

            <div className="relative w-75">

                {/* Base Track */}
                <div className="h-2 bg-gray-300 rounded-full"></div>

                {/* Selected Range */}
                <div 
                    className="absolute h-2 bg-red-500 rounded-full top-0"
                    style={{ left: `${min}%`, right: `${100 - max}%` }}
                />

                {/* Min Slider */}
                <input 
                    type="range" 
                    min={0} 
                    max={100} 
                    value={min} 
                    onChange={(e)=>{
                        const value = parseInt(e.target.value)
                        if(value <= max) setMin(value)
                    }}
                    className="absolute -top-2 w-full appearance-none bg-transparent"
                />

                {/* Max Slider */}
                <input 
                    type="range" 
                    min={0} 
                    max={100} 
                    value={max} 
                    onChange={(e)=>{
                        const value = parseInt(e.target.value)
                        if(value >= min) setMax(value)
                    }}
                    className="absolute top-1 w-full appearance-none bg-transparent "
                />

            </div>

            <div className="mt-4 text-lg">
                Range: {min} - {max}
            </div>
        </div>
    )
}