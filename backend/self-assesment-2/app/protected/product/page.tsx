import prisma from "@/lib/prisma";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export default async function Page() {
    const products = await prisma.product.findMany({select: {gtin: true, name: true, hidden: true}})



    const deactivateProduct = async (gtin: bigint) => {
        "use server";

        await prisma.product.update({
            where: { gtin },
            data: { hidden: true }
        });

        revalidatePath("/03_module_b/protected/product");
    };
    
    const activateProduct = async (gtin: bigint) => {
        "use server";

        await prisma.product.update({
            where: { gtin },
            data: { hidden: false }
        });

        revalidatePath("/03_module_b/protected/product");
    };

    const deleteProduct = async(gtin: bigint) => {
        "use server"
        await prisma.product.delete({where: {gtin}})
        revalidatePath("/03_module_b/protected/products")
    }

    return (
        <div className="w-screen h-screen flex flex-col p-20 bg-slate-300 gap-3">
            <div className="w-full flex justify-center ">
                <Link href={`/03_module_b/protected/product/new`} className="col-span-1 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 cursor-pointer">New</Link>
            </div>
            <h1 className="text-3xl font-bold ">Listed Products</h1>
            {products.map(c=>(
                !c.hidden &&(
                    <div className="w-full p-2 grid grid-cols-10 border rounded-xl gap-2">
                        <div className="col-span-7 text-xl font-bold">{c.name}</div>
                        <Link href={`/03_module_b/protected/product/${c.gtin}`} className="col-span-1 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 cursor-pointer w-full">View</Link>
                        <Link href={`/03_module_b/protected/product/${c.gtin}/update`} className="col-span-1 bg-yellow-600 text-white p-2 rounded-lg hover:bg-yellow-700 cursor-pointer w-full">Update</Link>
                        <form action={deactivateProduct.bind(null, c.gtin)}>
                            <button className="col-span-1 bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 cursor-pointer w-full">
                                Deactivate
                            </button>
                        </form>
                    </div>
                )
            ))}

            <h1 className="text-3xl font-bold ">Hidden Products</h1>

            {products.map(c=>(
                c.hidden &&(
                    <div className="w-full p-2 grid grid-cols-10 border gap-2">
                        <div className="col-span-6 text-xl font-bold">{c.name}</div>
                        <Link href={`/03_module_b/protected/product/${c.gtin}`} className="col-span-1 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 cursor-pointer w-full">View</Link>
                        <Link href={`/03_module_b/protected/product/${c.gtin}/update`} className="col-span-1 bg-yellow-600 text-white p-2 rounded-lg hover:bg-yellow-700 cursor-pointer w-full">Update</Link>
                        <form action={activateProduct.bind(null, c.gtin)}>
                            <button className="col-span-1 bg-orange-600 text-white p-2 rounded-lg hover:bg-orange-700 cursor-pointer w-full">
                                Activate
                            </button>
                        </form>
                        <form action={deleteProduct.bind(null, c.gtin)}>
                            <button className="col-span-1 bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 cursor-pointer w-full">
                                Delete
                            </button>
                        </form>
                    </div>
                )
            ))}
        </div>
    )
}