import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import React from "react"

export default async function ProtectedLayout({children}:{children: React.ReactNode}){
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    if(!token || token!=="admin"){
        redirect("/03_module_b/protected/unauthorized")
    }
    return(
        <div className="">{children}</div>
    )
}