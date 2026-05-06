import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function Login(){
    const token = (await cookies()).get("token")?.value
    if(token && token === "admin") redirect("/03_module_b/protected")
    const onSubmit = async (formData: FormData)=>{
        'use server'
        const cookieStore = await cookies()
        const passphrase = formData.get("passphrase")
        if(passphrase==="admin"){
            cookieStore.set("token", "admin", {
                httpOnly: true,
                path: "/",
                maxAge: 60*60*24*7,
                sameSite: "lax",
                secure: false
            })
            return redirect("/03_module_b/protected")
        }
        return redirect("/unauthorized")
    }
    return(
        <div className="w-screen h-screen flex flex-col justify-center items-center bg-slate-200">
            <h1 className="text-2xl font-bold ">Login</h1>
            <form className="w-100 rounded-lg p-3 bg-white space-y-6" action={onSubmit}>
                <input type="text" name="passphrase" id="passphrase" className="w-full p-2 border" placeholder="Passphrase"/>
                <button type="submit" className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 cursor-pointer w-full">Submit</button>
            </form>
        </div>
    )
}