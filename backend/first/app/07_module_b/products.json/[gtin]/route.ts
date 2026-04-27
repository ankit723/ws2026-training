import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ gtin: string }> }
) {
    try {
        const {gtin} = await params;
        console.log("gtin: ", gtin)
        const token = req.cookies.get("token")?.value;

        if (!token || token !== "admin") {
            return NextResponse.json(
                { message: "User Unauthorized" },
                { status: 401 }
            );
        }

        const product = await prisma.product.findUnique({
            where: { gtin },
        });

        return NextResponse.json({ product }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Server error", error },
            { status: 500 }
        );
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ gtin: string }> }
) {
    try {
        const {gtin} = await params;
        const token = req.cookies.get("token")?.value;

        if (!token || token !== "admin") {
            return NextResponse.json(
                { message: "User Unauthorized" },
                { status: 401 }
            );
        }

        const {
            name,
            french_name,
            description,
            french_description,
            brand,
            origin,
            gross_weight,
            content_weight,
            unit_weight
        } = await req.json();

        const product = await prisma.product.update({
            where: { gtin: gtin },
            data: {
                name,
                french_name,
                description,
                french_description,
                brand,
                origin,
                gross_weight: parseFloat(gross_weight),
                content_weight: parseFloat(content_weight),
                unit_weight: parseFloat(unit_weight),
            }
        });

        return NextResponse.json({ product }, { status: 200 });

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Server error", error },
            { status: 500 }
        );
    }
}


export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ gtin: string }> }
) {
    try {
        const {gtin} = await params;
        const token = req.cookies.get("token")?.value;

        if (!token || token !== "admin") {
            return NextResponse.json(
                { message: "User Unauthorized" },
                { status: 401 }
            );
        }

        const product = await prisma.product.update({
            where: { gtin: gtin },
            data: { hidden: true }
        });

        return NextResponse.json(
            { message: "Product has been hidden", product },
            { status: 200 }
        );

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Server error", error },
            { status: 500 }
        );
    }
}