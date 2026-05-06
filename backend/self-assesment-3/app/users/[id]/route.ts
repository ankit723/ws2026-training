import prisma from "@/lib/prisma";
import { checkUser } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, {params}:{params: Promise<{id: string}>}) {
    const {id} = await params;
    const {role} = await req.json()

    const uid = parseInt(id)

    if(role!=="user" && role!=="Admin") return NextResponse.json({message: "Incorrect role"}, {status: 400})

    const {status, user} = await checkUser(req, true)
    if(!status || !user) return NextResponse.json({message: "Admin Access Required"}, {status: 403})

    if(!id) return NextResponse.json({message: "Invalid Parameter"}, {status: 400})

    let upUser = await prisma.user.findUnique({where:{id: uid}})
    
    if(!upUser) return NextResponse.json({message: "User not found"}, {status: 404})

    upUser = await prisma.user.update({where: {id: uid}, data:{
        role:(role==="user"?"user":"Admin")
    }})

    const {password, token, ...safeUser} = upUser

    return NextResponse.json({success: true, data: safeUser})
} 