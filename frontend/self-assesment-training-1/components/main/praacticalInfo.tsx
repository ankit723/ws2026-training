'use client'

import { InfoItems } from "@/app/generated/prisma/client";
import { getInfor } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react"

export const PracticalInformation = ()=>{

    const [category, setCategory] = useState("transportation")
    const [infoItems, setInfoItems] = useState<InfoItems[]>();

    const getInfo = async()=>{
        const info = await getInfor()
        setInfoItems(info)
    }

    useEffect(()=>{
        getInfo()
    }, [category])

    return(
        <div className="w-full bg-white container mx-auto my-20">

            <h1 className="text-3xl font-bold ">Practical Information</h1>
            <p className="mt-3 text-xl">Pack the essentials—travel made simple.</p>

            <div className="w-70 lg:w-100 text-xs lg:text-sm rounded-full bg-white grid grid-cols-3 text-center text-black font-bold mt-4 lg:mt-20">
                <p className="w-full h-full p-2 rounded-l-full" style={{backgroundColor: category==="transportation"?"#162456":"", color: category==="transportation"? "white":""}} onClick={()=>setCategory("transportation")}>Transportation</p>
                <p className="w-full h-full p-2 " style={{backgroundColor: category==="accomodation"?"#162456":"", color: category==="accomodation"? "white":""}} onClick={()=>setCategory("accomodation")}>Accomodation</p>
                <p className="w-full h-full p-2 rounded-r-full" style={{backgroundColor: category==="shopping"?"#162456":"", color: category==="shopping"? "white":""}} onClick={()=>setCategory("shopping")}>Shopping</p>
            </div>

            <div className="w-full flex flex-col lg:flex-row justify-between items-center mt-10">
                {
                    infoItems?.map(i=>(
                        i.category.toLowerCase()===category && (
                            <button key={i.id} className=" group h-fit lg:w-80 w-full border border-slate-500 p-3 my-2 rounded-xl shadow-2xl">
                                <div className="flex">
                                    <Image src={i.icon} alt="icon" width={30} height={30} className="border-slate-400"/>
                                    <h1 className="font-bold text-md">{i.title}</h1>
                                </div>
                                <div className="group-focus:flex flex-col hidden mt-2 gap-3">
                                    <p className="">{i.body}</p>
                                    <p className="bg-blue-950 text-white p-2 rounded-full" onClick={()=>{
                                        const utt = new SpeechSynthesisUtterance(i.body)
                                        window.speechSynthesis.speak(utt)
                                    }}>Read Aloud</p>
                                    <p  className="bg-blue-950 text-white p-2 rounded-full" onClick={()=>{
                                        window.speechSynthesis.cancel()
                                    }}>Stop Reading</p>
                                </div>
                            </button>
                        )
                    ))
                }
            </div>

        </div>
    )
}