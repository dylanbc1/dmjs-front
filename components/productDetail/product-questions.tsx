import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IconExclamationCircle, IconCheck } from "@tabler/icons-react";
import { User } from "@/interfaces/user";
import style from '../navbar.module.css';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Product } from "@/actions/get-products";
import { Comment } from "@/interfaces/comment.interface";
import ReviewCard from "./review-card";
import CommentCard from "./comment-card";
import toast from "react-hot-toast";

interface ProductQuestionsProps {
  handleSubmitComment: React.FormEventHandler<HTMLFormElement>;
  errorComment: string | undefined;
  successComment: string | undefined;
  currentUser: User | null;
  comments?: Comment[] | null;
}

const ProductQuestions: React.FC<ProductQuestionsProps> = ({
  handleSubmitComment,
  errorComment,
  successComment,
  comments,
  currentUser,
}) => {
  if (errorComment) {
    toast.error('Necesitas estar logueado para realizar esta acción.')
  }

  if (successComment) {
    toast.success('Comentario realizado.')
  }

  return (
    <div className="my-6 flex flex-col gap-5">
      <h2 className="text-2xl font-bold">Preguntas</h2>
      <form onSubmit={handleSubmitComment} className="flex gap-5 flex-wrap sm:flex-nowrap">
        <Input name="description" placeholder="Haz una pregunta" />
        <Button type="submit" className={`${style.primaryBtn}`}>Enviar</Button>
      </form>

      <div className="flex flex-col gap-5">
      <AlertDialog>
        <AlertDialogTrigger className={`${style.secondaryBtn} px-4 py-2 text-white rounded-lg w-56`}>
          Ver todas las preguntas
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Todas las preguntas</AlertDialogTitle>
            <AlertDialogDescription className="max-h-[300px] overflow-auto text-black">
              {
                comments?.length ? comments?.slice(0, comments.length).map((comment, index) => (
                  <CommentCard key={comment.id || index} comment={comment} />
                )) : 'No hay preguntas para este producto.'
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cerrar</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
    </div>
  );
};

export default ProductQuestions;
