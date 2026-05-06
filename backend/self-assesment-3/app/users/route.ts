import prisma from "@/lib/prisma";
import { checkUser } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    const searchParams = req.nextUrl.searchParams;
    
    const limit = parseInt(searchParams.get("limit") || "10")
    const cursor = searchParams.get("cursor") as string

    const {status, user} = await checkUser(req, true)
    if(!status || !user) return NextResponse.json({message: "Unauthorized"}, {status: 401})

    console.log("limit, cursor")
    
    const users = await prisma.user.findMany({
        take: limit+1,
        ...(cursor && {
            cursor: {
                id: parseInt(cursor)
            }
        }),
        orderBy: {
            id: "asc"
        }
    })

    let next_cursor = null
    if (users.length > limit) {
        const nextItem = users.pop(); // remove extra item
        next_cursor = nextItem?.id;
    }

    return NextResponse.json({
        success: true,
        data: users,
        meta: {
            prev_cursor: cursor,
            next_cursor: next_cursor
        }
    });

}