"use client";
import { productApi } from "@/APIS";
import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../../../../../components/navbar.module.css";
import { uploadImageCloudinaryProduct } from "@/cloudinary";
import { ProductCategory } from "@/interfaces/product-category.interface";
import toast from "react-hot-toast";

interface Props {
  params: { id: string; productId: string };
}

const UpdateProductPage = ({ params }: Props) => {
  const router = useRouter();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [productCategories, setProductCategories] = useState<ProductCategory[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      const res = await productApi.findOneProduct(params.productId);
      console.log(res);
      setName(res.product_name);
      setDescription(res.description);
      setPrice(res.price);
      setQuantity(res.quantity);
      setSelectedImages(res.photo_url);
      setCategory(res.product_category.id);
    };

    fetchData();
  }, [params.productId]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const readers = files.map((file) => {
        return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      Promise.all(readers).then((results) => {
        const images = results.map((result) => result?.toString() || "");
        setSelectedImages(images);
      });
    }
  };

  const handleUpdate = async () => {
    try {
      const uploadPromises = selectedImages.map((image) =>
        uploadImageCloudinaryProduct(image)
      );

      const uploadResults = await Promise.all(uploadPromises);

      const uploadedUrls = uploadResults
        .filter(([status, url]) => status)
        .map(([status, url]) => url);

      const product = await productApi.updateProduct(
        params.productId,
        name,
        description,
        Number(price),
        Number(quantity),
        uploadedUrls,
        category,
        params.id
      );
      toast.success('Producto actualizado.');
      router.push(`/account/${params.id}/products`);
    } catch (error) {
      toast.error('Error actualizando el producto.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await productApi.findProductsCategory();
      setProductCategories(res);
    };

    fetchData();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <h3 className="font-bold text-3xl">Editar producto</h3>
      <Grid
        container
        className="mt-5"
        direction="column"
        style={{ minHeight: "90vh" }} // Para centrar verticalmente
      >
        <Grid item className="w-full">
          <Box
            p={2}
            boxShadow={3}
            borderRadius={8}
            style={{ width: "100%", maxWidth: "900px" }}
            className="mx-auto bg-white shadow-md rounded-lg"
          >
            <form noValidate autoComplete="off">
              <Box
                sx={{
                  textAlign: "center",
                  p: 2,
                  border: "1px dashed gray",
                  borderRadius: "8px",
                  bgcolor: "#f9f9f9",
                }}
              >
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="upload-button-file"
                  type="file"
                  onChange={handleImageChange}
                  multiple
                />
                <label htmlFor="upload-button-file">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    className={`${styles.secondaryBtn} ml-auto text-white px-6 mt-2`}
                    sx={{ textTransform: "none" }}
                  >
                    Seleccionar Imágenes
                  </Button>
                </label>
                {selectedImages.length > 0 && (
                  <Box mt={2}>
                    <Typography variant="subtitle1" gutterBottom>
                      Vista previa de las imágenes:
                    </Typography>
                    <Grid container spacing={2}>
                      {selectedImages.map((image, index) => (
                        <Grid item key={index}>
                          <Box
                            component="img"
                            sx={{
                              height: 200,
                              width: "auto",
                              borderRadius: "8px",
                              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            }}
                            src={image}
                            alt={`Selected ${index + 1}`}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}
              </Box>

              <Box mb={2}>
                <Typography variant="body1" gutterBottom>
                  Nombre
                </Typography>
                <TextField
                  label="Ingrese nombre del producto"
                  value={name}
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
              <Box mb={2}>
                <Typography variant="body1" gutterBottom>
                  Descripción
                </Typography>
                <TextField
                  label="Ingrese descripción del producto"
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Box>
              <Box mb={2}>
                <Typography variant="body1" gutterBottom>
                  Precio
                </Typography>
                <TextField
                  label="Ingrese precio del producto"
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  value={price}
                  onChange={(e) => setPrice(+e.target.value)}
                />
              </Box>
              <Box mb={2}>
                <Typography variant="body1" gutterBottom>
                  Cantidad
                </Typography>
                <TextField
                  label="Ingrese cantidad del producto"
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  value={quantity}
                  onChange={(e) => setQuantity(+e.target.value)}
                />
              </Box>
              <Box mb={2}>
                <p className="block w-full truncate whitespace-nowrap overflow-hidden">
                  Categoría
                </p>
                <Select
                  fullWidth
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                >
                  {productCategories.map((category) => (
                    <MenuItem value={category.id} key={category.id}>
                      {category.category}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box mt={2}>
                <Button
                  className={`${styles.primaryBtn} ml-auto text-white px-6 mt-2 mr-2`}
                  sx={{ textTransform: "none" }}
                  onClick={handleUpdate}
                >
                  Actualizar
                </Button>
                <Button
                  className={`${styles.secondaryBtn} ml-auto text-white px-6 mt-2`}
                  sx={{ textTransform: "none" }}
                  onClick={() => router.back()}
                >
                  Volver
                </Button>
              </Box>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UpdateProductPage;
