'use client';

import { useState } from "react";
import { PhotoSlider } from "../photo-slider";

const cultureImages = [
    {image: "/03_module_d/media_files/images/cultural-1.jpg", title: "Temple Etiquette Walk", desc: "Learn incense rituals, fortune sticks, and local customs."},
    {image: "/03_module_d/media_files/images/cultural-2.jpg", title: "Aboriginal Crafts", desc: "Textiles & woodcrafts with indigenous artisans."},
    {image: "/03_module_d/media_files/images/cultural-3.jpg", title: "Tea Ceremony in Alishan", desc: "Savor high-mountain oolongs and brewing technique."}
]

const culinaryImages = [
    {image: "/03_module_d/media_files/images/culinary-1.jpg", title: "Night Market Tasting", desc: "Stinky tofu, bubble tea, oyster omelets & more."},
    {image: "/03_module_d/media_files/images/culinary-2.jpg", title: "Sea-to-Table in Hualien", desc: "Fresh catch, coastal views, local recipes."},
    {image: "/03_module_d/media_files/images/culinary-3.jpg", title: "Pineapple Cake Workshop", desc: "Bake iconic treats to bring home."}
]

export const Culture = () =>{
    const [isCulture, setIsCulture] = useState(false)
    const [currentCulture, setCurrentCulture] = useState(0)
    const [currentCulinary, setCurrentCulinary] = useState(0)
    return (
        <div className="w-full bg-white container mx-auto my-20">
            <div className="flex items-center justify-between my-20">
                <h1 className="text-3xl font-bold ">Culture & Culinary Expereinces</h1>
                <div className="w-40 rounded-full bg-blue-950 grid grid-cols-2 text-center text-white font-bold">
                    <p className="w-full h-full p-2 " style={{backgroundColor: isCulture?"white":"", color: isCulture? "black":""}} onClick={()=>setIsCulture(false)}>Culinary</p>
                    <p className="w-full h-full p-2 " style={{backgroundColor: !isCulture?"white":"", color: !isCulture? "black":""}} onClick={()=>setIsCulture(true)}>Culture</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 relative mx-20">
                {!isCulture?(      
                    <PhotoSlider image={cultureImages[currentCulture].image} setState={setCurrentCulture}/>
                ):(
                    <PhotoSlider image={culinaryImages[currentCulinary].image} setState={setCurrentCulinary}/>
                )}

                <div className="w-full h-100 flex flex-col justify-center items-center gap-5">
                    {!isCulture?(      
                        <div className="space-y-4">
                            <h1 className="text-2xl font-bold">{cultureImages[currentCulture].title}</h1>
                            <h1 className="text-lg ">{cultureImages[currentCulture].desc}</h1>
                            <button className="bg-green-400 text-white w-60 p-2.5 rounded-full cursor-pointer hover:bg-green-500">Learn More about this Culture</button>
                        </div>
                    ):(
                        <div className="space-y-4">
                            <h1 className="text-2xl font-bold">{culinaryImages[currentCulinary].title}</h1>
                            <h1 className="text-lg ">{culinaryImages[currentCulinary].desc}</h1>
                            <button className="bg-green-400 text-white w-60 p-2.5 rounded-full cursor-pointer hover:bg-green-500">Learn More about this Culinary                    </button>
                        </div>
                    )}

                </div>
            </div>


        </div>
    )
}