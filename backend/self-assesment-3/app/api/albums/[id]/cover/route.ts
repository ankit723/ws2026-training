import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import sharp from "sharp";
import fs from "fs/promises";
import { combineCovers } from "@/lib/utils";

export async function GET(req: NextRequest, {params}:{params: Promise<{id: string}>}){
    try {
        const {id} = await params;
        const album_id = parseInt(id) 

        const album = await prisma.album.findUnique({where: {album_id}, include: {publisher: {select: {id: true, username: true, email: true}}, songs: {where: {isCover: true}, select: {cover_image: true}}}});

        if(!album) return NextResponse.json({success: false, data: null}, {status: 404})
        if(album?.songs.length>3) return NextResponse.json({success: false, message: "Too many covers provided"}, {status: 400})

        const combined = await combineCovers(album.songs);

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
    } catch (error) {
        console.log(error)
        return NextResponse.json({success: false, data: null}, {status: 500})
    }    
}