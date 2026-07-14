import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

async dashboard() {
  const [
    students,
    courses,
    enrollments,
    revenue,
    status,
    investmentByStudent,
    studentsByCourse,
    revenueByCourse,
  ] = await Promise.all([
    this.prisma.student.count(),

    this.prisma.course.count(),

    this.prisma.enrollment.count(),

    this.prisma.enrollment.aggregate({
      _sum: {
        pricePaid: true,
      },
    }),

    this.prisma.enrollment.groupBy({
      by: ["status"],
      _count: true,
    }),

    this.prisma.student.findMany({
      include: {
        enrollments: true,
      },
    }),

    this.prisma.course.findMany({
      include: {
        enrollments: true,
      },
    }),

    this.prisma.course.findMany({
      include: {
        enrollments: true,
      },
    }),
  ]);

  return {
    students,
    courses,
    enrollments,

    totalRevenue: revenue._sum.pricePaid ?? 0,

    enrollmentsByStatus: status,

    investmentByStudent: investmentByStudent.map(
      (student) => ({
        id: student.id,
        name: student.name,
        totalInvested: student.enrollments.reduce(
          (sum, enrollment) => sum + enrollment.pricePaid,
          0,
        ),
      }),
    ),

    studentsByCourse: studentsByCourse.map(
      (course) => ({
        id: course.id,
        name: course.name,
        totalStudents: course.enrollments.length,
      }),
    ),

    revenueByCourse: revenueByCourse.map(
      (course) => ({
        id: course.id,
        name: course.name,
        totalRevenue: course.enrollments.reduce(
          (sum, enrollment) => sum + enrollment.pricePaid,
          0,
        ),
      }),
    ),
  };
}
}