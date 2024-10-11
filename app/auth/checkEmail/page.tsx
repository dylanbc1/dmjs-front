import CheckForm from "@/components/checkForm"
import { Container } from "@mui/material"
import Image from "next/image"
import Link from "next/link"




const CheckPage = () =>{
    return(
        <>
            <Container className="flex flex-col justify-center items-center w-full">
                <Link href="/" passHref>
                <Image
                src="/images/logo-no-slogan.png"
                alt="DMajorStore Logo"
                width={96}
                height={96}
                className="w-20 h-24 mx-auto"
                />
                </Link>
            </Container>

            <h1 className="text-4xl text-center w-full font-bold">Ingrese su correo</h1>
            <CheckForm/>
        </>
        

    )
}

export default CheckPage