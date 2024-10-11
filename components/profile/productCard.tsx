import React from "react";
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
} from "@mui/material";
import { Product } from "@/interfaces/product";
import { productApi } from "@/APIS";
import Link from "next/link";
import styles from "../../components/navbar.module.css";
import toast from "react-hot-toast";

interface productProps {
  products: Product;
  user: string;
}

const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

const ProductCard = (props: productProps) => {
  const onDelete = async () => {
    const updated = await productApi.updateProduct(props.products.id, props.products.product_name,
      props.products.description, Number(props.products.price), 0, props.products.photo_url,
      props.products.productCategoryId, props.user)

      toast.success('Producto desactivado.')
  };

  return (
    <Card
      sx={{
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        borderRadius: 2,
        overflow: "hidden", 
        transition: "transform 0.3s ease-in-out", 
        "&:hover": {
          transform: "scale(1.03)", 
        },
        display: "flex",
        flexDirection: "column",
      }}
      className="w-full"
    >
      <div className="flex gap-5">
        <CardMedia
          component="img"
          sx={{
            width: 100,
            height: 100,
            objectFit: "cover",
            backgroundColor: "#fff",
          }} 
          image={props.products.photo_url[0]}
          alt={props.products.product_name}
          className="my-auto"
        />
        <CardContent sx={{ flexGrow: 1, textAlign: "left" }}>
          <Typography variant="h6" className="font-semibold">
            {truncateText(props.products.product_name, 20)}
          </Typography>
          <Typography
            variant="h6"
            className="text-[#1c1c3c]"
            component="div"
            sx={{ mt: 1 }}
          >
            $ {props.products.price}
          </Typography>
        </CardContent>
      </div>
      <Box sx={{ display: "flex", justifyContent: "left", paddingBottom: 2, paddingX: 2 }}>
        <Button
          variant="contained"
          className={`${styles.primaryBtn} max-h-[40px]`}
          sx={{ mr: 1, textTransform: "none" }}
          href={`/account/${props.user}/products/update_product/${props.products.id}`}
        >
          Editar
        </Button>
        <Button
          variant="contained"
          className={`${styles.secondaryBtn} max-h-[40px]`}
          onClick={onDelete}
          sx={{ mr: 1, textTransform: "none" }}
        >
          Desactivar
        </Button>
        <Button
          variant="contained"
          className={`${styles.secondaryBtn} max-h-[40px]`}
          sx={{ textTransform: "none" }}
          href={`/account/${props.user}/products/questions_section/${props.products.id}`}
        >
          Preguntas
        </Button>
      </Box>
    </Card>
  );
};

export default ProductCard;
