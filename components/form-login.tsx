"use client";

import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { IconExclamationCircle } from "@tabler/icons-react";
import { IconCheck } from "@tabler/icons-react";
import { use, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/actions/login";
import { useLogin } from "@/hooks/auth/useLogin";
import Cookies from "js-cookie";
import Link from "next/link";

const FormLogin = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, setIsPending] = useTransition();
  const { login } = useLogin();
  const router = useRouter();

  const handleGoogleSubmit = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google/callback`;
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    const values = {
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
    };

    setError("");
    setSuccess("");

    setIsPending(() => {
      login(values.email, values.password).then((data) => {
        if (data?.error) {
          setError(data.error);
          return;
        }
        const currentUser = Cookies.get("currentUser");
        const role = currentUser
          ? JSON.parse(currentUser).role
          : currentUser
          ? JSON.parse(String(currentUser)).role
          : null;
        if (role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      });
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex gap-3 flex-col w-full">
        <label htmlFor="email">Correo electrónico</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="jhonDoe@gmail.com"
          className="w-full p-[10px] bg-primary border border-secondary rounded-lg"
          disabled={isPending}
          required
        />
        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="*******"
          className="w-full p-[10px] bg-primary border border-secondary rounded-lg"
          disabled={isPending}
          required
        />
        <Link href={"/auth/checkEmail"} className="underline">
          ¿Olvidaste tu contraseña?
        </Link>
        {error && (
          <div className="text-white font-bold bg-red-500 mt-2 rounded-lg px-2 py-1 flex gap-2">
            <IconExclamationCircle /> {error}
          </div>
        )}
        {success && (
          <div className="text-white font-bold bg-green-500 rounded-lg mt-2 px-2 py-1 flex gap-2">
            <IconCheck /> {success}
          </div>
        )}
        <button
          type="submit"
          className="mt-2 bg-white/80 hover:bg-white text-[#1c1c3c] transition-all font-bold transition-all w-full p-[10px] rounded-3xl"
          disabled={isPending}
        >
          Ingresar
        </button>
        <button
          className="mt-2 bg-transparent border-2 border-white/80 hover:bg-[#14142c] text-white/80 transition-all font-bold transition-all w-full p-[10px] rounded-3xl"
          disabled={isPending}
          onClick={() => router.push("/")}
        >
          Volver al inicio
        </button>
        <div className="flex justify-center items-center gap-2">
          <div className="bg-secondary w-full h-[2px]"></div>
          <span>O</span>
          <div className="bg-secondary w-full h-[2px]"></div>
        </div>

        <button
          className="bg-white/80 hover:bg-white text-[#1c1c3c] transition-all px-2 py-3 w-16 rounded-lg flex justify-center items-start mx-auto"
          onClick={handleGoogleSubmit}
        >
          <IconBrandGoogleFilled className="text-primary" />
        </button>
      </form>
    </>
  );
};

export default FormLogin;
