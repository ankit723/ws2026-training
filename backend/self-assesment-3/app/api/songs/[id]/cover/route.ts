import prisma from "@/lib/prisma";
import { combineCovers } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}:{params: Promise<{id: string}>}) {
    try{

        const {id} = await params;
        const song_id = parseInt(id)

        const song = await prisma.song.findMany({where: {song_id}})
        if(!song) return NextResponse.json({success: false, data: null}, {status: 404})

            const combined = await combineCovers(song)

        if (!combined) {
            
            return NextResponse.json({
                success: false,
                message: "No Covers Found"
            }, {
                status: 404
            });
        }

        return NextResponse.json(combined, {

            headers: {
                "Content-Type": "image/jpeg"
            }
        });
    }catch(err){
        console.log(err)
        return NextResponse.json({success: false}, {status: 500})
    }
}