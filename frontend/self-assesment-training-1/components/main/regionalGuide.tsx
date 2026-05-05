'use client';
import { getRegAndAtt } from "@/lib/utils";
import Image from "next/image"
import { useEffect, useState } from "react"

export const RegionalGuide =()=>{

    const [regions, setRegions] = useState<any[]>()
    const [selected, setSelected] = useState("central")

    const getRegions= async()=>{
        const res = await getRegAndAtt()
        setRegions(res)
    }

    useEffect(()=>{
        getRegions()
    }, [])

    return(
        <div className="w-full bg-white container mx-auto my-20">
            <h1 className="text-3xl font-bold ">Regional Guide</h1>
            <p className="mt-3 text-xl">Click a region on the map to explore</p>

            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="w-full flex justify-center items-center relative" >
                    <div className="w-1/2 h-full grid grid-cols-2 grid-rows-10 absolute top-1/2 left-1/2 -translate-1/2">
                        <div className={`bg-[#22c55e86] col-span-2 row-span-2 rounded-xl hover:shadow-lg hover:shadow-[#22c55e86] transition-all hover:scale-102 active:scale-98 cursor-pointer ${selected.toLowerCase()==="north"&&"shadow-[#22c55e86] shadow-xl scale-105"}`} onClick={()=>setSelected("north")}></div>
                        <div className={`bg-[#06b6d486] col-span-1 row-span-6 rounded-xl hover:shadow-lg hover:shadow-[#06b6d486] transition-all hover:scale-102 active:scale-98 cursor-pointer ${selected.toLowerCase()==="central"&&"shadow-[#06b6d486] shadow-xl scale-105"}`} onClick={()=>setSelected("central")}></div>
                        <div className={`bg-[#c5b52286] col-span-1 row-span-6 rounded-xl hover:shadow-lg hover:shadow-[#c5b52286] transition-all hover:scale-102 active:scale-98 cursor-pointer ${selected.toLowerCase()==="east"&&"shadow-[#c5b52286] shadow-xl scale-105"}`} onClick={()=>setSelected("east")}></div>
                        <div className={`bg-[#f9731686] col-span-2 row-span-2 rounded-xl hover:shadow-lg hover:shadow-[#f9731686] transition-all hover:scale-102 active:scale-98 cursor-pointer ${selected.toLowerCase()==="south"&&"shadow-[#f9731686] shadow-xl scale-105"}`} onClick={()=>setSelected("south")}></div>
                    </div>
                    <Image src={"/03_module_d/media_files/images/taiwan-map.svg"} alt="map" width={600} height={100}/>
                </div>

                <div className="w-full h-fit grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {regions?.map(r=>(
                        <button key={r.key} className={`p-3 border rounded-xl m-5 h-fit transition-all group text-left hover:shadow-lg hover:shadow-[#22c55e86] hover:scale-102 active:scale-98 cursor-pointer ${selected.toLowerCase()===r.name.toLowerCase()&&"shadow-[#22c55e86] shadow-lg scale-102"}`} style={{borderColor: r.color}} onClick={()=>setSelected(r.name)}>
                            <div className="flex items-center justify-between" >
                                <p className="font-bold ">{r.name}</p>
                                <div className="w-4 h-4 rounded-full" style={{backgroundColor:r.color}}></div>
                            </div>
                            <p className="text-slate-600 mt-2 font-medium">{r.summary}</p>
                            
                            <div className={`mt-3 ${selected.toLowerCase()===r.name.toLowerCase()?"block":"hidden"}`}>
                                {
                                    r.attractions.map((a: any)=>(
                                        <p key={a.id} className="text-slate-600"><span className="font-bold">{a.name}: </span>{a.description}</p>
                                    ))
                                }
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}