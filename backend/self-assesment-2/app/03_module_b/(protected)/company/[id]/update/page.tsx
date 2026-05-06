import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export default async function Page({params}: {params: Promise<{id: string}>}) {
    const {id} = await params
    const company = await prisma.company.findUnique({where:{id}, include: {owner: true, contact: true}})
    if(!company) redirect("/03_module_b/company")
    const upadateCompany = async(formData: FormData) =>{
        'use server'
        const company = await prisma.company.update({
            where: {id},
            data:{
                name: formData.get("name") as string,
                email: formData.get("email") as string,
                phone: formData.get("phone") as string,
                address: formData.get("address") as string,
                owner: {
                    update: {
                        owner_name: formData.get("owner_name") as string,
                        owner_email: formData.get("owner_email") as string,
                        owner_phone: formData.get("owner_phone") as string,
                    }
                },
                contact: {
                    update: {
                        contact_name: formData.get("contact_name") as string,
                        contact_email: formData.get("contact_email") as string,
                        contact_phone: formData.get("contact_phone") as string,
                    }
                }
            }
        })
        redirect("/03_module_b/company")
        revalidatePath("/")
    }
    return(
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold ">Company Updation form</h1>
            <form action={upadateCompany} className=" w-120 flex flex-col ">
                <input name="name" placeholder="Company Name"  className="border p-2 m-2" defaultValue={company.name}/>
                <input name="email" placeholder="Email"  className="border p-2 m-2" defaultValue={company.email}/>
                <input name="phone" placeholder="Phone" className="border p-2 m-2" defaultValue={company.phone}/>
                <input name="address" placeholder="Address" className="border p-2 m-2" defaultValue={company.address}/>

                <h3 className="text-2xl mt-4 font-bold">Owner</h3>
                <input name="owner_name" placeholder="Owner Name"  className="border p-2 m-2" defaultValue={company.owner.owner_name}/>
                <input name="owner_email" placeholder="Owner Email"  className="border p-2 m-2" defaultValue={company.owner.owner_email}/>
                <input name="owner_phone" placeholder="Owner Phone" className="border p-2 m-2" defaultValue={company.owner.owner_phone} />

                <h3 className="text-2xl mt-4 font-bold">Contact</h3>
                <input name="contact_name" placeholder="Contact Name"  className="border p-2 m-2" defaultValue={company.contact.contact_name}/>
                <input name="contact_email" placeholder="Contact Email"  className="border p-2 m-2" defaultValue={company.contact.contact_email}/>
                <input name="contact_phone" placeholder="Contact Phone"  className="border p-2 m-2" defaultValue={company.contact.contact_phone}/>

                <button type="submit" className="bg-blue-600 hover:bg-blue-700 p-2 text-white rounded-lg mt-10">Update Company</button>
            </form>
        </div>
    )
}