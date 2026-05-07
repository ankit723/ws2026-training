'use client'

import { useState } from "react"

export default function Page(){
    const [colors, setColors] = useState<string[]>([])


    const addItem = () => {
        console.log("hello")
        setColors(p=>[...p, "#000000"])
    }

    const removeItem = () => {
        setColors(prev => prev.slice(0, -1))
    }

    const hexToRgb = (hex: string)=>{
        const bigInt = parseInt(hex.slice(1), 16)
        return{
            r: (bigInt >> 16) & 255,
            g: (bigInt >> 8) & 255,
            b: bigInt & 255
        }
    }

    
    const rgbToHex = (r: number, g: number, b: number)=>{
        return "#" + [r, b, g].map(x=>x.toString(16).padStart(2, "0")).join("")
    }
    
    function screenBlend(a: any, b: any) {
        return {
            r: 255 - (255 - a.r) * (255 - b.r) / 255,
            g: 255 - (255 - a.g) * (255 - b.g) / 255,
            b: 255 - (255 - a.b) * (255 - b.b) / 255,
        }
    }

    function blendColors(hexColors: string[]) {
        if (hexColors.length === 0) return "#000000"

        let result = hexToRgb(hexColors[0])

        for (let i = 1; i < hexColors.length; i++) {
            const next = hexToRgb(hexColors[i])
            result = screenBlend(result, next)
        }

        return rgbToHex(
            Math.round(result.r),
            Math.round(result.g),
            Math.round(result.b)
        )
    }

    return(
        <div className="w-screen h-screen flex justify-center items-center gap-40 ">
            <div className="flex flex-col items-center gap-10">
                <div className="flex gap-3 items-center">
                    <button className="bg-black text-white py-2 px-4 rounded-sm" onClick={removeItem}>-</button>
                    {colors.length}
                    <button className="bg-black text-white py-2 px-4 rounded-sm" onClick={addItem}>+</button>
                </div>
                {
                    colors.map((x, i)=>(
                        <div key={i} className="size-24 mix-blend-screen " style={{backgroundColor: x}}>
                            <input type="color" value={colors[i]} onChange={(e)=>{
                                const updated = colors.map((c, id)=>{
                                    if(id===i){
                                        return e.target.value
                                    }
                                    return c
                                })
                                setColors(updated)
                            }} />
                        </div>
                    ))
                }
            </div>

            <div className="relative">
                {
                    colors.map((x, i)=>(
                        <div key={i} className="size-24 mix-blend-screen absolute top-1/2 left-1/2 -translate-x-1/2" style={{backgroundColor: x}}>{colors.length}</div>
                    ))
                }
                Final Color: {blendColors(colors)}
            </div>
        </div>
    )
}