import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(req:NextRequest) {
    try{

        const formdata = await req.formData();
        const file = formdata.get("file") as File

        if(!file) return NextResponse.json({message:"No file Found"}, {status: 404})
        
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes)
        
        const fileName = `${Date.now()} - ${file.name}`
        const pathName = path.join(process.cwd(), "public/uploads", fileName)
        await writeFile(pathName, buffer)

        return NextResponse.json({message:"The file Upload is successfull"}, {status: 201})
    }catch(err){
        console.log(err)
        return NextResponse.json({message:"There is some error in uploading image", err}, {status: 500})
    }
}