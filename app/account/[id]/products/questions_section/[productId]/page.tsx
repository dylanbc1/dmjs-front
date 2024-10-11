"use client";
import React, { use, useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Order } from "@/interfaces/order";
import { productApi, resourceApi } from "@/APIS";
import { Comment } from "@/interfaces/comment.interface";
import { SendIcon } from "lucide-react";
import styles from "../../../../../../components/navbar.module.css";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

interface Props {
  params: { id: string; productId: string };
}

const getCurrentUserFromCookies = (): string | null => {
  const userCookie = Cookies.get("currentUser");
  return userCookie ? JSON.parse(userCookie).id : null;
};

const QuestionsPage = ({ params }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const opened = Boolean(anchorEl);
  const [open, setOpen] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>();
  const [commentary, setComment] = useState<string>("");
  const [user, setUser] = useState<string | null>(getCurrentUserFromCookies)
  const router = useRouter();



  useEffect(() => {
    const fetchData = async () => {
      const res = await productApi.findOneProduct(params.productId);
      console.log(res.comments);
      setComments(res.comments);
    };

    fetchData();
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleMessage = async (comment_id:string) => {
    if(user){
      await resourceApi.answerQuestion(comment_id,params.productId,user, commentary)
      toast.success('Comentario respondido.')
      router.push(`/account/${params.id}/products`)
    }else{
      toast.error('Necesitas loguearte para realizar esta acción.')
    }
    
  };

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-3xl">Preguntas y comentarios</h3>
        <Button
          variant="contained"
          className={`${styles.secondaryBtn}`}
          sx={{ textTransform: "none" }}
          onClick={() => router.back()}
        >
          Volver
        </Button>
      </div>
      <div className="mt-5 flex gap-5 flex-col">
        {comments?.length !== 0 ? 
          <>
            {comments?.map((comment) => (
            <Card key={comment.id} sx={{
              transition: "transform 0.3s ease-in-out", // Transición para el efecto de escala
              "&:hover": {
                transform: "scale(1.03)", // Escala al hacer hover
              }
            }}>
              <CardContent className="flex justify-between items-center p-4">
                <h4>{comment.description}</h4>
                <Button
                  id="demo-customized-button"
                  aria-controls={opened ? "demo-customized-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={opened ? "true" : undefined}
                  variant="contained"
                  disableElevation
                  style={{ background: "#1c1c3c" }}
                  onClick={handleClick}
                  endIcon={<SendIcon size={18} />}
                  className={`${styles.primaryBtn} ml-auto text-white px-6 mt-2 mr-2`}
                  sx={{ textTransform: "none" }}
                >
                  Responder
                </Button>
                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>Responder al comentario</DialogTitle>
                  <DialogContent className="w-[500px]">
                    <TextField
                      fullWidth
                      margin="dense"
                      value={commentary}
                      onChange={(e) => setComment(e.target.value)}
                      autoFocus={false}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => {
                        handleMessage(comment.id);
                        handleClose();
                      }}
                      color="primary"
                      className={`${styles.primaryBtn} ml-auto text-white px-6 mt-2 mr-2`}
                      sx={{ textTransform: "none" }}
                    >
                      Confirmar
                    </Button>
                    <Button
                      className={`${styles.secondaryBtn} ml-auto text-white px-6 mt-2`}
                      sx={{ textTransform: "none" }}
                      onClick={handleClose}
                    >
                      Cancelar
                    </Button>
                  </DialogActions>
                </Dialog>
              </CardContent>
            </Card>
          ))}
          </>
        :
         <p className='mt-5'>No hay resultados</p> 
        }
        
      </div>
    </Container>
  );
};

export default QuestionsPage;
