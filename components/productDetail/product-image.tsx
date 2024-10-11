import Image from "next/image";
import { useState } from "react";
import { Box, Button, IconButton } from "@mui/material";
import { Gallery } from "./gallery";

interface ProductImageProps {
  photoUrl: string[] | undefined;
  productName: string | undefined;
}

const ProductImage: React.FC<ProductImageProps> = ({
  photoUrl,
  productName,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!photoUrl || photoUrl.length === 0) {
    return (
      <Image
        src=""
        alt="Empty product!"
        width={400}
        height={400}
        className="rounded-lg mx-auto"
      />
    );
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? photoUrl.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === photoUrl.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Box textAlign="center">
      <div className="mx-auto w-full sm:w-[400px] h-auto">
        <Gallery images={photoUrl}/>
      </div>
    </Box>
  );
};

export default ProductImage;
