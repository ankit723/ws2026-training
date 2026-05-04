'use server'

import prisma from "./prisma"

export const getInfor=async()=>{
    const info = await prisma.infoItems.findMany({})
    return info
}

