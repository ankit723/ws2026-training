import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const {ids} = await req.json()

    const s_ids = ids.split("\n")

    const res:{gtin: string, verified: boolean}[] = []
    await Promise.all(s_ids.map(async(gtin: string)=>{
        const prod = await prisma.product.findUnique({where:{gtin: gtin.trim(), active: true}})
        if(prod){
            res.push({gtin, verified: true})
        }else{
            res.push({gtin, verified: false})
        }
    }))

    return NextResponse.json({res}, {status: 200})
}