import Image from "next/image"
import prisma from "@/lib/prisma"

export const RegionalGuide = async()=>{

    const regions = await prisma.regions.findMany({include: {attractions: true}})

    return(
        <div className="w-full bg-white container mx-auto my-20">
            <h1 className="text-3xl font-bold ">Regional Guide</h1>
            <p className="mt-3 text-xl">Click a region on the map to explore</p>

            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="w-full flex justify-center items-center" >
                    <Image src={"/03_module_d/media_files/images/taiwan-map.svg"} alt="map" width={600} height={100}/>
                </div>

                <div className="w-full h-fit grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {regions?.map(r=>(
                        <button key={r.key} className="w-full p-3 border rounded-xl m-5 h-fit transition-all group text-left" style={{borderColor: r.color}}>
                            <div className="flex items-center justify-between ">
                                <p className="font-bold ">{r.name}</p>
                                <div className="w-4 h-4 rounded-full" style={{backgroundColor:r.color}}></div>
                            </div>
                            <p className="text-slate-600 mt-2 font-medium">{r.summary}</p>
                            
                            <div className="mt-3 group-focus:block hidden">
                                {
                                    r.attractions.map(a=>(
                                        <p key={a.id} className="text-slate-600"><span className="font-bold">{a.name}: </span>{a.description}</p>
                                    ))
                                }
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}