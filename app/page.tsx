import Container from "../components/ui/container";
import { Billboard } from "../components/billboard";
import { getProducts } from "../actions/get-products";
import ProductList from "@/components/product-list";
import { Navbar } from "../components/navbar";
import CategoryCard from "@/components/ui/category-card";
import Categories from "@/components/categories";
import { getCategories } from "@/actions/get-categories";
import { useState, useEffect } from "react";
import { ProductCategory } from "@/interfaces/product-category.interface";
import { NavbarLanding } from "@/components/navbar-landing";


const Home = async () => {
  const products = await getProducts(1, 50, "ASC");
  const categories = await getCategories();

  return (
    <div>
      <NavbarLanding />
      <div className="bg-[#F8F8F8] w-full">
          <Billboard
            titles={["TECNOLOGÍA","CALIDAD","RENDIMIENTO"]}
            subtitle="Todo a tu alcance"
            btnText="Prueba DMaJorAI"
            //photoUrl="https://res.cloudinary.com/dbcdnlxle/image/upload/v1719460143/mouselogitechDH_iavvyp.png"
            photoUrl="https://res.cloudinary.com/dbcdnlxle/image/upload/v1739926754/dmajor-mouse_l0nk5j.png"
          />      
        <div className="flex space-y-10 flex-col gap-y-8 px-4 sm:px-6 lg:px-36 ">
          
          <Categories
          title="Categorías"
          items={categories}
          />
          
          <ProductList
            title="Productos disponibles"
            items={products.products || []} 
          />
        </div>
      </div>
    </div>
  );
};

export default Home;