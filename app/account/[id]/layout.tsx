// AccountLayout.tsx
"use client";

import { Navbar } from "@/components/navbar";
import Sidebar from "@/components/profile/sidebar";
import { BookText, ShoppingBag, ShoppingCart, User } from "lucide-react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "../../theme";

type Props = {
  children: React.ReactNode;
};

const AccountLayout = ({ children }: Props) => {
  const router = useRouter();
  let id = null;
  const currentUser = Cookies.get("currentUser");

  if (currentUser) {
    try {
      const parsedUser = JSON.parse(currentUser);
      id = parsedUser.id;
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <div className="bg-[#f8f8f8]">
        <Sidebar />
        <div className="fixed bottom-0 left-0 w-full text-xs bg-[#1C1C3C] text-white md:hidden z-50 px-2">
          <div className="flex justify-evenly items-center gap-5 w-full h-24">
            <div
              onClick={() => router.push("/account/" + id + "/products")}
              className="flex flex-col flex-grow  justify-center gap-2 items-center text-white cursor-pointer"
            >
              <ShoppingBag className="size-4 text-white" />
              <span>Productos</span>
            </div>
            <div
              onClick={() => router.push("/account/" + id)}
              className="flex flex-col flex-grow justify-center gap-2 items-center text-white cursor-pointer"
            >
              <User className="size-4 text-white" />
              <span>Perfil</span>
            </div>
            <div
              onClick={() => router.push("/account/" + id + "/record")}
              className="flex flex-col flex-grow  justify-center gap-2 items-center text-white cursor-pointer"
            >
              <ShoppingCart className="size-4 text-white" />
              <span>Compras</span>
            </div>
            <div
              onClick={() => router.push("/account/" + id + "/orders")}
              className="flex flex-col flex-grow  justify-center gap-2 items-center text-white cursor-pointer"
            >
              <BookText className="size-4 text-white" />
              <span>Mis ordenes</span>
            </div>
          </div>
        </div>
        <main className="md:ml-60 pt-20 px-2 pb-28 md:pb-10 md:px-4 flex-1 h-full min-h-screen">
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
};

export default AccountLayout;
