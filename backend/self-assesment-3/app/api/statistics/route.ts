import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    const metrics = req.nextUrl.searchParams.get("metrics")
    const labels = req.nextUrl.searchParams.getAll("labels")

    if(metrics==="song"){
        const songs = await prisma.song.findMany({
            where: labels?.length>0?{
                label: {
                    some: {
                        name: {
                            in: labels
                        }
                    }
                }
            }
            : undefined,
            include: {
                label: true
            },

            orderBy: {
                view_count: "desc"
            }
        })
        
        return NextResponse.json({
            success: true,
    
            data: songs.map(song => ({
    
                ...song,
    
                cover_image_url:
                    `/api/songs/${song.song_id}/cover`
            }))
        });
    }

    if (metrics === "label") {

        const labelsData = await prisma.label.findMany({

            include: {

                songs: {

                    include: {
                        label: true
                    }
                }
            }
        });

        const result = labelsData

            .map(label => ({

                label: label.name,

                total_view_count:

                    label.songs.reduce(
                        (acc, song) =>
                            acc + song.view_count,
                        0
                    ),

                songs:

                    label.songs.map(song => ({

                        ...song,

                        cover_image_url:
                            `/api/songs/${song.song_id}/cover`
                    }))
            }))

            .sort(
                (a, b) =>
                    b.total_view_count -
                    a.total_view_count
            );

        return NextResponse.json({
            success: true,
            data: result
        });
    }

    if (metrics === "album") {

        const albums = await prisma.album.findMany({

            include: {

                publisher: {
                    select: {
                        id: true,
                        username: true,
                        email: true
                    }
                },

                songs: {
                    select: {
                        view_count: true
                    }
                }
            }
        });

        const result = albums

            .map(album => {

                const total_view_count =

                    album.songs.reduce(
                        (acc, song) =>
                            acc + song.view_count,
                        0
                    );

                const { songs, ...rest } = album;

                return {
                    ...rest,
                    total_view_count
                };
            })

            .sort(
                (a, b) =>
                    b.total_view_count -
                    a.total_view_count
            );

        return NextResponse.json({
            success: true,
            data: result
        });
    }
}