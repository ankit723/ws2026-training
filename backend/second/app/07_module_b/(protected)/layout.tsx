import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({children}:{children: React.ReactNode}){
    const cookiesStore = cookies()
    const token = (await cookiesStore).get("token")?.value
    console.log("token: ", token)

    if(!token || token!=="admin") return redirect("/07_module_b/login")

    return(
        <div className="">{children}</div>
    )
}