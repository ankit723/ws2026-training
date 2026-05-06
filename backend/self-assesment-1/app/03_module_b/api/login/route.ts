import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try{
        const {passphrase} = await req.json()

        if(passphrase !== "admin") return NextResponse.json({message:"Wrong Password"}, {status: 402})

        const res = NextResponse.json({message: "Login Successfull"}, {status: 200})

        res.cookies.set("token", "admin", {
            httpOnly: true,
            sameSite: "lax",
            path: "/",
            secure: false,
            maxAge: 60* 60*24*7
        })

        return res;

    }catch(err){
        console.log(err)
        return NextResponse.json({message:"There is some error from our end", err}, {status: 500})
    }
}