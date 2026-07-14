import { api } from "./api";

export async function getDashboard() {
  const { data } = await api.get("/reports/dashboard");
  return data;
}