'use server'

import prisma from "./prisma"

export const verifyGTIN = async (text: string)=>{
    const res: {gtin: string, verified: boolean}[] = []
    let allVerified = true
    await Promise.all(text.split("\n").map(async(g)=>{
        const p = await prisma.product.findUnique({where:{gtin: BigInt(g)}})
        const isVerified = (p && !p.hidden)
        if(!isVerified) allVerified = false
        res.push({gtin: g, verified: isVerified?true:false})
    }))
    return {res, allVerified}
}