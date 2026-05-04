import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/main/contactForm";
import { Culture } from "@/components/main/culture";
import { EssentialInfo } from "@/components/main/essentialInfo";
import { PracticalInformation } from "@/components/main/praacticalInfo";
import { RegionalGuide } from "@/components/main/regionalGuide";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-screen min-h-screen">
      <div className="hero w-full h-[91vh] flex items-center    " style={{backgroundImage: "url('/media_files/images/taiwan-cover.jpg')", backgroundPosition: "center ", backgroundSize: "cover"}}>
        <div className="absolute inset-0 w-screen h-[91vh] bg-black/30 z-1"></div>
        <div className="z-10 container mx-auto flex flex-col items-start gap-5 mt-36">
            <h1 className="text-5xl text-white font-bold">Taiwan: Small Island, Big Adventures</h1>
            <p className="text-white text-2xl">From marble gorges to neon nights—discover four regions, countless experiences.</p>
            <button className="bg-green-400 text-white w-60 p-2.5 rounded-full cursor-pointer hover:bg-green-500">Explore more {"->"}</button>
        </div>
      </div>

      <div id="regional-guide">
        <RegionalGuide />
      </div>
      <div id="experiences">
        <Culture />
      </div>
      <div id="practical-information">
        <PracticalInformation />
      </div>
      <div id="essential-information">
        <EssentialInfo />
      </div>
      <div id="contact">
        <ContactForm />
      </div>
      <Footer />
    </div>
  );
}
