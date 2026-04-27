'use client'

import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Companies(){
    const [companies, setCompanies] = useState([])
    const [isOpen, setIsOpen] = useState(false)

    const [newCompany, setNewCompany] = useState({
        name: "",
        email: "",
        number: "",
        address: "",
        
        owner_name: "",
        owner_email: "",
        owner_number: "",
        
        contact_name: "",
        contact_email: "",
        contact_number: "",
    })

    const getCompanies = async()=>{
        const res = (await axios.get("/07_module_b/api/companies", {withCredentials: true})).data
        setCompanies(res.companies)
    }

    const submitCompany = async() => {
        const company = (await axios.post("/07_module_b/api/companies", newCompany, {withCredentials: true}))
        if(company.status===201){
            alert("Company created")
            getCompanies()
            setIsOpen(false)
        }
    }

    useEffect(()=>{
        getCompanies()
    }, [])

    return (
        <div className="w-screen h-screen flex flex-col items-center bg-slate-200 p-4">
            <h1 className="text-3xl font-bold">Companies</h1>
            <button className="bg-black text-white p-2 rounded-xl w-80 cursor-pointer" onClick={()=>setIsOpen(true)}>Add a new Company</button>

            <div className="">
                {companies.map((c:any)=>(
                    <Link href={`/07_module_b/companies/${c.id}`}>{c.name}</Link>
                ))}
            </div>

            <div className={`inset-0 w-screen h-screen flex justify-center items-center bg-[#000000ad] ${isOpen?"fixed":"hidden"}`}>
                <div className="bg-white rounded-2xl w-80 shadow-sm p-4 space-y-10">
                    <h1 className="text-2xl font-bold text-center">New Company</h1>
                    <div className="">
                        <p>Company Information</p>
                        <div className="border p-2 rounded-md">
                            <div className="">
                                <p>name</p>
                                <input type="text"  value={newCompany.name} onChange={(e)=>setNewCompany({...newCompany, name: e.target.value})}/>
                            </div>
                            <div className="">
                                <p>email</p>
                                <input type="email"  value={newCompany.email} onChange={(e)=>setNewCompany({...newCompany, email: e.target.value})}/>
                            </div>
                            <div className="">
                                <p>number</p>
                                <input type="text"  value={newCompany.number} onChange={(e)=>setNewCompany({...newCompany, number: e.target.value})}/>
                            </div>
                            <div className="">
                                <p>address</p>
                                <input type="text"  value={newCompany.address} onChange={(e)=>setNewCompany({...newCompany, address: e.target.value})}/>
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <p>Owner Information</p>
                        <div className="border p-2 rounded-md">
                            <div className="">
                                <p>Owner name</p>
                                <input type="text"  value={newCompany.owner_name} onChange={(e)=>setNewCompany({...newCompany, owner_name: e.target.value})}/>
                            </div>
                            <div className="">
                                <p>Owner email</p>
                                <input type="email"  value={newCompany.owner_email} onChange={(e)=>setNewCompany({...newCompany, owner_email: e.target.value})}/>
                            </div>
                            <div className="">
                                <p>Owner number</p>
                                <input type="text"  value={newCompany.owner_number} onChange={(e)=>setNewCompany({...newCompany, owner_number: e.target.value})}/>
                            </div>
                        </div>
                    </div>
                    
                    <div className="">
                        <p>Conatct Information</p>
                        <div className="border p-2 rounded-md">
                            <div className="">
                                <p>Contact name</p>
                                <input type="text"  value={newCompany.contact_name} onChange={(e)=>setNewCompany({...newCompany, contact_name: e.target.value})}/>
                            </div>
                            <div className="">
                                <p>Contact email</p>
                                <input type="email"  value={newCompany.contact_email} onChange={(e)=>setNewCompany({...newCompany, contact_email: e.target.value})}/>
                            </div>
                            <div className="">
                                <p>Contact number</p>
                                <input type="text"  value={newCompany.contact_number} onChange={(e)=>setNewCompany({...newCompany, contact_number: e.target.value})}/>
                            </div>
                        </div>
                    </div>
                
                    <button className="bg-black text-white p-2 rounded-xl w-full cursor-pointer" onClick={submitCompany}>Submit</button>
                </div>

            </div>
        </div>
    )
}