import prisma from "@/lib/prisma";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export default async function Page() {
    const companies = await prisma.company.findMany({select: {id: true, name: true, active: true}})



    const deactivateCompany = async (id: string) => {
        "use server";

        await prisma.company.update({
            where: { id },
            data: { active: false }
        });

        revalidatePath("/protected/company");
    };
    
    const activateCompany = async (id: string) => {
        "use server";

        await prisma.company.update({
            where: { id },
            data: { active: true }
        });

        revalidatePath("/protected/company");
    };

    return (
        <div className="w-screen h-screen flex flex-col p-20 bg-slate-300 gap-3">
            <div className="w-full flex justify-center ">
                <Link href={`/protected/company/new`} className="col-span-1 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 cursor-pointer">New</Link>
            </div>
            <h1 className="text-3xl font-bold ">Active Companies</h1>
            {companies.map(c=>(
                c.active &&(
                    <div className="w-full p-2 grid grid-cols-10 border rounded-xl gap-2">
                        <div className="col-span-7 text-xl font-bold">{c.name}</div>
                        <Link href={`/protected/company/${c.id}`} className="col-span-1 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 cursor-pointer w-full">View</Link>
                        <Link href={`/protected/company/${c.id}/update`} className="col-span-1 bg-yellow-600 text-white p-2 rounded-lg hover:bg-yellow-700 cursor-pointer w-full">Update</Link>
                        <form action={deactivateCompany.bind(null, c.id)}>
                            <button className="col-span-1 bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 cursor-pointer w-full">
                                Deactivate
                            </button>
                        </form>
                    </div>
                )
            ))}

            <h1 className="text-3xl font-bold ">In-Active Companies</h1>

            {companies.map(c=>(
                !c.active &&(
                    <div className="w-full p-2 grid grid-cols-10 border gap-2">
                        <div className="col-span-7 text-xl font-bold">{c.name}</div>
                        <Link href={`/protected/company/${c.id}`} className="col-span-1 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 cursor-pointer w-full">View</Link>
                        <Link href={`/protected/company/${c.id}/update`} className="col-span-1 bg-yellow-600 text-white p-2 rounded-lg hover:bg-yellow-700 cursor-pointer w-full">Update</Link>
                        <form action={activateCompany.bind(null, c.id)}>
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