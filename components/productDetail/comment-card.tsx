import { IconUser } from "@tabler/icons-react";
import { Comment } from "@/interfaces/comment.interface";
import Image from "next/image";

interface CommentCardProps {
  comment: Comment;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  return (
    <div className="flex gap-3 p-2 justify-center items-center border-b-[1px] border-b-gray-400">
      <div className="flex gap-1 justify-center items-center flex-col min-w-32">
        <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center">
          {comment?.customerId?.photo_url ? (
            <Image
              src={comment.customerId.photo_url}
              width={40}
              height={40}
              className="rounded-full"
              alt={"Foto de perfil de " + comment.customerId.name}
            />
          ) : (
            <IconUser size={40} />
          )}
        </div>
        <div>
            {comment?.customerId?.name
                ? comment.customerId.name
                : ""}
        </div>
      </div>
      <p className="flex-grow">
        {comment?.description
          ? comment.description
          : "No hay preguntas para este producto."}
      </p>
    </div>
  );
};

export default CommentCard;
