import { api } from "./api";

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export async function login(
  data: LoginDto,
): Promise<LoginResponse> {
  const response = await api.post("/auth/login", data);

  return {
    accessToken: response.data.access_token,
  };
}