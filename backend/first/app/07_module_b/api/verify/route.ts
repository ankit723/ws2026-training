import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const {gtin} = await req.json()

    const product = await prisma.product.findUnique({where:{gtin}})
    let isVerified = false
    if(product && !product.hidden) isVerified=true
    return NextResponse.json({
        gtin,
        isVerified
    })
}