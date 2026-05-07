import prisma from "@/lib/prisma";
import { checkUser } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, {params}:{params: Promise<{id: string}>}){
    const {id} = await params
    const album_id = parseInt(id)

    const {status, user} = await checkUser(req, true)
    if (!status || !user) return NextResponse.json({ message: "Login Access Required" },{ status: 403 })
    
    const {song_ids}:{song_ids:number[]} = await req.json()

    const songs = Promise.all(song_ids.map(async(s:number, i)=>{
        const song = await prisma.song.update({
            where: {song_id: s},
            data: {
                order: i+1
            }
        })
        return song
    }))

    return NextResponse.json({success: true}, {status: 200})

}