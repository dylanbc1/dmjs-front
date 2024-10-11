//import { authService } from "../../services";
import { authApi } from "@/APIS";
import { LoginSchema } from "@/schemas";
import Cookies from "js-cookie";

export const useLogin = () => {
    
  const login = async (username: string, password: string) => {
    
    const validatedValues = LoginSchema.safeParse({ email: username, password: password });

    if (!validatedValues.success) {
      return {  error: validatedValues.error.errors[0].message }
    }
    
    try {
      const res = await authApi.login(username, password);
      Cookies.set("currentUser", JSON.stringify(res));
      return res.data;
    } catch (error: any) {
      if (error.response) {
        return { error: "Usuario no registrado, por favor registrate" };
      }
      return { error: "Ocurrio un error inesperado" };
    }

  };

  return { login };
  
};