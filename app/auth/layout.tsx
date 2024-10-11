import { Navbar } from "@/components/navbar";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { Footer } from "@/components/footer";
import Image from "next/image";
import { createContext } from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  
  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden">
      <div className="absolute inset-0 z-0">
        <BackgroundGradientAnimation />
      </div>
      <div className="flex-grow flex justify-center items-center w-full h-auto px-4 py-10 relative z-10 ">
        <div className="bg-primary flex w-full max-w-[500px] p-[40px] flex-col items-start gap-[40px] flex-shrink-0 text-secondary rounded-lg shadow-lg opacity-85">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
