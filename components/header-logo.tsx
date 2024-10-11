import Link from "next/link"
import Image from "next/image"

export const HeaderLogo = () => {
    return(
        <Link href="/admin">
            <div className="items-center hidden lg:flex">
                <p className="font-semibold text-white text-2xl ml-2.5">
                    Administrador
                </p>
            </div>
        </Link>
    )
}