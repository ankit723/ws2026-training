'use client';

import axios from "axios";
import { useState } from "react";

export default function Page(){
    const [text, setTexts] = useState("")
    const [result, setResult] = useState<{gtin: string, verified: boolean}[]>()
    const onSubmit = async()=>{
        try {
            const res = (await axios.post("/03_module_b/api/verify", {ids: text})).data
            setResult(res.res)

        } catch (error) {
            alert(error)
        }

    }
    return(
        <div className="w-screen h-screen flex flex-col justify-center items-center p-20 gap-10">
            <textarea name="text" id="" value={text} onChange={(e)=>setTexts(e.target.value)} rows={10} className="border p-2 w-full"></textarea>
            <button className="text-white bg-black p-2 w-40 rounded-md" onClick={onSubmit}>Check</button>

            {
                result?.map((r, i)=>(
                    <p key={i}>{r.gtin} - {r.verified?"VErified":"Not Verified"}</p>
                ))
            }
        </div>
    )
}