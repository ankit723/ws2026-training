import prisma from "@/lib/prisma";
import { checkUser } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {

    try {

        const searchParams = req.nextUrl.searchParams;

        const limit = parseInt(searchParams.get("limit") || "10");

        const cursor = searchParams.get("cursor");

        const keyword = searchParams.get("keyword");

        let where: any = {};

        // --------------------------------
        // TITLE FILTER
        // --------------------------------

        if (keyword) {

            where.title = {
                contains: keyword,
                mode: "insensitive"
            };
        }

        // --------------------------------
        // CURSOR DECODE
        // --------------------------------

        let dCursor = null;

        if (cursor) {

            const decoded = Buffer
                .from(cursor, "base64")
                .toString("utf-8");

            dCursor = JSON.parse(decoded);
        }

        const songs = await prisma.song.findMany({

            where,
            select: {song_id:true, album_id: true, title: true, label: {select: {name: true}}, duration_seconds: true, order: true, isCover: true, cover_image: true},

            take: limit + 1,

            skip: dCursor ? 1 : 0,

            cursor: dCursor
                ? { song_id: dCursor.id }
                : undefined,

            orderBy: {
                song_id: "asc"
            }
        });

        // --------------------------------
        // NEXT CURSOR
        // --------------------------------

        let next_cursor = null;

        if (songs.length > limit) {

            const lastItem = songs.pop();

            next_cursor = Buffer
                .from(
                    JSON.stringify({
                        id: lastItem?.song_id
                    })
                )
                .toString("base64");
        }

        return NextResponse.json({
            success: true,
            data: songs,
            meta:{
                prev_cursor: cursor,
                next_cursor
            }
        });

    } catch (err) {

        console.log(err);

        return NextResponse.json({
            success: false,
            message: "Internal Server Error"
        }, {
            status: 500
        });
    }
}