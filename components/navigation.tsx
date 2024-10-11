'use client'

import { usePathname } from "next/navigation"
import { NavButton } from "@/components/nav-button"
import { useMedia } from "react-use"
import styles from "../components/navbar.module.css"
import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { UserButton } from "./dashboard/user-button"

const routes = [
    {
        href: "/admin",
        label: "Panel"
    },
    {
        href: "/admin/users",
        label: "Usuarios"
    }
]

export const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter()
    const pathname = usePathname()

    const isMobile = useMedia("(max-width: 1024px)", false)

    const onClick = (href: string) => {
        router.push(href)
        setIsOpen(false)
    }

    if (isMobile) {
        return (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger>
                    <Button 
                      variant="outline"
                      size="sm"
                      className="font-normal bg-white/10 hover:bg-white/202 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition"
                    >
                    <Menu className="h4- w-4"/>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="bg-white px-2">
                    <nav className="flex flex-col gap-y-2 pt-6">
                        {routes.map((route)=>(
                            <Button
                                key={route.href}
                                variant={route.href === pathname ? "secondary" : "ghost"}
                                onClick={() => onClick(route.href)}
                                className={`${styles.navLinkSecondary} w-full justify-start `}
                            >
                                {route.label}
                            </Button>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
        )
    }

    return (
        <nav className="mr-3 hidden lg:flex items-center gap-x-2 overflow-x-auto">
            {routes.map((route)=>(
              <NavButton
              key={route.href}
              href={route.href}
              label={route.label}
              isActive={pathname === route.href} />
            ))}
           
        </nav>
    )
}