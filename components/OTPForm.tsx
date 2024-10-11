"use client"
import { useTransition } from "react";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "./ui/input-otp"

const OTPFormPage = () =>{
    const [isPending, setIsPending] = useTransition();
    return(
        <div className="flex gap-3 flex-col justify-center items-center w-full">
            <InputOTP maxLength={6}>
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                    <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                </InputOTPGroup>
            </InputOTP>
            <button
                type="submit"
                className="mt-2 bg-[#0FF] hover:bg-[#0FF]/60 text-black font-bold transition-all w-full p-[10px] rounded-3xl"
                disabled={isPending}
                >
                Ingresar
                </button>
      </div>
    )
}

export default OTPFormPage