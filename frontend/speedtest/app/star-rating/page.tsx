import Image from "next/image";

export default function Page(){
    return(
        <div className="w-screen h-screen flex flex-row-reverse justify-center items-center bg-black">

            {/* ⭐ STAR CONTAINER */}
            <div className="flex flex-row-reverse items-center group">

                {/* ===== STAR 1 ===== */}

                {/* LEFT HALF */}
                <div className="relative w-40 h-40 group/left">
                    <Image
                        src="/tempsnip1.png"
                        alt="half star"
                        width={100}
                        height={100}
                        className="group-hover/left:opacity-0 absolute top-1/2 -translate-y-1/2 left-0 transition-opacity"
                    />
                    <Image
                        src="/tempsnip.png"
                        alt="half star"
                        width={100}
                        height={100}
                        className="opacity-0 group-hover/left:opacity-100 absolute top-1/2 -translate-y-1/2 left-0 transition-opacity"
                    />
                </div>

                {/* RIGHT HALF */}
                <div className="relative w-40 h-40 group/right">
                    <Image
                        src="/tempsnip1.png"
                        alt="half star"
                        width={100}
                        height={100}
                        className="rotate-x-180 rotate-z-180 group-hover:opacity-0 absolute top-1/2 -translate-y-1/2 right-0 transition-opacity"
                    />
                    <Image
                        src="/tempsnip.png"
                        alt="half star"
                        width={100}
                        height={100}
                        className="rotate-x-180 rotate-z-180 opacity-0 group-hover:opacity-100 absolute top-1/2 -translate-y-1/2 right-0 transition-opacity"
                    />
                </div>

                {/* ===== STAR 2 ===== */}

                {/* LEFT HALF */}
                <div className="relative w-40 h-40 group/left">
                    <Image
                        src="/tempsnip1.png"
                        alt="half star"
                        width={100}
                        height={100}
                        className="group-hover/left:opacity-0 absolute top-1/2 -translate-y-1/2 left-0 transition-opacity"
                    />
                    <Image
                        src="/tempsnip.png"
                        alt="half star"
                        width={100}
                        height={100}
                        className="opacity-0 group-hover/left:opacity-100 absolute top-1/2 -translate-y-1/2 left-0 transition-opacity"
                    />
                </div>

                {/* RIGHT HALF */}
                <div className="relative w-40 h-40 group/right">
                    <Image
                        src="/tempsnip1.png"
                        alt="half star"
                        width={100}
                        height={100}
                        className="rotate-x-180 rotate-z-180 group-hover:opacity-0 absolute top-1/2 -translate-y-1/2 right-0 transition-opacity"
                    />
                    <Image
                        src="/tempsnip.png"
                        alt="half star"
                        width={100}
                        height={100}
                        className="rotate-x-180 rotate-z-180 opacity-0 group-hover:opacity-100 absolute top-1/2 -translate-y-1/2 right-0 transition-opacity"
                    />
                </div>

            </div>
        </div>
    )
}