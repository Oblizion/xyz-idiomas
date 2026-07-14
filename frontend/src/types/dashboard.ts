export interface Dashboard {
  students: number;
  courses: number;
  enrollments: number;
  totalRevenue: number;

  enrollmentsByStatus: {
    status: string;
    _count: number;
  }[];

  investmentByStudent: {
    id: number;
    name: string;
    totalInvested: number;
  }[];

  studentsByCourse: {
    id: number;
    name: string;
    totalStudents: number;
  }[];

  revenueByCourse: {
    id: number;
    name: string;
    totalRevenue: number;
  }[];
}