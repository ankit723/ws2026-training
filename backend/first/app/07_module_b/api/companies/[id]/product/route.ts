import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// ✅ GET PRODUCTS BY COMPANY
export const GET = async (
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {
    try {
        const {id} = await params;
        const token = req.cookies.get("token")?.value;

        if (!token || token !== "admin") {
            return NextResponse.json(
                { message: "User Unauthorized" },
                { status: 401 }
            );
        }

        const products = await prisma.product.findMany({
            where: {
                company_id: id,
            },
        });

        return NextResponse.json({ products }, { status: 200 });

    } catch (error) {
        console.log("error: ", error);
        return NextResponse.json(
            { message: "Server error", error },
            { status: 500 }
        );
    }
};


// ✅ CREATE PRODUCT
export const POST = async (
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {
    try {
        const {id} = await params;
        const token = req.cookies.get("token")?.value;

        if (!token || token !== "admin") {
            return NextResponse.json(
                { message: "User Unauthorized" },
                { status: 401 }
            );
        }

        const body = await req.json();

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
        } = body;

        // ⚠️ basic validation
        if (!gtin || !name) {
            return NextResponse.json(
                { message: "GTIN and Name are required" },
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
                company_id: id,
            },
        });

        return NextResponse.json({ product }, { status: 201 });

    } catch (error: any) {
        console.log("error: ", error);

        // 👇 handle duplicate GTIN nicely
        if (error.code === "P2002") {
            return NextResponse.json(
                { message: "GTIN already exists" },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: "Server error", error },
            { status: 500 }
        );
    }
};