import { getProductsFiltered } from "@/cookies/filtered-products.cookies";
import { useRouter } from "next/navigation";

export const filterProducts = async (filter: any) => {
    const router = useRouter();

    await getProductsFiltered(filter);

    const currentPath = window.location.pathname;

    if (!(currentPath === "/product/filter")) {
      router.push("/product/filter");
    }
}