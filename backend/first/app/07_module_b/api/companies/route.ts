import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET=async(req:NextRequest)=>{
    try{
        const token = req.cookies.get("token")?.value
        if(!token || token!=="admin") return NextResponse.json({message: "User Unauthorized"}, {status: 401})
        const companies = await prisma.company.findMany({include: {contact: true, owner: true}})

        return NextResponse.json({companies}, {status: 200})

    }catch(error){
        console.log("error: ", error)
        NextResponse.json({message: "There is some error with the server", error}, {status: 500})
    }
}

export async function POST(req: NextRequest){
    try {
        const {name, email, number, address, owner_name, owner_email, owner_number, contact_name, contact_email, contact_number} = await req.json()

        const newComp = await prisma.company.create({
            data: {
                name,
                email,
                tel_number: number,
                owner: {
                    create: {
                        name: owner_name,
                        email: owner_email,
                        phone: owner_number
                    }
                },
                contact: {
                    create: {
                        name: contact_name,
                        email: contact_email,
                        phone: contact_number
                    }
                },
                active: true,
                address: address
            }
        })

        return NextResponse.json({company: newComp}, {status: 201});
    } catch (error) {
        console.log("error: ", error)
        NextResponse.json({message: "There is some error with the server", error}, {status: 500})
    }
}