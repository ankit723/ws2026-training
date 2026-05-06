import Link from "next/link";

export default function Page(){
    return(
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold">401 Error - Unauthorized</h1>
            <Link href={"/03_module_b/protected/login"} className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 cursor-pointer">Continue to login</Link>
        </div>
    )
}