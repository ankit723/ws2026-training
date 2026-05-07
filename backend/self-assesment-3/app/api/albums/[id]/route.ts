import prisma from "@/lib/prisma";
import { checkUser } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}:{params: Promise<{id: string}>}){
    try {
        const {id} = await params;
        const album_id = parseInt(id) 

        const album = await prisma.album.findUnique({where: {album_id}, include: {publisher: {select: {id: true, username: true, email: true}}}});
        return NextResponse.json({success: true, data: album}, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({success: false, data: null}, {status: 500})
    }    
}

export async function PUT(req: NextRequest, {params}:{params: Promise<{id: string}>}){
    try {
        const {id} = await params;
        const album_id = parseInt(id) 

        const { status, user } = await checkUser(req, true);
        
        if (!status || !user) {
            return NextResponse.json(
                { message: "Login Access Required" },
                { status: 403 }
            );
        }

        const body = await req.json()

        const data:any = {}

        if (body.title !== undefined) {
            data.title = body.title;
        }

        if (body.artist !== undefined) {
            data.artist = body.artist;
        }

        if (body.genre !== undefined) {
            data.genre = body.genre;
        }

        if (body.description !== undefined) {
            data.description = body.description;
        }

        if (body.release_year !== undefined) {
            data.release_year = Number(body.release_year);
        }

        const album = await prisma.album.update({where: {album_id}, data: data, include: {publisher: {select: {id: true, username: true, email: true}}}});
        return NextResponse.json({success: true, data: album}, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({success: false, data: null}, {status: 500})
    }    
}


export async function DELETE(req: NextRequest, {params}:{params: Promise<{id: string}>}){
    try {
        const {id} = await params;
        const album_id = parseInt(id) 

        const { status, user } = await checkUser(req, true);
        
        if (!status || !user) {
            return NextResponse.json(
                { message: "Login Access Required" },
                { status: 403 }
            );
        }

        const album = await prisma.album.delete({where: {album_id}, include: {publisher: {select: {id: true, username: true, email: true}}}});
        return NextResponse.json({success: true}, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({success: false, data: null}, {status: 500})
    }    
}