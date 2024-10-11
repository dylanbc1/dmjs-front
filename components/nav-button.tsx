import Link from "next/link"
import { Button } from "@/components/ui/button"
import styles from "../components/navbar.module.css"
import { cn } from "@/lib/utils"


type Props = {
    href: string
    label: string
    isActive?: boolean
}


export const NavButton = ({href, label, isActive}:Props) => {
    return (
        <Button
        asChild
        size="sm"
        variant="outline"
        className={cn(
            "text-[#cecece] hover:text-white text-base border-none hover:bg-transparent transition-all duration-300 font-medium hover:font-semibold"
        )}
        >
            <Link href={href}>
                {label}
            </Link>
            
        </Button>
    )
}

