import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    try {
        const token = req.cookies.get("token")?.value
        if(token!=="admin") return NextResponse.json({message: "Invalid Auth"}, {status: 401})
        const activeCompanies = await prisma.company.findMany({where: {active: true}});
        const inActiveCompanies = await prisma.company.findMany({where: {active: false}});
        return NextResponse.json({activeCompanies, inActiveCompanies}, {status: 200})
    } catch (error) {
        console.log("Error: ", error)
        return NextResponse.json({message: "There is some error from our end", error}, {status: 500})
    }
}

export async function POST(req:NextRequest) {
    try {
        const token = req.cookies.get("token")?.value
        if(token!=="admin") return NextResponse.json({message: "Invalid Auth"}, {status: 401})

        const {name, email, phone, address, owner_name, contact_name, owner_email, contact_email, owner_phone, contact_phone} = await req.json()
        console.log(name, email, phone)

        const company = await prisma.company.create({
            data:{
                name,
                email,
                phone,
                address,
                owner: {
                    create: {
                        owner_name,
                        owner_email,
                        owner_phone
                    }
                },
                contact: {
                    create: {
                        contact_name,
                        contact_email,
                        contact_phone
                    }
                },
            }
        })

        return NextResponse.json({company}, {status: 201})
    } catch (error) {
        console.log("Error: ", error)
        return NextResponse.json({message: "There is some error from our end", error}, {status: 500})
    }
}