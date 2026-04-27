'use client';

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login(){
    const [passphrase, setPassphrase] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const submit = async() => {
        try {
            
            setIsLoading(true)
            
            const res = (await axios.post("/07_module_b/api/login", {passphrase}))
            console.log("sometjomh", res)
            if(res.status===200) router.push("/07_module_b")
        } catch (error) {
            alert("Login Failed")
            console.log(error)
        }
        setIsLoading(false)

    }
    return (
        <div className="w-screen h-screen flex justify-center items-center bg-slate-200">
            <div className="bg-white w-80 min-h-40 flex flex-col gap-4 justify-center items-center rounded-2xl shadow-md p-4">
                <h1 className="font-bold text-2xl ">Login</h1>
                <div className="w-full">
                    <p className="font-bold">Passphrase</p>
                    <input type="password" className="border border-black rounded-xl p-2 text-black w-full" value={passphrase} onChange={(e)=>setPassphrase(e.target.value)}/>
                </div>
                <button className="bg-black text-white rounded-xl p-2 w-full cursor-pointer" disabled={isLoading} onClick={submit}>Login</button>
            </div>
        </div>
    )
}