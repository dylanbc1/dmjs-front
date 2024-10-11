import { getProductsFiltered } from "@/cookies/filtered-products.cookies";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const useCategories = ({ router }: { router: AppRouterInstance }) => {
    const filterProducts = async (filter: any) => {
        await getProductsFiltered(filter);
    
        const currentPath = window.location.pathname;
    
        if (!(currentPath === "/product/filter")) {
          router.push("/product/filter");
        }
    }

    const handleCategoryClick = async (categoryF: string) => {
        const filter = { category: categoryF }
        filterProducts(filter);
    }   

    return { 
        handleCategoryClick
    }
}