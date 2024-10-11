"use client";

import React, { useState } from "react";
import { Product } from "../interfaces/product.interface";
import ProductCard from "./ui/product-card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ProductListProps {
  title: string;
  items: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ title, items }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  const filteredItems = items.filter(item => item.quantity > 0);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="space-y-4 pb-8">
      <h3 className="font-bold text-3xl">{title}</h3>
      <div className="flex flex-wrap gap-5 justify-center">
        {currentItems.map((item) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          {
            <PaginationItem className="cursor-pointer">
              {currentPage > 1 ? (
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                />
              ) : (
                <PaginationPrevious onClick={() => handlePageChange(totalPages)} />
              )}
            </PaginationItem>
          }
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index} className="cursor-pointer">
              <PaginationLink
                onClick={() => handlePageChange(index + 1)}
                isActive={currentPage === index + 1}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          {
            <PaginationItem className="cursor-pointer">
              {currentPage < totalPages ? (
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                />
              ) : (
                <PaginationNext onClick={() => handlePageChange(1)} />
              )}
            </PaginationItem>
          }
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ProductList;
