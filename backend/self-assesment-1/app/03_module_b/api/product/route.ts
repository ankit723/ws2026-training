import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try{
        if(req.cookies.get("token")?.value!=="admin") return NextResponse.json({message: "Not Authenticated"}, {status: 401})
        let {gtin, name, french_name, description, french_description, brand_name, country, p_weight, n_weight, g_weight, image, companyId} = await req.json()
        gtin = gtin.toString()
        console.log("len", gtin.length)
        if(gtin.length<13 || gtin.length>14) return NextResponse.json({message: "Invalid GTIN"}, {status: 401})
        n_weight = parseFloat(n_weight)
        g_weight = parseFloat(g_weight)
        p_weight = parseFloat(p_weight)
        const product = await prisma.product.create({data:{
            gtin,
            name,
            french_name,
            description,
            french_description,
            brand_name,
            country,
            p_weight,
            n_weight,
            g_weight,
            image,
            companyId
        }, include: {company: true}})
        return NextResponse.json({product}, {status: 201})

    }catch(err){
        console.log(err)
        return NextResponse.json({message:"There is some error from our end", err}, {status: 500})
    }
}