import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req:NextRequest) {
    try {
        const token = req.cookies.get("token")?.value
        if(token!=="admin") return NextResponse.json({message: "Invalid Auth"}, {status: 401})

        const {gtin, name, french_name, description, french_description, brand_name, origin_country, gross_weight, net_weight, product_weight, companyId} = await req.json()

        const product = await prisma.product.create({
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
                companyId
            }
        })

        return NextResponse.json({product}, {status: 201})
    } catch (error) {
        console.log("Error: ", error)
        return NextResponse.json({message: "There is some error from our end", error}, {status: 500})
    }
}