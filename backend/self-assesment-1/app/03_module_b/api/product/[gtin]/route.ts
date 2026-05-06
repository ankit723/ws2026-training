import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req:NextRequest, {params}:{params: Promise<{gtin: string}>}) {
    try{
        const {gtin} = await params; 
        const product = await prisma.product.findUnique({where:{gtin}, include: {company: true}})
        return NextResponse.json({product}, {status: 200})

    }catch(err){
        console.log(err)
        return NextResponse.json({message:"There is some error from our end", err}, {status: 500})
    }
}



export async function PATCH(req:NextRequest, {params}:{params: Promise<{gtin: string}>}) {
    try{
        if(req.cookies.get("token")?.value!=="admin") return NextResponse.json({message: "Not Authenticated"}, {status: 401})
        const {gtin} = await params;
        const c = await prisma.product.findUnique({where:{gtin}, include: {company: true}})
        if(!c?.company.active && !c?.active) return NextResponse.json({message: "Company Inactive "})
        const product = await prisma.product.update({where: {gtin}, data:{
           active: !c?.active
            
        }})
        return NextResponse.json({product}, {status: 202})

    }catch(err){
        console.log(err)
        return NextResponse.json({message:"There is some error from our end", err}, {status: 500})
    }
}