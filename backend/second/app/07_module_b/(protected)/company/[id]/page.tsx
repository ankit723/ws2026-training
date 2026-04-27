'use client';

import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CompanyPage(){
    const [company, setCompany] = useState<any>({})
    const [isLoading, setIsLoading] = useState(true)
    const {id} = useParams()

    const fetchCompany = async()=>{
        setIsLoading(true)
        const comp = (await axios.get(`/07_module_b/api/company/${id}`, {withCredentials: true})).data
        console.log(comp)
        setCompany(comp.company);
        setIsLoading(false)
    }

    useEffect(()=>{
        fetchCompany()
    }, [id])

    if(isLoading) return (
        <div className="">Loading</div>
    )

    return(
        <div className="w-screen h-screen flex flex-col justify-center items-center gap-4">
            <div className="border p-2 rounded-md">
                <h1 className="text-2xl font-bold">Company Details</h1>

                <div className="my-2">
                    <p>Company Name: {company.name}</p>
                    <p>Company Email: {company.email}</p>
                    <p>Company Phone: {company.phone}</p>
                    <p>Company Address: {company.address}</p>

                    <h2>Owner Info</h2>
                    <p>Owner Name: {company.owner.owner_name}</p>
                    <p>Owner Email: {company.owner.owner_email}</p>
                    <p>Owner Phone: {company.owner.owner_phone}</p>
                   
                    <h2>Contact Info</h2>
                    <p>Contact Name: {company.contact.contact_name}</p>
                    <p>Contact Email: {company.contact.contact_email}</p>
                    <p>Contact Phone: {company.contact.contact_phone}</p>
                </div>

                <Link href={`/07_module_b/company/new?update=${company.id}`} className="bg-black text-white p-2 w-40 rounded-md mt-2">Update Company</Link>
            </div>

            <div className="border p-2 rounded-md">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Products</h1>
                    <Link href={`/07_module_b/products/new`} className="bg-black text-white p-2 w-40 rounded-md mt-2">Create Product</Link>

                </div>

                {company.products.map((p:any)=>(
                    <Link key={p.id} href={`/07_module_b/products/${p.id}`}>{p.name}</Link>
                ))}
            </div>
        </div>
    )
}