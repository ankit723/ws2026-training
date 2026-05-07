import prisma from "@/lib/prisma";
import { checkUser } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}:{params: Promise<{id: string}>}){
    try {
        const {id} = await params;
        const album_id = parseInt(id) 

        const songs = await prisma.song.findMany({where: {album_id}, select: {song_id:true, album_id: true, title: true, label: {select: {name: true}}, duration_seconds: true, order: true, isCover: true, cover_image: true}});
        return NextResponse.json({success: true, data: songs}, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({success: false, data: null}, {status: 500})
    }    
}

export async function POST(req: NextRequest, {params}:{params: Promise<{id: string}>}){
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

        const formData = await req.formData()

        const title = formData.get("title") as string
        const duration_seconds = formData.get("duration_seconds") as string
        const label = formData.get("label") as string
        const lyrics = formData.get("lyrics") as string
        const cover_image = formData.get("cover_image") as string
        const isCover = formData.get("isCover") as string

        const album = await prisma.album.findUnique({where: {album_id}, include: {songs: true}})
        const order = album?.songs.map(s=>s.song_id)
        
        

        const song = await prisma.song.create({
            data: {
                title,
                duration_seconds: parseInt(duration_seconds),
                lyrics,
                ...(isCover==="true"?{isCover: true}:{isCover: false}),
                cover_image,
                album_id,
                ...(!order?{order: 1}:{order: order[order?.length]+1}),
                label: {
                    create: {
                        name: label
                    }
                },
                view_count: 0
            },
            include: {label: true}
        })

        return NextResponse.json({success: true, data: song})
    } catch (error) {
        console.log(error)
        return NextResponse.json({success: false, data: null}, {status: 500})
    }    
}