import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { QueryEnrollmentDto } from './dto/query-enrollment.dto';

@Injectable()
export class EnrollmentsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(createEnrollmentDto: CreateEnrollmentDto) {
    const {
      studentId,
      courseId,
      startDate,
      pricePaid,
      status,
    } = createEnrollmentDto;

    return this.prisma.$transaction(async (tx) => {
      const student = await tx.student.findUnique({
        where: { id: studentId },
      });

      if (!student) {
        throw new NotFoundException('Aluno não encontrado.');
      }

      const course = await tx.course.findUnique({
        where: { id: courseId },
      });

      if (!course) {
        throw new NotFoundException('Curso não encontrado.');
      }

      return tx.enrollment.create({
        data: {
          studentId,
          courseId,
          startDate: new Date(startDate),
          pricePaid,
          status,
        },
        include: {
          student: true,
          course: true,
        },
      });
    });
  }

  async findAll(query: QueryEnrollmentDto) {
    const { page, limit, order, status } = query;

    const where = {
      ...(status && { status }),
    };

    const [enrollments, total] = await this.prisma.$transaction([
      this.prisma.enrollment.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          startDate: order,
        },
        include: {
          student: true,
          course: true,
        },
      }),

      this.prisma.enrollment.count({
        where,
      }),
    ]);

    return {
      data: enrollments,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
async findOne(id: number) {
  const enrollment = await this.prisma.enrollment.findUnique({
    where: { id },
  });

  if (!enrollment) {
    throw new NotFoundException('Matrícula não encontrada.');
  }

  return {
    success: true,
    data: enrollment,
  };
}

  async update(id: number, updateEnrollmentDto: UpdateEnrollmentDto) {
    await this.findOne(id);

    return this.prisma.enrollment.update({
      where: { id },
      data: {
        ...updateEnrollmentDto,
        ...(updateEnrollmentDto.startDate && {
          startDate: new Date(updateEnrollmentDto.startDate),
        }),
      },
      include: {
        student: true,
        course: true,
      },
    });
  }

  async remove(id: number) {
  await this.findOne(id);

  await this.prisma.enrollment.delete({
    where: { id },
  });

  return {
    success: true,
    message: 'Matrícula removida com sucesso.',
  };
}
}