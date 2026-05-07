import prisma from "@/lib/prisma";
import { checkUser } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const {status, user} = await checkUser(req, false);
    if(status){
        const up = await prisma.user.update({
            where: {id: user?.id},
            data: {token: null},
        })
    }

    return NextResponse.json({success: true}, {status: 200})
}


