import { api } from "./api";

export interface CreateCourseDto {
  name: string;
  workload: number;
  description: string;
  price: number;
}

export async function getCourses() {
  const { data } = await api.get("/courses");
  return data;
}

export async function createCourse(
  dto: CreateCourseDto,
) {
  const { data } = await api.post("/courses", dto);
  return data;
}

export async function updateCourse(
  id: number,
  dto: CreateCourseDto,
) {
  const { data } = await api.patch(`/courses/${id}`, dto);
  return data;
}

export async function deleteCourse(id: number) {
  const { data } = await api.delete(`/courses/${id}`);
  return data;
}