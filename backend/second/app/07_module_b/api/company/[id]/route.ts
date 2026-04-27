import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest, {params}:{params: Promise<{id: string}>}) {
    try {
        const token = req.cookies.get("token")?.value
        if(token!=="admin") return NextResponse.json({message: "Invalid Auth"}, {status: 401})
        const {id} = await params;
        const company = await prisma.company.findUnique({where:{id}, include:{owner: true, contact: true, products: true}});
        return NextResponse.json({company}, {status: 200})
    } catch (error) {
        console.log("Error: ", error)
        return NextResponse.json({message: "There is some error from our end", error}, {status: 500})
    }
}


export async function PUT(req:NextRequest, {params}:{params: Promise<{id: string}>}) {
    try {
        const token = req.cookies.get("token")?.value
        if(token!=="admin") return NextResponse.json({message: "Invalid Auth"}, {status: 401})
        const {id} = await params;

        const {name, email, phone, address, owner_name, contact_name, owner_email, contact_email, owner_phone, contact_phone} = await req.json()

        const company = await prisma.company.update({
            where: {id},
            data:{
                name,
                email,
                phone,
                address,
                ...((owner_name || owner_email || owner_phone)?{
                    owner: {
                        update: {
                            owner_name,
                            owner_email,
                            owner_phone
                        }
                    }
                }:{}),
                ...((contact_name || contact_email || contact_phone)?{
                    contact: {
                        update: {
                            contact_name,
                            contact_email,
                            contact_phone
                        }
                    }
                }:{})
            }
        })
        return NextResponse.json({company}, {status: 200})
    } catch (error) {
        console.log("Error: ", error)
        return NextResponse.json({message: "There is some error from our end", error}, {status: 500})
    }
}


export async function PATCH(req:NextRequest, {params}:{params: Promise<{id: string}>}) {
    try {
        const token = req.cookies.get("token")?.value
        if(token!=="admin") return NextResponse.json({message: "Invalid Auth"}, {status: 401})
        const {id} = await params;
        const c = await prisma.company.findUnique({where:{id}});

        if(!c) return NextResponse.json({message: "Company Does not exsits"})

        const company = await prisma.company.update({where:{id}, data:{active: !c?.active}});
        return NextResponse.json({company}, {status: 200})
    } catch (error) {
        console.log("Error: ", error)
        return NextResponse.json({message: "There is some error from our end", error}, {status: 500})
    }
}