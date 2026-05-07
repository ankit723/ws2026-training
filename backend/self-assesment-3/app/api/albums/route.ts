import prisma from "@/lib/prisma";
import { checkUser } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {

    try {

        const searchParams = req.nextUrl.searchParams;

        const limit = parseInt(searchParams.get("limit") || "10");

        const cursor = searchParams.get("cursor");

        const year = searchParams.get("year");

        const capital = searchParams.get("capital");

        let where: any = {};

        // --------------------------------
        // YEAR FILTER
        // --------------------------------

        if (year) {

            if (!year.includes("-")) {

                where.release_year = Number(year);

            } else {

                const [start, end] = year.split("-");

                where.release_year = {
                    gte: Number(start),
                    lte: Number(end),
                };
            }
        }

        // --------------------------------
        // TITLE FILTER
        // --------------------------------

        if (capital) {

            where.title = {
                startsWith: capital,
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

        const albums = await prisma.album.findMany({

            where,
            select:{album_id: true, title: true, artist: true, release_year: true, publisher: {select: {id: true, username: true, email: true}}},

            take: limit + 1,

            cursor: dCursor
                ? { album_id: dCursor.id }
                : undefined,

            orderBy: {
                album_id: "asc"
            }
        });

        // --------------------------------
        // NEXT CURSOR
        // --------------------------------

        let next_cursor = null;

        if (albums.length > limit) {

            const lastItem = albums.pop();

            next_cursor = Buffer
                .from(
                    JSON.stringify({
                        id: lastItem?.album_id
                    })
                )
                .toString("base64");
        }

        const response = NextResponse.json({
            success: true,
            data: albums,
            meta: {
                prev_cursor: req.cookies.get("album_prev_cursor")?.value,
                next_cursor
            }
        });

        response.cookies.set("album_prev_cursor", cursor || "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/"
        });

        return response;

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

export async function POST(req: NextRequest) {
    try {
        const { status, user } = await checkUser(req, true);

        if (!status || !user) {
            return NextResponse.json(
                { message: "Login Access Required" },
                { status: 403 }
            );
        }

        const formData = await req.formData();

        const title = formData.get("title") as string;
        const artist = formData.get("artist") as string;
        const genre = formData.get("genre") as string;
        const description = formData.get("description") as string;
        const release_year = parseInt(formData.get("release_year") as string);

        if (!title || !artist || !release_year) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        const album = await prisma.album.create({
            data: {
                title,
                artist,
                release_year,
                genre,
                description,
                publisher_id: user.id
            },
            include: {
                publisher: {
                    select: {
                        id: true,
                        username: true,
                        email: true
                    }
                }
            }
        });

        return NextResponse.json(
            { success: true, data: album },
            { status: 201 }
        );

    } catch (err) {
        console.log(err);
        return NextResponse.json(
            { success: false },
            { status: 400 }
        );
    }
}