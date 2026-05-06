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