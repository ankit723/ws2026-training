import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// ✅ GET ALL PRODUCTS
export const GET = async (req: NextRequest) => {
    try {
        const token = req.cookies.get("token")?.value;

        if (!token || token !== "admin") {
            return NextResponse.json(
                { message: "User Unauthorized" },
                { status: 401 }
            );
        }

        const products = await prisma.product.findMany({
            where: {
                hidden: false, // optional but recommended
            },
        });
        
        const products2 = await prisma.product.findMany({
            where: {
                hidden: true, // optional but recommended
            },
        });



        return NextResponse.json({ products, hidden_products: products2 }, { status: 200 });

    } catch (error) {
        console.log("error: ", error);

        return NextResponse.json(
            { message: "There is some server error", error },
            { status: 500 }
        );
    }
};


// ✅ CREATE PRODUCT
export async function POST(req: NextRequest) {
    try {
        const token = req.cookies.get("token")?.value;

        if (!token || token !== "admin") {
            return NextResponse.json(
                { message: "User Unauthorized" },
                { status: 401 }
            );
        }

        const {
            gtin,
            name,
            french_name,
            description,
            french_description,
            brand,
            origin,
            gross_weight,
            content_weight,
            unit_weight,
            company_id
        } = await req.json();

        if (!gtin || !name || !company_id) {
            return NextResponse.json(
                { message: "gtin, name, company_id are required" },
                { status: 400 }
            );
        }

        const product = await prisma.product.create({
            data: {
                gtin,
                name,
                french_name,
                description,
                french_description,
                brand,
                origin,
                gross_weight: parseFloat(gross_weight),
                content_weight: parseFloat(content_weight),
                unit_weight: parseFloat(unit_weight),
                company_id,
            },
        });

        return NextResponse.json({ product }, { status: 201 });

    } catch (error: any) {
        console.log("error: ", error);

        // duplicate GTIN handling
        if (error.code === "P2002") {
            return NextResponse.json(
                { message: "GTIN already exists" },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: "There is some server error", error },
            { status: 500 }
        );
    }
}