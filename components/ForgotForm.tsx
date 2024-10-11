"use client"
import { authApi, userApi } from "@/APIS"
import { TextField } from "@mui/material"
import { useEffect, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { User } from "@/interfaces/user"
import toast from "react-hot-toast"


interface ForgotProps {
    id:string
}

const ForgotForm: React.FC<ForgotProps> = ({id}) =>{

    const router = useRouter();
    const [isPending, setIsPending] = useTransition()
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>()
    const [user, setUser] = useState<User>()

    useEffect(()=>{
        const fetchData = async() =>{
            const res = await userApi.findOneUser(id)
            setUser(res)
        }

        fetchData();
    },[])


    const handleChange = async () =>{
        if(password === confirmPassword){
            try { 
                await authApi.changePassword(id, password)
                toast.success('Contraseña cambiada correctamente.')
                router.push('/auth/login')
            } catch {
                toast.error("La contraseña debe tener una mayúscula, al menos 6 caracteres y un número.")
            }
        }else{
            toast.error('Las contraseñas no coinciden.')
        }
    }

    return (

        <>
            <form className="flex gap-3 flex-col w-full">
                <label htmlFor="email">Ingrese la contraseña</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    placeholder="*******"
                    className="w-full p-[10px] bg-primary border border-secondary rounded-lg"
                    disabled={isPending}
                    required
                    onChange={(e)=>setPassword(e.target.value)}
                />

                <label htmlFor="email">Confirmar contraseña</label>
                <input
                    id="confirm_password"
                    name="confirm_password"
                    type="password"
                    value={confirmPassword}
                    placeholder="*******"
                    className="w-full p-[10px] bg-primary border border-secondary rounded-lg"
                    disabled={isPending}
                    required
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                />
                    
                <button
                    type="button"
                    className="mt-2 bg-white/80 hover:bg-white text-[#1c1c3c] transition-all font-bold font-bold transition-all w-full p-[10px] rounded-3xl"
                    disabled={isPending}
                    onClick={handleChange}
                >
                Cambiar contraseña
                </button>

            </form>
        </>

    )
}

export default ForgotForm