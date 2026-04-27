import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try {
        const {passphrase} = await req.json()
        if(passphrase!=="admin") return NextResponse.json({message: "Wrong passphrase"}, {status: 401})

        const res = NextResponse.json({messsage: "Login Successfull"}, {status: 200})

        res.cookies.set("token", "admin", {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/",
            maxAge: 60*60*24*7
        })

        return res;
    } catch (error) {
        console.log("Error: ", error)
        return NextResponse.json({message: "There is some error from our end", error}, {status: 500})
    }
}