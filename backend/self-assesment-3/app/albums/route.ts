import prisma from "@/lib/prisma";
import { checkUser } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    const searchParams = req.nextUrl.searchParams
    
    
}

export async function POST(req: NextRequest) {
    try {
        const { status, user } = await checkUser(req, false);

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