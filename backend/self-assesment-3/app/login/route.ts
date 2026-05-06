import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

export function generateAccessToken(username: string) {
    return crypto
        .createHash('md5')
        .update(username)
        .digest('hex'); // already lowercase
}

console.log(generateAccessToken("ankit123"));

export async function POST(req: NextRequest){
    const formData = await req.formData()
    const username = formData.get("username") as string
    const password = formData.get("password") as string

    if(!username || !password){
        return NextResponse.json({message: "All fields not provided"}, {status: 400})
    }

    let user = await prisma.user.findUnique({where:{username}})

    if(!user) return NextResponse.json({message: "Usermame not found"}, {status: 404})

    if(!(await bcrypt.compare(password, user.password))) return NextResponse.json({message: "Wrong Password"}, {status: 401})

    const token = generateAccessToken(username)
    user = await prisma.user.update({where:{username}, data:{token}}) 

    const {password: _, token: __, ...safeUser} = user

    return NextResponse.json({success: true, data: {token, user: safeUser}})
}

