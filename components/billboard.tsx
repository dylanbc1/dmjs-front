import Link from "next/link";
import { HoverBorderGradientDemo } from "./hoverBorderGradient";
import styles from "./navbar.module.css";
import { FlipWordsDemo } from "./flipWordsDemo";

interface BillboardProps {
  titles: string[];
  subtitle: string;
  btnText: string;
  photoUrl: string;
}

export const Billboard = ({
  titles,
  photoUrl,
  subtitle,
  btnText,
}: BillboardProps) => {
  return (
    <div className="overflow-hidden">
      <div
        className="min-h-screen relative text-white justify-end flex text-center gap-5 py-10 flex-col items-center overflow-hidden bg-cover bg-fixed bg-top"
        style={{ backgroundImage: `url(${photoUrl})` }}
      >
        <FlipWordsDemo />
        <p className="text-2xl font-medium">{subtitle}</p>
        <Link href="/guides">
          <HoverBorderGradientDemo />
        </Link>
        {/*<button className={`${styles.primaryBtn} px-6 py-2 bg-black text-white rounded-lg`}>
        {btnText}
    </button>*/}
      </div>
    </div>
  );
};
