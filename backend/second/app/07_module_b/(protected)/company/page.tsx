'use client'

import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Companies(){
    const [activeCompanies, setActiveCompanies] = useState<any[]>([])
    const [inActiveCompanies, setInActiveCompanies] = useState<any[]>([])

    const fetchCompanies = async()=>{
        const comps = (await axios.get("/07_module_b/api/company", {withCredentials: true})).data
        setActiveCompanies(comps.activeCompanies)
        setInActiveCompanies(comps.inActiveCompanies)
    }

    useEffect(()=>{
        fetchCompanies()
    }, [])
    return(
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <Link href={"/07_module_b/company/new"}>New</Link>
            <div className="border p-2 ">
                <h1 className="font-bold text-2xl">Active Companies</h1>

                <div className="mt-2 flex flex-col gap-1">
                    {activeCompanies.map((a:any)=>(
                        <Link key={a.id} href={`/07_module_b/company/${a.id}`} className="border rounded-md">{a.name}</Link>
                    ))}
                </div>
            </div>
            <br />
            <br />
            <div className="">
                <h1>In-Active Companies</h1>

                <div className="">
                    {inActiveCompanies.map((i:any)=>(
                        <Link key={i.id} href={`/07_module_b/company/${i.id}`}>{i.name}</Link>
                    ))}
                </div>
            </div>
        </div>
    )
}