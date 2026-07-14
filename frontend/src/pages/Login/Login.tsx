import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import { login } from "../../services/auth.service";
import { loginSchema, type LoginSchema } from "./login.schema";

export default function Login() {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginSchema) {
    try {
      const response = await login(data);

      authLogin(response.accessToken);

      navigate("/dashboard");
    } catch {
      alert("E-mail ou senha inválidos");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg border p-6 shadow">
        <h1 className="mb-6 text-center text-2xl font-bold">
          Login
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div>
            <input
              className="w-full rounded border p-2"
              placeholder="Email"
              {...register("email")}
            />

            <p className="text-sm text-red-500">
              {errors.email?.message}
            </p>
          </div>

          <div>
            <input
              className="w-full rounded border p-2"
              type="password"
              placeholder="Senha"
              {...register("password")}
            />

            <p className="text-sm text-red-500">
              {errors.password?.message}
            </p>
          </div>

          <button
            type="submit"
            className="w-full rounded bg-black py-2 text-white"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}