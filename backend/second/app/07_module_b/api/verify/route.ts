import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const {gtin} = await req.json()

    let isVerified = true;
    const product = await prisma.product.findUnique({where:{gtin}})

    if(!product || !product.active) isVerified=false

    return NextResponse.json({gtin, isVerified})
}