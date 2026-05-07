export default function Page(){
    return(
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="w-100 h-80 relative flex justify-center items-center">
                <div className="absolute w-24 h-18 top-0 left-0 grid grid-rows-3 grid-cols-2 gap-2 -rotate-z-45">
                    <div className="bg-black h-full col-span-2"></div>
                    <div className="bg-black h-full col-span-2"></div>
                    <div className="bg-black h-full col-span-2"></div>
                </div>
                
                <div className="absolute w-24 h-18 top-0 right-0 grid grid-rows-3 grid-cols-2 gap-2 rotate-z-45">
                    <div className="bg-black h-full col-span-1"></div>
                    <div className="bg-black h-full col-span-1"></div>
                    <div className="bg-black h-full col-span-2"></div>
                    <div className="bg-black h-full col-span-1"></div>
                    <div className="bg-black h-full col-span-1"></div>
                </div>
                
                <div className="absolute w-24 h-18 bottom-0 left-0 grid grid-rows-3 grid-cols-2 gap-2 rotate-z-45">
                    <div className="bg-black h-full col-span-2"></div>
                    <div className="bg-black h-full col-span-1"></div>
                    <div className="bg-black h-full col-span-1"></div>
                    <div className="bg-black h-full col-span-2"></div>
                </div>
                
                <div className="absolute w-24 h-18 bottom-0 right-0 grid grid-rows-3 grid-cols-2 gap-2 -rotate-z-45">
                    <div className="bg-black h-full col-span-1"></div>
                    <div className="bg-black h-full col-span-1"></div>
                    <div className="bg-black h-full col-span-1"></div>
                    <div className="bg-black h-full col-span-1"></div>
                    <div className="bg-black h-full col-span-1"></div>
                    <div className="bg-black h-full col-span-1"></div>
                </div>

                <div className="rounded-full bg-linear-to-b from-50% to-50% from-red-500 to-blue-800 h-40 w-40 relative">
                    <div className="absolute w-20 h-20 bg-red-500 rounded-full bottom-12 left-0"></div>
                    <div className="absolute w-20 h-20 bg-blue-800 rounded-full bottom-10 right-0"></div>
                </div>
            </div>
        </div>
    )
}