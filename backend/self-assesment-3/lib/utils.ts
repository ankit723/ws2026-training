import { NextRequest } from "next/server"
import prisma from "./prisma"

export async function checkUser(req: NextRequest, checkAdmin: boolean){
    const token  = req.headers.get("X-Authorization")
    if (!token) {
        return {status: false, user: null}
    }

    const user = await prisma.user.findFirst({where: {token}})
    if(!user) return {status: false, user: null}

    if(checkAdmin){
        if(user.role==="Admin"){
            return {status: true, user};
        }else{
            return {status: false, user: null};
        }
    }
    return {status: true, user};
}

import sharp from "sharp";
import path from "path";
import fs from "fs";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export const combineCovers = async (songs: any[]) => {

    const coverSongs = songs
        .filter((s) => s.cover_image)
        .slice(0, 3);

    if (coverSongs.length === 0) return null;

    const SIZE = 500;

    const files = coverSongs.map((s) =>
        path.join(UPLOAD_DIR, s.cover_image)
    );

    // Validate files exist
    for (const file of files) {

        if (!fs.existsSync(file)) {
            throw new Error("Cover Not Found");
        }
    }

    // -----------------------------------
    // 1 IMAGE
    // -----------------------------------

    if (coverSongs.length === 1) {

        return sharp(files[0])
            .resize(SIZE, SIZE)
            .jpeg()
            .toBuffer();
    }

    // -----------------------------------
    // 2 IMAGES
    // -----------------------------------

    if (coverSongs.length === 2) {

        const half = SIZE / 2;

        const [a, b] = await Promise.all([

            sharp(files[0])
                .resize(half, SIZE)
                .jpeg()
                .toBuffer(),

            sharp(files[1])
                .resize(half, SIZE)
                .jpeg()
                .toBuffer(),
        ]);

        return sharp({

            create: {
                width: SIZE,
                height: SIZE,
                channels: 3,
                background: "#000"
            }

        })
        .composite([
            {
                input: a,
                left: 0,
                top: 0
            },
            {
                input: b,
                left: half,
                top: 0
            }
        ])
        .jpeg()
        .toBuffer();
    }

    // -----------------------------------
    // 3 IMAGES
    // -----------------------------------

    const half = SIZE / 2;

    const [a, b, c] = await Promise.all([

        sharp(files[0])
            .resize(half, SIZE)
            .jpeg()
            .toBuffer(),

        sharp(files[1])
            .resize(half, half)
            .jpeg()
            .toBuffer(),

        sharp(files[2])
            .resize(half, half)
            .jpeg()
            .toBuffer(),
    ]);

    return sharp({

        create: {
            width: SIZE,
            height: SIZE,
            channels: 3,
            background: "#000"
        }

    })
    .composite([
        {
            input: a,
            left: 0,
            top: 0
        },
        {
            input: b,
            left: half,
            top: 0
        },
        {
            input: c,
            left: half,
            top: half
        }
    ])
    .jpeg()
    .toBuffer();
};