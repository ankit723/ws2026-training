import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req:NextRequest, {params}:{params: Promise<{id: string}>}) {
    try{
        if(req.cookies.get("token")?.value!=="admin") return NextResponse.json({message: "Not Authenticated"}, {status: 401})
        const {id} = await params; 
        const company = await prisma.company.findUnique({where:{id}, include: {owner: true, contact: true, products: true}})
        return NextResponse.json({company}, {status: 200})

    }catch(err){
        console.log(err)
        return NextResponse.json({message:"There is some error from our end", err}, {status: 500})
    }
}

export async function PUT(req:NextRequest, {params}:{params: Promise<{id: string}>}) {
    try{
        if(req.cookies.get("token")?.value!=="admin") return NextResponse.json({message: "Not Authenticated"}, {status: 401})
        const {name, email, phone, address, owner_name, owner_email, owner_phone, contact_name, contact_email, contact_phone} = await req.json()
        const {id} = await params;
        const company = await prisma.company.update({where: {id}, data:{
            name,
            email,
            phone,
            address,
            ...((owner_email || owner_name || owner_phone)?{
                owner: {
                    update: {
                        owner_name,
                        owner_email,
                        owner_phone
                    }
                }
            }:{}),
            ...((contact_email || contact_name || contact_phone)?{
                contact: {
                    update: {
                        contact_name,
                        contact_email,
                        contact_phone
                    }
                }
            }:{}),
            
        }, include: {owner: true, contact: true}})
        return NextResponse.json({company}, {status: 202})

    }catch(err){
        console.log(err)
        return NextResponse.json({message:"There is some error from our end", err}, {status: 500})
    }
}


export async function PATCH(req:NextRequest, {params}:{params: Promise<{id: string}>}) {
    try{
        if(req.cookies.get("token")?.value!=="admin") return NextResponse.json({message: "Not Authenticated"}, {status: 401})
        const {id} = await params;
        const c = await prisma.company.findUnique({where:{id}})
        const company = await prisma.company.update({where: {id}, data:{
           active: !c?.active
            
        }})
        const prods = await prisma.product.updateMany({where: {companyId: company.id}, data:{active: !c?.active}})
        return NextResponse.json({company}, {status: 202})

    }catch(err){
        console.log(err)
        return NextResponse.json({message:"There is some error from our end", err}, {status: 500})
    }
}