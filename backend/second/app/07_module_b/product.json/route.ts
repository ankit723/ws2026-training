import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    try {
        const token = req.cookies.get("token")?.value
        if(token!=="admin") return NextResponse.json({message: "Invalid Auth"}, {status: 401})
        const query = req.nextUrl.searchParams.get("query")!
        const activeProducts = await prisma.product.findMany({
            where: {
                active: true,
                OR:[
                    {
                        name: {
                            contains: query,
                            mode: "insensitive"
                        },
                        french_name: {
                            contains: query,
                            mode: "insensitive"
                        },
                        description: {
                            contains: query,
                            mode: "insensitive"
                        },
                        french_description: {
                            contains: query,
                            mode: "insensitive"
                        }
                    }
                ]
            }
        });
        const inActiveProducts = await prisma.product.findMany({
            where: {
                active: false,
                OR:[
                    {
                        name: {
                            contains: query,
                            mode: "insensitive"
                        },
                        french_name: {
                            contains: query,
                            mode: "insensitive"
                        },
                        description: {
                            contains: query,
                            mode: "insensitive"
                        },
                        french_description: {
                            contains: query,
                            mode: "insensitive"
                        }
                    }
                ]
            }
        });
        return NextResponse.json({activeProducts, inActiveProducts}, {status: 200})
    } catch (error) {
        console.log("Error: ", error)
        return NextResponse.json({message: "There is some error from our end", error}, {status: 500})
    }
}