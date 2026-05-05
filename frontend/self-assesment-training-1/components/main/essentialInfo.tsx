'use client'

import Image from "next/image"
import Link from "next/link"

export const EssentialInfo = () =>{
    return(
        <div className="w-full bg-white container mx-auto my-60">
            <h1 className="text-3xl font-bold ">Essential  Information</h1>
            <p className="mt-3 text-xl">Official support and key contacts for your trip to Taiwan.</p>

            <div className="mx-5 grid grid-cols-1 lg:grid-cols-3  gap-5 mt-10">
                <div className="">
                    <h1 className="text-xl font-bold"> Taiwan Tourism Bureau Card</h1>
                    
                    <p className="flex items-center gap-3"><Image src="/03_module_d/media_files/icons/icon-globe.svg" alt="icon" width={20} height={20}/> Taiwan Tourism Bureau</p>
                    <p className="flex items-center gap-3"><Image src="/03_module_d/media_files/icons/icon-globe.svg" alt="icon" width={20} height={20}/> +886-2-0000-0000</p>
                    <p className="flex items-center gap-3"><Image src="/03_module_d/media_files/icons/icon-globe.svg" alt="icon" width={20} height={20}/> info@example.com </p>
                    <p className="flex items-center gap-3"><Image src="/03_module_d/media_files/icons/icon-globe.svg" alt="icon" width={20} height={20}/> example.com</p>

                    <button className="bg-blue-950 text-white p-2 w-40 rounded-full" onClick={()=>{
                        const utt = new SpeechSynthesisUtterance("Taiwan Tourism Bureau: Phone plus eight eight six dash two dash zero zero zero zero dash zero zero zero zero. Email info at example dot com. Official site at example dot com. For urgent help, dial zero zero zero for police or zero zero zero for emergencies.")
                        window.speechSynthesis.speak(utt)
                    }}>Read Aloud</button>
                    <button  className="bg-blue-950 text-white p-2 w-40 rounded-full" onClick={()=>{
                        window.speechSynthesis.cancel()
                    }}>Stop Reading</button>
                </div>
                
                <div className="">
                    <h1 className="text-xl font-bold flex items-center gap-3"><Image src="/03_module_d/media_files/icons/icon-globe.svg" alt="icon" width={20} height={20}/> Official Website QR</h1>
                    
                    <div className="grid grid-cols-2">
                        <div className="">
                            <Image src="/03_module_d/media_files/icons/icon-globe.svg" alt="icon" width={20} height={20} className="w-full h-full"/>
                        </div>
                        <div className="w-full h-full flex flex-col justify-center">
                            <p className="flex items-center gap-3"><Image src="/03_module_d/media_files/icons/icon-globe.svg" alt="icon" width={20} height={20}/> Taiwan Tourism Bureau</p>
                            <button className="bg-blue-950 hover:scale-105 active:scale-95 transition-all text-white p-2 rounded-md">View Site</button>
                        </div>
                    </div>
                </div>

                <div className="">
                    <h1 className="text-xl font-bold">Emergency & Safety Contacts Card</h1>
                    
                    <p className="flex items-center gap-3"><Image src="/03_module_d/media_files/icons/icon-globe.svg" alt="icon" width={20} height={20}/> Police: 000</p>
                    <p className="flex items-center gap-3"><Image src="/03_module_d/media_files/icons/icon-globe.svg" alt="icon" width={20} height={20}/>Fire/Ambulance: 000</p>
                    <p className="flex items-center gap-3"><Image src="/03_module_d/media_files/icons/icon-globe.svg" alt="icon" width={20} height={20}/> Tourist Hotline: 0800-000-000 </p>
                </div>


            </div>

            <div className="w-full flex flex-col items-center justify-center my-20">
                <h1 className="text-3xl font-bold ">Downloadable Travel Guide</h1>
                <p className="mt-3 text-xl">Comprehensive PDF guide with maps, itineraries, and essential tips for your Taiwan adventure.
                Download Travel Guide (PDF)</p>

                <Link href={"/03_module_d/media_files/pdf/taiwan-travel-guide.pdf"} download={true} className="text-center bg-green-400 text-white w-60 p-2.5 rounded-full cursor-pointer hover:bg-green-500 hover:scale-105 active:scale-95 transition-all mt-10">Download Now {"->"}</Link>
            </div>

        </div>
    )
}