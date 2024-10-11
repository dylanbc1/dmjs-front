"use client"
import { useEffect, useState } from "react";
import { productApi } from "@/APIS";
import { Rating } from "@mui/material";

interface ReviewCardProps {

  product_id:string | undefined;
}
  
const ReviewTotalCard: React.FC<ReviewCardProps> = ({ product_id }) => {

    const [totalReviews, setTotalReviews]= useState<number>(0.0)

    const displayValue = Number.isNaN(totalReviews) ? 0 : parseFloat(totalReviews.toFixed(1));

    useEffect(()=>{
        const fetchData = async () =>{
            if(product_id){ 
                const res = await productApi.totalRating(product_id); 
                console.log(res)
                setTotalReviews(res)
            }
            
        }

        fetchData();

    },[])

  return (
    <div className="flex gap-3 p-2 justify-center items-center border-b-[1px] border-b-gray-400">
      <div className="flex gap-1 justify-center items-center flex-col min-w-32">
        <div className="mx-auto p-4">
            <div className="text-8xl font-bold flex-col flex text-center">{displayValue}</div>
            <div>
            { <Rating 
                style={{color : "#1C1C3C"}} 
                value={displayValue}
                readOnly
                precision={0.1}
            />}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewTotalCard;
