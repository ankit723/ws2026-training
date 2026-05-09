'use client'

import { useState } from "react";

export default function Page(){
    const currentDate = new Date();

    const [year, setYear] = useState(currentDate.getFullYear());

    const [month, setMonth] = useState(currentDate.getMonth());

    function getDaysInMonth(year: number, month:number) {
        return new Date(year, month + 1, 0).getDate();
    }
    const totalDays = getDaysInMonth(year, month);

    const daysArray = Array.from({ length: totalDays }, (_, index) => index + 1);

    function getFirstDay(year:number, month:number){
        return new Date(year, month, 1).getDay();
    }

    const firstDay = getFirstDay(year, month);
    console.log("firstDay: ", firstDay)
    return(
        <div className="w-screen h-screen flex flex-col justify-center items-center p-40">
            <div className="">
                <p className="text-xl font-bold">Month: {month}</p>
            </div>
            <div className="w-full h-full grid grid-cols-7 grid-rows-7">
                {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(day=>(
                    <div key={day} className="border border-blue-400 flex justify-center items-center hover:bg-blue-300/50 cursor-pointer">
                        {day}
                    </div>
                ))}
                {
                    Array.from({length: firstDay}).map((d, i)=>(
                        <div key={i} className="border border-blue-400 flex justify-center items-center hover:bg-blue-300/50 cursor-pointer"></div>
                    ))
                }
                {
                    daysArray.map((day) => (
                        <div key={day} className="border flex justify-center items-center hover:bg-blue-300/50 cursor-pointer">
                            {day}
                        </div>
                    ))
                }
                {
                    Array.from({length: daysArray.length+firstDay}).map((day, i)=>(
                        <div key={i} className="border border-blue-400 flex justify-center items-center hover:bg-blue-300/50 cursor-pointer"></div>
                    ))
                }

            </div>
        </div>
    )
}