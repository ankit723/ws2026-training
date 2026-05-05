'use server'

import prisma from "./prisma"

export const getInfor=async()=>{
    const info = await prisma.infoItems.findMany({})
    return info
}

export const onSubmit = async(formData: FormData) => {

        const name = formData.get("name") as string
        const email = formData.get("email") as string
        const country = formData.get("country") as string
        const intrests = formData.get("intrests") as string
        const message = formData.get("message") as string

        console.log(name, email, country, intrests, message)

        if(!name || !email || !country || !country || !intrests || !message) return {error: "Please fill all the fields"}

        if(name.length<3) return {error: "Please enter a corrent name of more than 3 characters"}

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        
        if(!emailRegex.test(email)) return {error: "Please enter correct email format"}

        const contact = await prisma.contact.create({
            data: {
                name, email, country, interests: intrests, message
            }
        })

        if(contact) return {message: "Your form has been successfully submitted !"}

    }