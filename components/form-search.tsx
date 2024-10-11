import { useState } from "react";
import styles from "./navbar.module.css";
import { getProductsFiltered } from "@/cookies/filtered-products.cookies";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { IconSearch } from "@tabler/icons-react";

export const FormSearch = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();

    const handleSearchSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const filters = { search: searchTerm };
        await getProductsFiltered(filters);
    
        const currentPath = window.location.pathname;
    
        if (!(currentPath === "/product/filter")) {
          router.push("/product/filter");
        }
      };    

    return (
        <form className={`flex w-full ${styles.formContainer}`} onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full flex-grow ${styles.searchInput}`}
                />
                <button type="submit" className={styles.searchButton}>
                  <IconSearch />
                </button>
        </form>
    )
}