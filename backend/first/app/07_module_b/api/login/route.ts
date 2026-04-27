import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest)=>{
    try{
        const {passphrase} = await req.json()
        
        if(passphrase!=="admin") return NextResponse.json({message: "Please enter correct passphrase"}, {status: 401})
        
        const token = "admin"
        const res = NextResponse.json({
            message: "Login successfull"
        }, {status: 200})

        res.cookies.set("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7
        })

        return res;

    } catch (error) {
        console.error(error)
        return NextResponse.json({message: "There is some server side error", error}, {status: 500})
    }
}