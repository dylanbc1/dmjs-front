import FormRegister from "@/components/form-register";

const Register = () => {
  return (
    <>
      <h1 className="text-4xl font-bold text-center w-full">Registrarse</h1>
      <FormRegister />
      <a href="/auth/login" className="mx-auto">
        ¿Ya tienes una cuenta?{" "}
        <span className="text-success underline">Ingresa</span>
      </a>
    </>
  );
};

export default Register;