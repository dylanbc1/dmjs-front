"use client";

import { getProductById } from "@/actions/get-product";
import { useEffect, useState, useTransition } from "react";
import Cookies from "js-cookie";
import { createComment } from "@/actions/create-comment";
import ProductDetails from "@/components/productDetail/product-details";
import ProductSidebar from "@/components/productDetail/product-information";
import { Product } from "@/interfaces/product.interface";
import { User } from "@/interfaces/user";
import { userApi } from "@/APIS";
import { Address } from "@/interfaces/address";
import toast from "react-hot-toast";

const getCurrentUserFromCookies = (): User | null => {
  const userCookie = Cookies.get("currentUser");
  return userCookie ? JSON.parse(userCookie) : null;
};

const PageProduct = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [errorComment, setErrorComment] = useState<string | undefined>("");
  const [successComment, setSuccessComment] = useState<string | undefined>("");
  const [isPendingComment, setIsPendingComment] = useTransition();
  const [currentUser, setCurrentUser] = useState<User | null>(getCurrentUserFromCookies);
  const [addresses, setAddresses] = useState<Address[]>()

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProductById(id);
      setProduct(response);
      if(currentUser){
        const user = await userApi.findOneUser(currentUser?.id)
        setAddresses(user?.addresses)
      }
        
    };

    fetchData();
  }, [currentUser, id]);

  const handleSubmitComment: React.FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    event.preventDefault();

    if (!currentUser) {
      toast.error('Necesitas estar logueado para realizar esta acción.');
      return;
    }

    const values = {
      description: event.currentTarget.description.value,
      user_id: currentUser.id,
      product_id: id,
    };

    createComment(values).then((data: any) => {
        console.log(data);

        if (data?.error) {
          toast.error('Necesitas estar logueado para realizar esta acción.');
        } else {
          toast.success('Comentario realizado.')
        }
      });
  };

  return (
    <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row">
        <ProductDetails
          product={product}
          handleSubmitComment={handleSubmitComment}
          errorComment={errorComment}
          successComment={successComment}
          currentUser={currentUser ? currentUser : null}
        />
        <ProductSidebar product={product} user={currentUser} addresses={addresses}/>
      </div>
      {/* <ProductList
        title="Seller products"
        products={Array.from({ length: 3 }).map(() => product)}
      />
      <ProductList
        title="Related products"
        products={Array.from({ length: 3 }).map(() => product)}
      /> */}
    </div>
  );
};

export default PageProduct;
