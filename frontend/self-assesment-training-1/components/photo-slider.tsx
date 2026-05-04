import { useState } from "react"

export const PhotoSlider = ({image, setState}:{image:string, setState:any})=>{
    return (
        <div className="w-full h-[250px] sm:h-[400px]" style={{backgroundImage:`url(${image})`, backgroundPosition: "center", backgroundSize: "cover"}}>
            <div className="absolute top-1/2 left-2 -translate-y-1/2 bg-white p-2 px-4 rounded-full cursor-pointer" onClick={()=>{
                setState((p: number)=>p>0?p-1:p)
            }}>{"<"}</div>
            
            <div className="absolute top-1/2 right-2 -translate-y-1/2 bg-white p-2 px-4 rounded-full cursor-pointer" onClick={()=>{
                setState((p: number)=>p<2?p+1:p)
            }}>{">"}</div>
        </div>
    )
}