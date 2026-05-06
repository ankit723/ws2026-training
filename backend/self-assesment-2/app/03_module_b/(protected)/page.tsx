import Link from "next/link";

export default function Page(){
    return(
        <div className="w-screen h-screen flex justify-center items-center bg-slate-300">
            <Link className="w-40 p-4 rounded-lg bg-white flex justify-center items-center border m-3 hover:scale-102 transition-all " href={"/03_module_b/company"}>Companies</Link>
            <Link className="w-40 p-4 rounded-lg bg-white flex justify-center items-center border m-3 hover:scale-102 transition-all " href={"/03_module_b/product"}>Products</Link>
        </div>
    )
}