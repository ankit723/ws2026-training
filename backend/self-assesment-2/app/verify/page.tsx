'use client'

import { verifyGTIN } from "@/lib/verify"
import { CheckIcon } from "lucide-react"
import { useState } from "react"

export default function Page(){
    const [text, setText] = useState("")
    const [res, setRes] = useState<{gtin: string, verified: boolean}[]>()
    const [all, setAll] = useState(false)

    const verify = async ()=>{
        const resu = await verifyGTIN(text)
        setRes(resu.res)
        setAll(resu.allVerified)
    }
    

    return (
        <div className="">
            <textarea name="text" id="verify" value={text} onChange={(e)=>setText(e.target.value)} className="border"></textarea>
            <button onClick={verify}>Verify</button>

            <div className="border">
                {all &&(
                    <>
                    <CheckIcon color="green"/>
                    "All Verified"
                    </>
                )}
                {res?.map(r=>(
                    <p>{r.gtin} - {r.verified? "True":"False"}</p>
                ))}
            </div>
        </div>
    )
}