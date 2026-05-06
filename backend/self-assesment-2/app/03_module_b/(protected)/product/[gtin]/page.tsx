import prisma from "@/lib/prisma"
import Image from "next/image"
import { redirect } from "next/navigation"

export default async function Page({params}:{params:Promise<{gtin: bigint}>}){
    const {gtin} = await params
    console.log("getting prod")
    const product = await prisma.product.findUnique({where: {gtin}, include: {company: true}})
    console.log("prods")

    if(!product) redirect("/03_module_b/product")
    console.log(product)
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center">
            <Image width={200} height={200} src={product.imageUrl || ""} alt=""/>
            {Object.keys(product).map(p=>(
                p!=="company" && (
                    <p key={p}>{p} - {product[p]}</p>
                )
            ))}
        </div>
    )
}