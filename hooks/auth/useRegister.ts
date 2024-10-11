//import { authService } from "../../services";
import { authApi, userApi } from "@/APIS";
import { UserApi } from "@/APIS/user.api";
import { RegisterSchema } from "@/schemas";
import Cookies from "js-cookie";

export const useRegister = () => {
    
  const register = async (name:string, password:string, email:string, photo_url:string, role:string) => {

    const validatedValues = RegisterSchema.safeParse({ email: email, password: password, name: name });

    if (!validatedValues.success) {
      return {  error: validatedValues.error.errors[0].message }
    }

    try {
      const user = await userApi.createUser(name, password, email, photo_url, role);
      if (user) {
        Cookies.remove("currentUser")
        return { success: "Usuario registrado correctamente." };
      }
      return user;
    } catch (error: any) {
      return { error: "La contraseña debe tener una mayúscula, al menos 6 caracteres y un número."};
    }

  };

  return { register };
  
};