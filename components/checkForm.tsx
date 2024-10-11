"use client"
import { authApi } from "@/APIS"
import { TextField } from "@mui/material"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

const CheckForm = () =>{

    const router = useRouter();
    const [isPending, setIsPending] = useTransition()
    const [email, setEmail] = useState<string>('')

    const handleForgot = async() =>{
        await authApi.forgot(email)
        toast.success('Revisa tu correo.')
    }

    return (

        <>
            <form className="flex gap-3 flex-col w-full">
                <label htmlFor="email">Correo electronico</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    placeholder="jhonDoe@gmail.com"
                    className="w-full p-[10px] bg-primary border border-secondary rounded-lg"
                    disabled={isPending}
                    required
                    onChange={(e)=>setEmail(e.target.value)}
                />
                    
                    <button
                        type="button"
                        className="mt-2 bg-white/80 hover:bg-white text-[#1c1c3c] transition-all font-bold transition-all w-full p-[10px] rounded-3xl"
                        disabled={isPending}
                        onClick={handleForgot}
                    >
                    Enviar Email
                    </button>

            </form>
        </>

    )
}

export default CheckForm