import prisma from "@/lib/prisma"

export const ContactForm = ()=>{

    const onSubmit = async(e: SubmitEvent, formData: FormData) => {
        'use server'
        e.preventDefault

        const name = formData.get("name") as string
        const email = formData.get("email") as string
        const country = formData.get("country") as string
        const intrests = formData.get("intrests") as string
        const message = formData.get("message") as string

        if(!name || !email || !country || !country || !intrests || !message) return "Please enter all fields"

        if(name.length<3) return "Name Not Correct"

        const contact = await prisma.contact.create({
            data: {
                name, email, country, interests: intrests, message
            }
        })

        return contact
    }
        
    
    return(
        <div className="w-full bg-white container mx-auto my-60">
            <h1 className="text-3xl font-bold ">Travel Consultation</h1>
            <p className="mt-6 text-xl">Get personalized recommendations for your Taiwan adventure.</p>
            
            <div className="w-full flex justify-start mt-28">

                <form className=" grid grid-cols-1 lg:grid-cols-2" action={onSubmit}>
                    <div className="flex flex-col gap-2 w-full ">
                        <label htmlFor="name" className="font-bold">Name</label>
                        <input type="text" name="name" placeholder="Enter your name" className="border p-2 rounded-lg"/>
                    </div>
                    <div className="flex flex-col gap-2 w-full ml-20">
                        <label htmlFor="email" className="font-bold">Email</label>
                        <input type="email" name="email" placeholder="Enter your email" className="border p-2 rounded-lg"/>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="country" className="font-bold">Country</label>
                        <input type="country" name="country" placeholder="Where are you based ?"className="border p-2 rounded-lg" />
                    </div>
                    <div className="flex flex-col gap-2 w-full ml-20">
                        <label htmlFor="interests" className="font-bold">Intrest</label>
                        <input type="text" name="interests" placeholder="Culture, food, nature, beaches.."className="border p-2 rounded-lg" />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="message" className="font-bold">Name</label>
                        <textarea name="name" placeholder="Tell us about dream taiwan trip" className="border p-2 rounded-lg"/>
                    </div>
                    <div className="col-span-2 flex justify-end">
                        <button type="submit" className="border border-black bg-green-600 hover:bg-green-500 hover:scale-105 active:bg-green-800 cursor-pointer active:scale-95 p-2 rounded-xl text-white transition-all">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}