import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { NextRequest, NextResponse } from "next/server"
import { generateAccessToken } from "../login/route"

export async function POST(req: NextRequest){
    const formData = await req.formData()
    const username = formData.get("username") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if(!username || !email || !password){
        return NextResponse.json({message: "All fields not provided"}, {status: 400})
    }

    const Euser = await prisma.user.findFirst({where:{OR:[{email}, {username}]}})

    if(Euser) return NextResponse.json({message: "Usermame or email already taken"}, {status: 409})

    const hash =await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            username,
            email,
            password: hash,
            role: "Admin"
        }
    })

    const {password: _, ...safeUser} = user

    return NextResponse.json({success: true, data: {user: safeUser}})
}