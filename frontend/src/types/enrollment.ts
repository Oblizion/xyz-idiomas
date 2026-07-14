export interface Enrollment {
  id: number;

  studentId: number;
  courseId: number;

  startDate: string;
  pricePaid: number;

  status:
    | "ACTIVE"
    | "CANCELLED"
    | "COMPLETED";

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