import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}:{params: Promise<{id: string}>}) {
    const {id} = await params;
    const song_id = parseInt(id)

    const song = await prisma.song.findUnique({where:{song_id}});
    return NextResponse.json({success: true, data: song})
}