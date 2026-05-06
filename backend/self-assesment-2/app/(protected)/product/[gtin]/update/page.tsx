import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function Page({params}: {params: Promise<{gtin: bigint}>}) {
    const {gtin} = await params;
    const companies = await prisma.company.findMany({where:{active: true}, select:{name: true, id: true}})
    const product = await prisma.product.findUnique({where:{gtin}})
    const onSubmit=async(formData: FormData)=>{
        'use server'
        const {gtin, name, french_name, description, french_description, origin, brand_name, p_weight, g_weight, n_weight, company_id} = Object.fromEntries(formData) as any;

        const product = await prisma.product.update({
            where: {gtin},
            data: {
                gtin: BigInt(gtin),
                name,   
                french_name,
                description,
                french_description,
                origin,
                brand_name,
                p_weight: parseFloat(p_weight),
                g_weight: parseFloat(g_weight),
                n_weight: parseFloat(n_weight),
                company_id
            }   
        })

        revalidatePath("/03_module_b/product")
        redirect("/03_module_b/product")


    }

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold ">Company Updation form</h1>
            <form action={onSubmit} className=" w-120 flex flex-col ">
                <input name="gtin" placeholder="Product GTIN"  className="border p-2 m-2" minLength={13} maxLength={14} defaultValue={product?.gtin.toString()}/>
                <input name="name" placeholder="Product Name"  className="border p-2 m-2"  defaultValue={product?.name}/>
                <input name="french_name" placeholder="Product French Name"  className="border p-2 m-2" defaultValue={product?.french_name}/>
                <input name="description" placeholder="Product Description"  className="border p-2 m-2" defaultValue={product?.description}/>
                <input name="french_description" placeholder="Product french Description"  className="border p-2 m-2" defaultValue={product?.description}/>
                <input name="origin" placeholder="Origin" className="border p-2 m-2" defaultValue={product?.origin}/>
                <input name="brand_name" placeholder="Brand Name" className="border p-2 m-2" defaultValue={product?.brand_name}/>
                <input name="p_weight" placeholder="Product Weight" className="border p-2 m-2" type="text" defaultValue={product?.p_weight}/>
                <input name="n_weight" placeholder="Net Weight" className="border p-2 m-2" type="text" defaultValue={product?.n_weight}/>
                <input name="g_weight" placeholder="Gross Weight" className="border p-2 m-2" type="text" defaultValue={product?.g_weight}/>
                <select name="company_id" id="" defaultValue={product?.company_id}>
                    {companies.map(c=>(
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>

                <button type="submit" className="bg-blue-600 hover:bg-blue-700 p-2 text-white rounded-lg mt-10">Update Company</button>
            </form>
        </div>
    )
}