import Image from "next/image"

export const Footer = ()=>{
    return(
        <div className="w-screen bg-white p-15">
            <div className="flex items-center justify-between mb-7">
                <Image src={"/03_module_d/media_files/images/logo.svg"} alt="app logo" width={200} height={200}/>

                <ul className="flex items-center gap-3">
                    <Image src={"/03_module_d/media_files/icons/icon-facebook.svg"} alt="facebook logo" width={20} height={20}/>
                    <Image src={"/03_module_d/media_files/icons/icon-instagram.svg"} alt="instagram logo" width={20} height={20}/>
                    <Image src={"/03_module_d/media_files/icons/icon-youtube.svg"} alt="youtube logo" width={20} height={20}/>
                </ul>
            </div>
            <hr />

            <div className="flex items-center justify-between my-6 text-slate-600">
                <p>C |  2025 Taiwan Explorer</p>

                <ul className="flex items-center gap-3">
                    <p>Privary Policy</p>
                    <p>Terms and Conditions</p>
                </ul>
            </div>
        </div>
    )
}