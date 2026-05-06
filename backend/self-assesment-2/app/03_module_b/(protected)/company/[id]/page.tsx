import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Page({params}:{params:Promise<{id: string}>}) {
    const {id} = await params

    const company = await prisma.company.findUnique({where: {id}, include: {products: true, owner: true, contact: true}})

    if(!company){
        redirect("/03_module_b/company")
    }

        const deactivateProduct = async (gtin: BigInt) => {
            "use server";

            await prisma.product.update({
                where: { gtin },
                data: { hidden: true }
            });

            revalidatePath("/03_module_b/company");
        };
    
        const activateProduct = async (gtin: bigint) => {
            "use server";

            await prisma.product.update({
                where: { gtin },
                data: { hidden: false }
            });

            revalidatePath("/03_module_b/company");
        };

    return(
        <div className="">
            <h1 className="text-3xl font-bold">Company Details</h1>
            <Link className="text-2xl font-bold" href={"/03_module_b/product/new"}>New</Link>
            {Object.keys(company).map((c)=>(
                c!=="products" && (
                    <p>{c} - {JSON.stringify(company[c])}</p>
                )
            ))}
            
            <h1 className="text-3xl font-bold ">Shown Products</h1>
            {company.products.map(c=>(
                !c.hidden &&(
                    <div className="w-full p-2 grid grid-cols-10 border rounded-xl gap-2">
                        <div className="col-span-7 text-xl font-bold">{c.name}</div>
                        <Link href={`/03_module_b/product/${c.gtin}`} className="col-span-1 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 cursor-pointer w-full">View</Link>
                        <Link href={`/03_module_b/product/${c.gtin}/update`} className="col-span-1 bg-yellow-600 text-white p-2 rounded-lg hover:bg-yellow-700 cursor-pointer w-full">Update</Link>
                        <form action={deactivateProduct.bind(null, c.gtin)}>
                            <button className="col-span-1 bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 cursor-pointer w-full">
                                Deactivate
                            </button>
                        </form>
                    </div>
                )
            ))}

            <h1 className="text-3xl font-bold ">Hidden Products</h1>
            {company.products.map(c=>(
                c.hidden &&(
                    <div className="w-full p-2 grid grid-cols-10 border rounded-xl gap-2">
                        <div className="col-span-7 text-xl font-bold">{c.name}</div>
                        <Link href={`/03_module_b/product/${c.gtin}`} className="col-span-1 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 cursor-pointer w-full">View</Link>
                        <Link href={`/03_module_b/product/${c.gtin}/update`} className="col-span-1 bg-yellow-600 text-white p-2 rounded-lg hover:bg-yellow-700 cursor-pointer w-full">Update</Link>
                        <form action={activateProduct.bind(null, c.gtin)}>
                            <button className="col-span-1 bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 cursor-pointer w-full">
                                Activate
                            </button>
                        </form>
                    </div>
                )
            ))}
        </div>
    )
}