'use client';

import { HamburgerIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react";

export const Navbar = ()=>{
    const [isSidebarOpen, setIsSideBarOpen] = useState(false)
    return(
        <div className="bg-white w-screen h-20 py-2 px-20 flex justify-between items-center fixed top-0 z-20">
            <Link href={"/"} className="">
                <Image src={"/media_files/images/logo.svg"} alt="Logo" width={100} height={100} className="w-80"/>
            </Link>

            <div className="">
                <ul className="hidden lg:flex items-center text-md font-medium gap-3">
                    <li>
                        <Link href={"#regional-guide"}>Regional Guide</Link>
                    </li>
                    <li>
                        <Link href={"#experiences"}>Experience</Link>
                    </li>
                    <li>
                        <Link href={"#practical-information"}>Practical Information</Link>
                    </li>
                    <li>
                        <Link href={"#essential-information"}>Essential Information</Link>
                    </li>
                    <li>
                        <Link href={"#contact"}>Contact</Link>
                    </li>
                </ul>

                <div className="lg:hidden block cursor-pointer bg-white p-2" onClick={()=>setIsSideBarOpen(p=>!p)}>
                    <HamburgerIcon size={25}/>
                </div>
            </div>

            {
                isSidebarOpen && (
                    <div className=" fixed z-20 top-0 left-0 w-80 bg-white shadow-3xl h-screen p-8 text-black">
                        <div className="flex items-center justify-between">
                            <p className="font-bold text-md">Menu</p>
                            <p className="font-bold text-md" onClick={()=>setIsSideBarOpen(false)}>X</p>
                        </div>

                        <ul className="flex flex-col items-start mt-20  text-md font-medium gap-6">
                            <li>
                                <Link href={"#regional-guide"}>Regional Guide</Link>
                            </li>
                            <li>
                                <Link href={"#experiences"}>Experience</Link>
                            </li>
                            <li>
                                <Link href={"#practical-information"}>Practical Information</Link>
                            </li>
                            <li>
                                <Link href={"#essential-information"}>Essential Information</Link>
                            </li>
                            <li>
                                <Link href={"#contact"}>Contact</Link>
                            </li>
                        </ul>

                    </div>
                )
            }
        </div>
    )
}