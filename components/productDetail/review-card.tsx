import { IconUser } from "@tabler/icons-react";
import { Review } from "@/interfaces/review.interface";
import Image from "next/image";

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="flex gap-3 p-2 justify-center items-center border-b-[1px] border-b-gray-400">
      <div className="flex gap-1 justify-center items-center flex-col min-w-32">
        <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center">
          {review?.customer?.photo_url ? (
            <Image
              src={review?.customer?.photo_url}
              width={40}
              height={40}
              className="rounded-full"
              alt={"Foto de perfil de " + review?.customer?.name}
            />
          ) : (
            <IconUser size={40} />
          )}
        </div>
        <div>Nota: {review.score}</div>
      </div>
      <p className="flex-grow">
        {review.comment ? review.comment : "No hay reseña para este producto."}
      </p>
    </div>
  );
};

export default ReviewCard;
