'use client'

import axios from "axios"
import { useState } from "react"

export default function Verify(){
    const [gtins, setGtins] = useState("")
    const [res, setRes] = useState<any[]>([])
    const verify = async()=>{
        setRes([])
        const result = await Promise.all(
            gtins.split("\n").map(async(g)=>{
                console.log(g)
                const v = (await axios.post("/07_module_b/api/verify", {gtin:g.trim()})).data
                return v
            })
        )
        setRes(result)
    }
    return(
        <div className="w-screen h-screen flex flex-col justify-around items-center p-4">
            <h1 className="text-3xl font-bold ">Enter all the gtin with new line character</h1>
            <div className="flex gap-10">
                <textarea name="" id="" className="border w-7xl p-4" onChange={(e)=>setGtins(e.target.value)}></textarea>
                <div className="">
                    {res.map((r, i)=>(
                        <div  key={i} className="">{r.gtin}: {r.isVerified ? "✅ Verified" : "❌ Invalid"}</div>
                    ))}
                </div>
            </div>

            <button onClick={verify}>Verify</button>
        </div>
    )
}