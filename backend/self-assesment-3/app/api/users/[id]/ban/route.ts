import prisma from "@/lib/prisma";
import { checkUser } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, {params}:{params: Promise<{id: string}>}) {
    const {id} = await params;

    const {status, user} = await checkUser(req, true)
    if(!status || !user) return NextResponse.json({message: "Admin access required"}, {status: 403})

    if(!id) return NextResponse.json({message: "Invalid Parameter"}, {status: 400})

    let upUser = await prisma.user.findUnique({where:{id: parseInt(id)}})

    if(!upUser) return NextResponse.json({message: "User not found"}, {status: 404})
    
    if(upUser?.id===user.id) return NextResponse.json({message: "Cannot ban self"}, {status: 400})

    if(upUser.isBan) return NextResponse.json({message: "User is already Ban"}, {status: 403})

    upUser = await prisma.user.update({where: {id: parseInt(id)}, data:{
        isBan: true
    }})

    const {password, token, ...safeUser} = upUser
    
    return NextResponse.json({success: true, data: safeUser})
} 