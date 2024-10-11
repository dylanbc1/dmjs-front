import { Navigation } from "@/components/navigation";
import { Navbar } from "@/components/navbar";

const LayoutProduct = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div>
        <div className="min-h-screen bg-[#F8F8F8] pt-24 w-full p-10 px-4 sm:px-6 lg:px-36">
          {children}
        </div>
      </div>
    </>
  );
};

export default LayoutProduct;
