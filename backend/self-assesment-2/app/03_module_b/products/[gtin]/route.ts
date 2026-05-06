import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function  GET(req: NextRequest, {params}:{params: Promise<{gtin: string}>}) {
    let {gtin} = await params;
    if(gtin.includes(".json")){
        gtin = gtin.replace(".json", "")
    }else{
        return NextResponse.json({message: "wrong URl, please include .json at the end"})
    }
    const product = await prisma.product.findMany({where: {gtin: BigInt(gtin), hidden: false}})
    if(!product) return NextResponse.json({message: "Product not found",status: 404}, {status: 404})
    const newP = product.map(p=>({
        ...p,
        gtin: p.gtin.toString()
    }))

    return NextResponse.json({product: newP}, {status: 200})
}