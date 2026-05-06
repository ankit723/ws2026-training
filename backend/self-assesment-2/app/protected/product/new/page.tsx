import prisma from "@/lib/prisma"
import { randomUUID } from "crypto";
import fs from "fs/promises";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import path from "path";

export default async function Page() {
    const companies = await prisma.company.findMany({where:{active: true}, select:{name: true, id: true}})
    const onSubmit=async(formData: FormData)=>{
        'use server'

        const file = formData.get("file") as File
        let imageUrl = null;

        if(file && file.size>0){
            const bytes = await file.arrayBuffer()
            const buffer = Buffer.from(bytes);

            const fileName = randomUUID() + "-" + file.name;

            const uploadPath = path.join(process.cwd(), "public/uploads", fileName)

            await fs.writeFile(uploadPath, buffer)
            imageUrl = "/uploads/"+fileName
        }
        const {gtin, name, french_name, description, french_description, origin, brand_name, p_weight, g_weight, n_weight, company_id} = Object.fromEntries(formData) as any;
        console.log(gtin, BigInt(gtin),
                name,   
                french_name,
                description,
                french_description,
                origin,
                imageUrl,
                brand_name,
                p_weight, parseFloat(p_weight),
                g_weight, parseFloat(g_weight),
                n_weight, parseFloat(n_weight),
                company_id)
        const product = await prisma.product.create({
            data: {
                gtin: BigInt(gtin),
                name,   
                french_name,
                description,
                french_description,
                origin,
                imageUrl,
                brand_name,
                p_weight: parseFloat(p_weight),
                g_weight: parseFloat(g_weight),
                n_weight: parseFloat(n_weight),
                company_id
            }   
        })

        revalidatePath("/protected/company")
        redirect("/protected/company")


    }

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold ">Company Creation form</h1>
            <form action={onSubmit} className=" w-120 flex flex-col ">
                <input type="file" name="file" />
                <input name="gtin" placeholder="Product GTIN"  className="border p-2 m-2" minLength={13} maxLength={14}/>
                <input name="name" placeholder="Product Name"  className="border p-2 m-2"/>
                <input name="french_name" placeholder="Product French Name"  className="border p-2 m-2"/>
                <input name="description" placeholder="Product Description"  className="border p-2 m-2"/>
                <input name="french_description" placeholder="Product french Description"  className="border p-2 m-2"/>
                <input name="origin" placeholder="Origin" className="border p-2 m-2"/>
                <input name="brand_name" placeholder="Brand Name" className="border p-2 m-2"/>
                <input name="p_weight" placeholder="Product Weight" className="border p-2 m-2" type="text"/>
                <input name="n_weight" placeholder="Net Weight" className="border p-2 m-2" type="text"/>
                <input name="g_weight" placeholder="Gross Weight" className="border p-2 m-2" type="text"/>
                <select name="company_id" id="">
                    {companies.map(c=>(
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>

                <button type="submit" className="bg-blue-600 hover:bg-blue-700 p-2 text-white rounded-lg mt-10">Create Company</button>
            </form>
        </div>
    )
}