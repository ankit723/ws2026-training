import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(req: NextRequest){
    try {
        const data = await req.formData()
        const file = data.get("file") as File

        if(!file) return NextResponse.json({message: "No file found"})

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const fileName = `${Date.now()}-${file.name}`;
        const filePath = path.join(process.cwd(), "public/uploads", fileName)
        await writeFile(filePath, buffer)

        return NextResponse.json({
            success: true,
            url: `/uploads/${fileName}`
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Upload failed" }, { status: 500 })

    }    
}