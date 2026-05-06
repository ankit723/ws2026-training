import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req:NextRequest, {params}:{params: Promise<{gtin: string}>}) {
    try{
        let {gtin} = await params; 
        if(!gtin.includes(".json")) return NextResponse.json({message: "Invalid URL"})
        gtin=gtin.replace(".json","")
        console.log("gtin: ", gtin)
        const product = await prisma.product.findUnique({where:{gtin}, include: {company: true}})
        return NextResponse.json({product}, {status: 200})

    }catch(err){
        console.log(err)
        return NextResponse.json({message:"There is some error from our end", err}, {status: 500})
    }
    
}