import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}:{params:Promise<{id: string}>}){
    try {
        const {id} = await params;

        const company = await prisma.company.findUnique({
            where:{id},
            include:{
                owner: true,
                contact: true
            }
        })

        return NextResponse.json({company}, {status: 200})
        
    } catch (error) {
        console.error(error)
        return NextResponse.json({message: "There is some server side error", error}, {status: 500})
    }
}


export async function PUT(req: NextRequest, {params}:{params:Promise<{id: string}>}){
    try {
        const {id} = await params;
        const {name, email, number, address, owner_name, owner_email, owner_number, contact_name, contact_email, contact_number} = await req.json()

        const newComp = await prisma.company.update({
            where: {id},
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


export async function PATCH(req: NextRequest, {params}:{params:Promise<{id: string}>}){
    try {
        const {id} = await params;

        const company = await prisma.company.update({where: {id}, data:{active: false}})
        await prisma.product.updateMany({where:{company_id: id}, data:{hidden: true}})
        return NextResponse.json({message: "The company and all products associated with it has been deactivated"})
    } catch (error) {
        console.log("error: ", error)
        NextResponse.json({message: "There is some error with the server", error}, {status: 500})
    }
} 