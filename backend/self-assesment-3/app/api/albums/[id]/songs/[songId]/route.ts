import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { checkUser } from "@/lib/utils";

export async function POST(req: NextRequest, {params}:{params: Promise<{id: string, songId: string}>}){
    try {
        const {id, songId} = await params;
        const album_id = parseInt(id) 
        const song_id = parseInt(songId)

        const { status, user } = await checkUser(req, true);
                
        if (!status || !user) {
            return NextResponse.json(
                { message: "Login Access Required" },
                { status: 403 }
            );
        }

        const formData = await req.formData()

        const title = formData.get("title") as string
        const duration_seconds = formData.get("duration_seconds") as string
        const label = formData.get("label") as string
        const lyrics = formData.get("lyrics") as string
        const cover_image = formData.get("cover_image") as string
        const isCover = formData.get("isCover") as string
        

        const song = await prisma.song.update({
            where: {song_id},
            data: {
                title,
                duration_seconds: parseInt(duration_seconds),
                lyrics,
                ...(isCover==="true"?{isCover: true}:{isCover: false}),
                cover_image,
                label: {
                    create: {
                        name: label
                    }
                }
            },
            include: {label: true}
        })

        return NextResponse.json({success: true, data: song})
    } catch (error) {
        console.log(error)
        return NextResponse.json({success: false, data: null}, {status: 500})
    }    
}


export async function DELETE(req: NextRequest, {params}:{params: Promise<{id: string, songId: string}>}){
    try {
        const {id, songId} = await params;
        const album_id = parseInt(id) 
        const song_id = parseInt(songId)

        const { status, user } = await checkUser(req, true);
                
        if (!status || !user) {
            return NextResponse.json(
                { message: "Login Access Required" },
                { status: 403 }
            );
        }

        await prisma.song.delete({where: {song_id}})

        return NextResponse.json({success: false}, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({success: false, data: null}, {status: 500})
    }
}