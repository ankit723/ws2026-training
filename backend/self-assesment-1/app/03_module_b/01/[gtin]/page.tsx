'use client'

import axios from "axios"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Page(){
    const {gtin} = useParams()
    const [product, setProduct] = useState<any>({})
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const getProduct = async()=>{
            const prod = (await axios.get(`/03_module_b/products/${gtin}.json`)).data.product
            setProduct(prod)
            setLoading(false)
        }

        if(gtin){
            getProduct()
        }

    }, [gtin])


    if(loading){
        return (
            <div className="">Loading...</div>
        )
    }

    return(
        <div className="w-screen h-screen flex flex-col justify-center items-center p-40">
            <div className=" border p-40">
                {
                    Object.keys(product).map((o, i)=>(
                        <div key={i} className="">
                            {o}: {JSON.stringify(product[o])}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}