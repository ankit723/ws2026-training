'use client'

import { useState } from "react"
import { onSubmit } from "@/lib/utils"

export const ContactForm = ()=>{

    const [message, setMessage] = useState<{message: string, color: string}>()

    const onClick = async(formData: FormData) =>{
        const res = await onSubmit(formData)
        if(res?.error){
            setMessage({message: res?.error, color: "red"})
        }else if(res?.message){
            setMessage({message: res?.message, color: "green"})
        }
    }        
        
    
    return(
        <div className="w-full bg-white container mx-auto my-60">
            <h1 className="text-3xl font-bold ">Travel Consultation</h1>
            <p className="mt-6 text-xl">Get personalized recommendations for your Taiwan adventure.</p>
            
            <div className="w-full flex justify-center">
                <form className= "grid grid-cols-1" action={onClick}>
                    <div className="flex flex-col gap-2 w-full ">
                        <label htmlFor="name" className="font-bold">Name</label>
                        <input type="text" name="name" placeholder="Enter your name" className="border p-2 rounded-lg"/>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="email" className="font-bold">Email</label>
                        <input type="email" name="email" placeholder="Enter your email" className="border p-2 rounded-lg"/>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="country" className="font-bold">Country</label>
                        <input type="country" name="country" placeholder="Where are you based ?"className="border p-2 rounded-lg" />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="interests" className="font-bold">Intrest</label>
                        <input type="text" name="intrests" placeholder="Culture, food, nature, beaches.." className="border p-2 rounded-lg" />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="message" className="font-bold">Name</label>
                        <textarea name="message" placeholder="Tell us about dream taiwan trip" className="border p-2 rounded-lg"/>
                    </div>
                    <div className="col-span-2 flex justify-end">
                        <button type="submit" className="border border-black bg-green-600 hover:bg-green-500 hover:scale-105 active:bg-green-800 cursor-pointer active:scale-95 p-2 rounded-xl text-white transition-all">Submit</button>
                    </div>
                </form>
            </div>
            <p className="font-bold" style={{color: message?.color}}>{message?.message}</p>
        </div>
    )
}