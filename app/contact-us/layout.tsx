'use client'
import { Navbar } from "@/components/navbar";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { Footer } from "@/components/footer";
import Image from "next/image";

const GuidesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <div className="flex-grow flex justify-center bg-[#f8f8f8] items-center w-full h-auto px-4 py-10 relative z-10">
        <div className="content-container">
          <h1 className="title font-bold text-center text-white">Contáctanos</h1>
          {children}
        </div>
      </div>
      <style jsx>{`
        .relative {
          position: relative;
          z-index: 1; 
        }
          .title {
          font-size: 2rem;}
        .content-container {
          width: 100%;
          max-width: 500px;
          background-color: #1c1c3c;
          border-radius: 10px;
          padding: 20px;
          margin-top: 70px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .flex-grow {
          flex-grow: 1;
        }
      `}</style>
    </div>
  );
};

export default GuidesLayout;