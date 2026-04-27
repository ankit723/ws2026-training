'use client';

import axios from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreateOrUpdateCompany(){
    const [company, setCompany] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        owner_name: "",
        owner_email: "",
        owner_phone: "",
        contact_name: "",
        contact_email: "",
        contact_phone: "",
    })
    const [isLoading, setIsLoading] = useState(true)
    const id = useSearchParams().get("update")
    const router = useRouter()

    const fetchCompany = async()=>{
        setIsLoading(true)
        const comp = (await axios.get(`/07_module_b/api/company/${id}`, {withCredentials: true})).data.company
        if(!comp){
            setIsLoading(false)
            return;
        }
        console.log(comp)
        setCompany({
            name: comp.name,
            email: comp.email,
            phone: comp.phone,
            address: comp.address,
            owner_name: comp.owner.owner_name,
            owner_email: comp.owner.owner_email,
            owner_phone: comp.owner.owner_phone,
            contact_name: comp.contact.contact_name,
            contact_email: comp.contact.contact_email,
            contact_phone: comp.contact.contact_phone,
        });
        setIsLoading(false)
    }

    const submit = async() => {
        try{
            if(id){
                const comp = (await axios.put(`/07_module_b/api/company/${id}`, {...company}, {withCredentials: true}))
                alert("Company Updated")
            }else{
                const comp = (await axios.post("/07_module_b/api/company", {...company}, {withCredentials: true}))
                alert("Company Created")
            }
            router.push("/07_module_b/company")
        }catch(error){
            console.error("error", error)
        }
    }

    useEffect(()=>{
        if(id){
            fetchCompany()
        }
    }, [id])
    return(
        <div className="w-screen h-screen flex flex-col justify-center items-center space-y-6">
            <input type="text" className="border p-2 rounded-md" name="name" placeholder="name" value={company.name} onChange={(e)=>setCompany({...company, [e.target.name]: e.target.value})}/>
            <input type="email" className="border p-2 rounded-md" name="email" placeholder="email" value={company.email} onChange={(e)=>setCompany({...company, [e.target.name]: e.target.value})}/>
            <input type="text" className="border p-2 rounded-md" name="phone" placeholder="phone number" value={company.phone} onChange={(e)=>setCompany({...company, [e.target.name]: e.target.value})}/>
            <input type="text" className="border p-2 rounded-md" name="address" placeholder="address" value={company.address} onChange={(e)=>setCompany({...company, [e.target.name]: e.target.value})}/>

            <input type="text" className="border p-2 rounded-md" name="owner_name" placeholder="Owner name" value={company.owner_name} onChange={(e)=>setCompany({...company, [e.target.name]: e.target.value})}/>
            <input type="email" className="border p-2 rounded-md" name="owner_email" placeholder="Owner email" value={company.owner_email} onChange={(e)=>setCompany({...company, [e.target.name]: e.target.value})}/>
            <input type="text" className="border p-2 rounded-md" name="owner_phone" placeholder="Owner phone number" value={company.owner_phone} onChange={(e)=>setCompany({...company, [e.target.name]: e.target.value})}/>
            
            <input type="text" className="border p-2 rounded-md" name="contact_name" placeholder="Contact name" value={company.contact_name} onChange={(e)=>setCompany({...company, [e.target.name]: e.target.value})}/>
            <input type="email" className="border p-2 rounded-md" name="contact_email" placeholder="Contact email" value={company.contact_email} onChange={(e)=>setCompany({...company, [e.target.name]: e.target.value})}/>
            <input type="text" className="border p-2 rounded-md" name="contact_phone" placeholder="Contact phone number" value={company.contact_phone} onChange={(e)=>setCompany({...company, [e.target.name]: e.target.value})}/>
            <button onClick={submit} className="p-2 bg-black text-white rounded-md w-40 cursor-pointer">Submit</button>
        </div>
    )
}