import { api } from "./api";
import type { Student } from "@/types/student";

export interface CreateStudentDto {
  name: string;
  email: string;
  phone?: string;
}

export async function getStudents() {
  const response = await api.get("/students");

  return response.data;
}

export async function createStudent(
  data: CreateStudentDto,
) {
  const response = await api.post("/students", data);

  return response.data;
}

export async function deleteStudent(id: number) {
  await api.delete(`/students/${id}`);
}

export async function updateStudent(
  id: number,
  data: CreateStudentDto,
) {
  const response = await api.patch(
    `/students/${id}`,
    data,
  );

  return response.data;
}