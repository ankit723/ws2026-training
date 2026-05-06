import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    const query = req.nextUrl.searchParams.get("query")?.toLowerCase();


    if(!query){
        const products = await prisma.product.findMany({})
        return NextResponse.json({products}, {status: 200})

    }

    const products = await prisma.product.findMany({
        where: {
            OR:[
                {
                    name: {
                        contains: query,
                        mode: "insensitive"
                    },
                },
                {
                    french_name: {
                        contains: query,
                        mode: "insensitive"
                    },
                },
                {
                    description: {
                        contains: query,
                        mode: "insensitive"
                    },
                },
                {
                    french_description: {
                        contains: query,
                        mode: "insensitive"
                    }
                }
            ]
        }
    })

    return NextResponse.json({products}, {status: 200})
}