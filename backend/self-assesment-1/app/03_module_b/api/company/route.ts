import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    try{
        if(req.cookies.get("token")?.value!=="admin") return NextResponse.json({message: "Not Authenticated"}, {status: 401})
        const activeCompanies = await prisma.company.findMany({where: {active: true}, include: {owner: true, contact: true}})
        const inActiveCompanies = await prisma.company.findMany({where: {active: false}, include: {owner: true, contact: true}})
        return NextResponse.json({activeCompanies, inActiveCompanies}, {status: 200})

    }catch(err){
        console.log(err)
        return NextResponse.json({message:"There is some error from our end", err}, {status: 500})
    }
}

export async function POST(req:NextRequest) {
    try{
        if(req.cookies.get("token")?.value!=="admin") return NextResponse.json({message: "Not Authenticated"}, {status: 401})
        const {name, email, phone, address, owner_name, owner_email, owner_phone, contact_name, contact_email, contact_phone} = await req.json()
        console.log(name, email, phone)
        const company = await prisma.company.create({data:{
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
            }
        }, include: {owner: true, contact: true}})
        return NextResponse.json({company}, {status: 201})

    }catch(err){
        console.log("Company Creation error: ", err)
        return NextResponse.json({message:"There is some error from our end", err}, {status: 500})
    }
}