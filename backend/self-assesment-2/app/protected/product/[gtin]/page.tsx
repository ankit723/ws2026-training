import prisma from "@/lib/prisma"
import Image from "next/image"
import { redirect } from "next/navigation"

export default async function Page({params}:{params:Promise<{gtin: bigint}>}){
    const {gtin} = await params
    console.log("getting prod")
    const product = await prisma.product.findUnique({where: {gtin}, include: {company: true}})
    console.log("prods", product)

    if(!product) redirect("/03_module_b/protected/product")
    console.log(product)
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center">
            {(product.imageUrl && product.imageUrl?.length>0)?(
                <Image width={200} height={200} src={"/03_module_b"+product.imageUrl || ""} alt=""/>
            ):(
                <p className="text-xl font-bold p-20 border ">Deault Image</p>
            )}
            {(Object.keys(product) as (keyof typeof product)[]).map((c) => (
                c !== "company" && c!=="gtin" && (
                    <p key={c}>
                        {c} - {JSON.stringify(product[c])}
                    </p>
                )
                ))}
        </div>
    )
}