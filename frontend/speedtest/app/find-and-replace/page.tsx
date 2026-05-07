'use client';

import { useState } from "react";

export default function Page(){
    const [text, setText] = useState("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, accusamus adipisci dignissimos omnis porro consectetur labore corrupti quae ipsa enim nulla, similique officia earum nisi. Inventore laboriosam facere, eos quaerat voluptatem mollitia nisi ipsum porro. A quae commodi mollitia beatae laudantium eveniet sed nam quaerat alias, id illo nulla ducimus veritatis! Enim voluptatem vel rem hic numquam nisi delectus labore, magni sequi iusto cumque corrupti in facilis sed, incidunt necessitatibus illo iste a maxime minima. Iusto impedit dolore, commodi, cupiditate magni voluptas assumenda odit maxime rem asperiores aliquid excepturi facilis necessitatibus voluptatum. Nam quos rem dolores officia dignissimos non sunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi impedit exercitationem fugit quod. Voluptates ipsum quas sequi dicta debitis eos amet. Quas aperiam sit id rem optio hic commodi eius accusantium at nihil amet placeat excepturi libero veniam, explicabo porro officia! Voluptatem voluptate perferendis vitae vel iusto quasi corporis nam qui. Veritatis veniam impedit libero voluptatem inventore! Vel corporis velit ab iusto laboriosam molestias sint saepe repellendus ipsa. Sequi, molestiae. Ipsam, expedita ipsum? h uuntur corporis, ex ut quos voluptatem rem omnis tempore porro. Optio mollitia veritatis quisquam eligendi nobis placeat veniam molfggngghtnwtywtyytntynwyntyh estias aperiam molestiae, voluptatem magni iure? Facere, ad provident.")

    const [find, setFind] = useState("")
    const [sensitive, setSensitive] = useState(true)
    const [replace, setReplace] = useState("")

    const RenderText = () =>{
        const reg = new RegExp(`(${find})`, sensitive?"g":"gi")
        console.log("reg: ", reg)
        const parts = text.split(reg);
        console.log("Parts: ", parts)

        const test = parts.map((p, i)=>{
            const isMatch = sensitive?p===find:p.toLowerCase()===find.toLowerCase()
            if(isMatch){

                return (
                    <span key={i} className="bg-yellow-400 ">{p}</span>
                )
            }   
            return p
        })

        return(
            <div className="">{test}</div>
        )

    }

    const replaceSingle = ()=>{
        const reg = new RegExp(`(${find})`, sensitive?"":"i")
        const newText = text.replace(reg, replace)
        setText(newText)
    }
   
    const replaceAll = ()=>{
        const reg = new RegExp(`(${find})`, sensitive?"g":"gi")
        const newText = text.replace(reg, replace)
        setText(newText)
    }
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <div className="flex flex-col items-start gap-5 justify-between w-200">
                <div className="flex items-center justify-between gap-3 w-full">
                    <p>Find</p>
    
                    <input type="text" value={find} onChange={(e)=>setFind(e.target.value)} className="text-xl p-2 border rounded-xl"/>
                    <div className="flex">
                        <input
                            type="checkbox"
                            checked={sensitive}
                            onChange={() => setSensitive(!sensitive)}
                            />
                        <p>Case Sensitive</p>
                    </div>
                </div>
                <div className="flex items-center justify-between gap-3 w-full">
                    <p>Replace</p>
                    <input type="text" value={replace} onChange={(e)=>setReplace(e.target.value)} className="text-xl p-2 border rounded-xl"/>
                    <button className="bg-black text-white p-2 rounded-xl w-40" onClick={()=>replaceSingle()}>Replace</button>
                    <button className="bg-black text-white p-2 rounded-xl w-40" onClick={()=>replaceAll()}>Replace All</button>
                </div>
            </div>
            {RenderText()}
        </div>
    )
}