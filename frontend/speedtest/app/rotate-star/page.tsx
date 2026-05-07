export default function Page(){
    return(
        <div className="w-screem h-screen flex justify-center items-center">
            <div className="animate-spin">

                <div className="bg-red-500 w-28 h-28 relative">
                    <div className="w-28 h-28 bg-red-500 absolute -top-28" style={{clipPath: "polygon(50% 0, 0 100%, 100% 100%)"}}></div>
                    <div className="w-28 h-28 bg-red-500 rotate-z-90 absolute left-28" style={{clipPath: "polygon(50% 0, 0 100%, 100% 100%)"}}></div>
                    <div className="w-28 h-28 bg-red-500 -rotate-z-90 absolute right-28" style={{clipPath: "polygon(50% 0, 0 100%, 100% 100%)"}}></div>
                    <div className="w-28 h-28 bg-red-500 absolute rotate-z-180 -bottom-28" style={{clipPath: "polygon(50% 0, 0 100%, 100% 100%)"}}></div>
                </div>
            </div>
        </div>
    )
}