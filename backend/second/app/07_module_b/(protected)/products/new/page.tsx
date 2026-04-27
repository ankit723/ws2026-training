'use client';

import axios from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreateOrUpdateCompany(){
    const [product, setProduct] = useState({
        gtin: "",
        name: "",
        french_name: "",
        description: "",
        french_description: "",
        brand_name: "",
        origin_country: "",
        gross_weight: 1.0,
        net_weight: 1.0,
        product_weight: 1.0,
        active: true,
        companyId: ""
        
    })
    const [companies, setCompanies] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const id = useSearchParams().get("update")
    const router = useRouter()

    const fetchCompanies = async()=>{
        setIsLoading(true)
        const comps = (await axios.get(`/07_module_b/api/company`, {withCredentials: true})).data
        setCompanies([...comps.activeCompanies, ...comps.inActiveCompanies])
        console.log(comps)
        setIsLoading(false)
    }

    const submit = async() => {
        console.log(product)
        try{
            if(id){
                const comp = (await axios.put(`/07_module_b/api/product/${id}`, {...product}, {withCredentials: true}))
                alert("Product Updated")
            }else{
                const comp = (await axios.post("/07_module_b/api/product", {...product}, {withCredentials: true}))
                alert("Product Created")
            }
            router.push("/07_module_b/company")
        }catch(error){
            console.error("error", error)
        }
    }

    useEffect(()=>{
        fetchCompanies()
    }, [id])

    if(isLoading) return(
        <div className="">Loading...</div>
    )
    return(
        <div className="w-screen h-screen flex flex-col justify-center items-center space-y-6">
            <input type="text" className="border p-2 rounded-md" name="gtin" placeholder="GTIN" value={product.gtin} onChange={(e)=>setProduct({...product, [e.target.name]: e.target.value})}/>
            <input type="text" className="border p-2 rounded-md" name="name" placeholder="name" value={product.name} onChange={(e)=>setProduct({...product, [e.target.name]: e.target.value})}/>
            <input type="text" className="border p-2 rounded-md" name="french_name" placeholder="Name in French" value={product.french_name} onChange={(e)=>setProduct({...product, [e.target.name]: e.target.value})}/>
            <input type="text" className="border p-2 rounded-md" name="description" placeholder="Description" value={product.description} onChange={(e)=>setProduct({...product, [e.target.name]: e.target.value})}/>
            <input type="text" className="border p-2 rounded-md" name="french_description" placeholder="Description in French" value={product.french_description} onChange={(e)=>setProduct({...product, [e.target.name]: e.target.value})}/>
            <input type="text" className="border p-2 rounded-md" name="brand_name" placeholder="Brand Name" value={product.brand_name} onChange={(e)=>setProduct({...product, [e.target.name]: e.target.value})}/>

            <input type="text" className="border p-2 rounded-md" name="origin_country" placeholder="Country of Origin" value={product.origin_country} onChange={(e)=>setProduct({...product, [e.target.name]: e.target.value})}/>

            <input type="number" className="border p-2 rounded-md" name="gross_weight" placeholder="Gross Weight" value={product.gross_weight} onChange={(e)=>setProduct({...product, [e.target.name]: parseFloat(e.target.value)})}/>

            <input type="number" className="border p-2 rounded-md" name="net_weight" placeholder="Net Weight" value={product.net_weight} onChange={(e)=>setProduct({...product, [e.target.name]: parseFloat(e.target.value)})}/>

            <input type="number" className="border p-2 rounded-md" name="product_weight" placeholder="Product Weight" value={product.product_weight} onChange={(e)=>setProduct({...product, [e.target.name]: parseFloat(e.target.value)})}/>

            <select name="companyId" id="" value={product.companyId} onChange={(e)=>setProduct({...product, companyId: e.target.value})}>
                {companies.map((c:any)=>(
                    <option key={c.id} value={c.id}>{c.name}</option>
                ))}
            </select>
            <button onClick={submit} className="p-2 bg-black text-white rounded-md w-40 cursor-pointer">Submit</button>
        </div>
    )
}