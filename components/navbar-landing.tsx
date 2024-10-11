"use client";
import React, { useEffect, useState } from "react";
import styles from "./navbar.module.css";
import { useCart } from "@/hooks/cart/use-cart";
import { Button } from "./ui/button";
import { LogOut, Menu, ShoppingCart, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { UserButton } from "./profile/user-button-page";
import { ProductCategory } from "@/interfaces/product-category.interface";
import { getCategories } from "@/actions/get-categories";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useMedia } from "react-use";
import Cookies from "js-cookie";
import { FormSearch } from "./form-search";
import { ProductCategories } from "./product-categories";
import { NavbarRole } from "./navbar-role";
import { IconCancel, IconSearch, IconX } from "@tabler/icons-react";

export const NavbarLanding = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [isTransparent, setIsTransparent] = useState(true);
  const isMobile = useMedia("(max-width: 930px)", false);
  const router = useRouter();

  let id: number | null = null;
  const currentUser = Cookies.get("currentUser");

  if (currentUser) {
    try {
      const parsedUser = JSON.parse(currentUser);
      id = parsedUser.id;
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY <= 600) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }

      setIsTransparent(currentScrollY <= 50); 

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const cart = useCart();

  if (isMobile) {
    return (
      <nav
        className={`${styles.navbar} px-4 z-50 flex justify-between items-center h-20 ${
          showNavbar ? styles.show : styles.hide
        } ${isTransparent ? "bg-transparent" : "bg-[#1c1c3c]"}`}
      >
        <div className="flex-shrink-0">
          <a href="/" className="text-white text-2xl font-bold">
            DMajorStore
          </a>
        </div>
        <div className="flex gap-5 justify-center items-center">
          <button
            onClick={() => router.push("/cart")}
            className="text-white flex items-center relative px-5 py-2"
          >
            <ShoppingCart size={28} className="z-10" />
            <span className="absolute bg-purple-dark text-white z-[-10] rounded-full px-2 top-0 right-0 text-[#cecece] hover:text-white transition-all duration-300">
              {cart.items.length}
            </span>
          </button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger>
              <Button
                variant="outline"
                size="sm"
                className="font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition"
              >
                <Menu className="h-8 w-8 text-white" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="px-4 bg-[#1c1c3c] text-white border-none"
            >
              <nav className="flex flex-col gap-y-8 pt-6 text-xl">
                <FormSearch />
                <button
                  onClick={() => router.push("/")}
                  className={`${styles.navLink} text-left`}
                >
                  Inicio
                </button>
                <ProductCategories categories={categories}></ProductCategories>
                <NavbarRole
                  isMobile={true}
                  section="vender"
                  currentUser={currentUser}
                  idUser={null}
                />
                <button
                  onClick={() => router.push("/guides")}
                  className={`${styles.navLink} text-left`}
                >
                  DMajorAI
                </button>
                <NavbarRole
                  isMobile={true}
                  section="userButton"
                  currentUser={currentUser}
                  idUser={id}
                />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    );
  }

  return (
    <nav
      className={`${styles.navbar} z-50 ${
        showNavbar ? styles.show : styles.hide
      } ${isTransparent ? "bg-transparent" : "bg-[#1c1c3c]"}`}
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-36">
        <div className="flex items-center justify-between h-20 text-white">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a href="/" className="text-white text-2xl font-bold">
                DMajorStore
              </a>
            </div>
          </div>
          <div className="flex items-center justify-end flex-grow gap-2">
            {!searchVisible && (
              <>
                <button
                  onClick={() => router.push("/")}
                  className={`${styles.navLink}`}
                >
                  Inicio
                </button>
                <ProductCategories categories={categories} />
                <NavbarRole
                  isMobile={false}
                  section="vender"
                  currentUser={currentUser}
                  idUser={null}
                />
                <button
                  onClick={() => router.push("/guides")}
                  className={`${styles.navLink}`}
                >
                  DMajorAI
                </button>
                <button
                  onClick={() => setSearchVisible(!searchVisible)}
                  className={`flex items-center px-5 py-2 -mr-3 ${styles.navLink}`}
                >
                  <IconSearch />
                </button>
                
                <button
                  onClick={() => router.push("/cart")}
                  className="flex items-center relative px-5 py-2 mr-2"
                >
                  <ShoppingCart
                    size={28}
                    className="text-[#cecece] hover:text-white"
                  />
                  <span className="absolute bg-purple-dark text-[#cecece] hover:text-white z-[-10] rounded-full px-2 top-0 right-0">
                    {cart.items.length}
                  </span>
                </button>
                <NavbarRole
                  isMobile={false}
                  section="userButton"
                  currentUser={currentUser}
                  idUser={null}
                />
              </>
            )}
          </div>
        </div>
        <div
          className={`transition-transform duration-500 ease-in-out ${
            searchVisible ? "translate-y-0" : "-translate-y-20"
          } w-full py-5 absolute top-0 left-0 right-0 mx-auto px-4 sm:px-6 lg:px-36 flex gap-5 bg-[#1c1c3c] items-center`}
        >
          <FormSearch />
          <IconX
            onClick={() => setSearchVisible(false)}
            className="text-white cursor-pointer"
          />
        </div>
      </div>
    </nav>
  );
};
