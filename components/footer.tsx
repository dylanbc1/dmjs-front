import styles from "./footer.module.css";
import Image from "next/image";
import { headers } from "next/headers"; // to get actual url
import Link from "next/link";
import { IconBrandFacebook, IconBrandInstagram, IconBrandTwitter } from "@tabler/icons-react";

export const Footer = () => {
  const headerList = headers();
  const pathname = headerList.get("x-current-path");
  console.log("actual url " + pathname);

  if (pathname) {
    if (
      
      pathname.includes("account")
    ) {
      return null;
    }
  }

  return (
    <footer className={styles.footer}>
      <div className="text-gray-300 py-12">
        <div className="px-4 sm:px-6 lg:px-36 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center m-5">
          <Link href="/" passHref>
            <Image
              src="/images/logo-no-slogan.png"
              alt="DMajorStore Logo"
              width={96}
              height={96}
              className="w-20 h-24"
            />
          </Link>

          </div>
          <div className="flex flex-col items-center space-y-3 m-5">
            <p className="text-lg font-semibold text-white">Información</p>
            <Link
              href="/privacy-policy"
              className="hover:text-white transition-colors duration-300"
            >
              Políticas de privacidad
            </Link>
            <Link
              href="/terms-and-conditions"
              className="hover:text-white transition-colors duration-300"
            >
              Términos y condiciones
            </Link>
          </div>
          <div className="flex flex-col items-center space-y-3 m-5">
            <p className="text-lg font-semibold text-white">Acerca de</p>
            <Link
              href="/about-us"
              className="hover:text-white transition-colors duration-300"
            >
              Conócenos
            </Link>
            <Link
              href="/contact-us"
              className="hover:text-white transition-colors duration-300"
            >
              PQRS/Contáctanos
            </Link>
          </div>
          <div className="flex flex-col items-center space-y-3 m-5">
            <p className="text-lg font-semibold text-white">Síguenos</p>
            <div className="flex space-x-4 mt-2">
              <Link
                href="https://www.instagram.com/dmajorstore/"
                className="hover:text-white transition-colors duration-300"
              >
                <IconBrandInstagram />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <p className="text-sm">
            © 2024 DMajorStore | Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  );
};
