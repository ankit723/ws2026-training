import prisma from "@/lib/prisma"

export default async function Page({params}:{params:Promise<{gtin: bigint}>}) {
    const {gtin} = await params

    const product = await prisma.product.findUnique({where: {gtin, hidden: false}, include:{company: {select: {name: true}}}})

    if(!product){
        return (
            <div className="w-screen h-screen flex justify-center items-center">
                <h1 className="text-3xl font-bold">404 Error - product Not found</h1>
            </div>
        )
    }

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold">Product</h1>

            <button>En/Fr</button>
            <p>{product.company.name}</p>
            <p>{product.gtin}</p>
            <p>English Description: {product.description}</p>
            <p>French Description: {product.french_description}</p>
            <p>Net Weight: {product.n_weight} kg</p>
            <p>Gross Weight: {product.g_weight} kg</p>

        </div>
    )
}