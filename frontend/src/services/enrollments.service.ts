import { api } from "./api";

export interface CreateEnrollmentDto {
  studentId: number;
  courseId: number;
  startDate: string;
  pricePaid: number;
  status: "ACTIVE" | "CANCELLED" | "COMPLETED";
}
export interface Enrollment extends CreateEnrollmentDto {
  id: number;

  student: {
    id: number;
    name: string;
  };

  course: {
    id: number;
    name: string;
  };

  createdAt: string;
  updatedAt: string;
}
export async function getEnrollments() {
  const { data } = await api.get("/enrollments");
  return data;
}

export async function createEnrollment(dto: CreateEnrollmentDto) {
  const { data } = await api.post("/enrollments", dto);
  return data;
}

export async function updateEnrollment(id: number, dto: CreateEnrollmentDto) {
  const { data } = await api.patch(`/enrollments/${id}`, dto);

  return data;
}

export async function deleteEnrollment(id: number) {
  const { data } = await api.delete(`/enrollments/${id}`);

  return data;
}
