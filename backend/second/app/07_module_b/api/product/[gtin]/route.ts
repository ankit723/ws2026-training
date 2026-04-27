import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest, {params}:{params: Promise<{gtin: string}>}) {
    try {
        const token = req.cookies.get("token")?.value
        if(token!=="admin") return NextResponse.json({message: "Invalgtin Auth"}, {status: 401})
        const {gtin} = await params;
        const product = await prisma.product.findUnique({where:{gtin}, include:{company: true}});
        return NextResponse.json({product}, {status: 200})
    } catch (error) {
        console.log("Error: ", error)
        return NextResponse.json({message: "There is some error from our end", error}, {status: 500})
    }
}


export async function PUT(req:NextRequest, {params}:{params: Promise<{gtin: string}>}) {
    try {
        const token = req.cookies.get("token")?.value
        if(token!=="admin") return NextResponse.json({message: "Invalgtin Auth"}, {status: 401})
        const {gtin} = await params;

        const {name, french_name, description, french_description, brand_name, origin_country, gross_weight, net_weight, product_weight} = await req.json()

        const product = await prisma.product.update({
            where:{gtin},
            data:{
                gtin,
                name,
                french_name,
                description,
                french_description,
                brand_name,
                origin_country,
                gross_weight,
                net_weight,
                product_weight,
            }
        })
        return NextResponse.json({product}, {status: 200})
    } catch (error) {
        console.log("Error: ", error)
        return NextResponse.json({message: "There is some error from our end", error}, {status: 500})
    }
}


export async function PATCH(req:NextRequest, {params}:{params: Promise<{gtin: string}>}) {
    try {
        const token = req.cookies.get("token")?.value
        if(token!=="admin") return NextResponse.json({message: "Invalgtin Auth"}, {status: 401})
        const {gtin} = await params;
        const c = await prisma.product.findUnique({where:{gtin}});

        if(!c) return NextResponse.json({message: "product Does not exsits"})

        const product = await prisma.product.update({where:{gtin}, data:{active: !c?.active}});
        return NextResponse.json({product}, {status: 200})
    } catch (error) {
        console.log("Error: ", error)
        return NextResponse.json({message: "There is some error from our end", error}, {status: 500})
    }
}