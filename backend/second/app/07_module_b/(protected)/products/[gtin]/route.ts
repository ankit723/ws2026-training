import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest, {params}:{params: Promise<{gtin: string}>}) {
    try {
        const token = req.cookies.get("token")?.value
        if(token!=="admin") return NextResponse.json({message: "Invalgtin Auth"}, {status: 401})
        let {gtin} = await params;
        if (!gtin.endsWith(".json")) {
            return NextResponse.json({ message: "Invalid route" }, { status: 400 });
        }

        gtin = gtin.replace(".json", "");
        const product = await prisma.product.findUnique({where:{gtin}, include:{company: true}});
        return NextResponse.json({product}, {status: 200})
    } catch (error) {
        console.log("Error: ", error)
        return NextResponse.json({message: "There is some error from our end", error}, {status: 500})
    }
}