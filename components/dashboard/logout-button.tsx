'use client'

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import styles from "../navbar.module.css";

interface LogoutButtonProps {
    children?: React.ReactNode;
}

export const LogoutButton = ({
    children
}: LogoutButtonProps) => {
    const router = useRouter()
    const onClick = () => {

        Cookies.remove("currentUser");
        router.push("/");
    }
    return (
        <span onClick={onClick} className={`${styles.navLink} cursor-pointer`}>
            {children}
        </span>
    )
}