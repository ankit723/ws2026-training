'use client'

import axios from "axios"
import { useState } from "react"

export default function Login(){
    const [passphrase, setPassphrase] = useState("")

    const handleSubmit = async()=>{
        try {
            const res = (await axios.post("/07_module_b/api/login", {passphrase}))
            alert("login Successfull")
            window.location.reload();
        } catch (error) {
            console.error("error: ", error)
        }
    }
    return(
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <input type="text" name="passphrase" className="border p-2 rounded-md " value={passphrase} onChange={(e)=>setPassphrase(e.target.value)} />

            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}