import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { QueryCourseDto } from './dto/query-course.dto';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCourseDto: CreateCourseDto) {
    try {
      const course = await this.prisma.course.create({
        data: createCourseDto,
      });

      return {
        success: true,
        message: 'Curso criado com sucesso.',
        data: course,
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Já existe um curso com este nome.');
      }

      throw error;
    }
  }

  async findAll(query: QueryCourseDto) {
    const { page, limit, order, orderBy, name } = query;

    const where = {
      ...(name && {
        name: {
          contains: name,
        },
      }),
    };

    const [courses, total] = await this.prisma.$transaction([
      this.prisma.course.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          [orderBy]: order,
        },
      }),

      this.prisma.course.count({
        where,
      }),
    ]);

    return {
      data: courses,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const course = await this.prisma.course.findUnique({
      where: { id },
    });

    if (!course) {
      throw new NotFoundException('Curso não encontrado.');
    }

    return {
      success: true,
      data: course,
    };
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    await this.findOne(id);

    try {
      const course = await this.prisma.course.update({
        where: { id },
        data: updateCourseDto,
      });

      return {
        success: true,
        message: 'Curso atualizado com sucesso.',
        data: course,
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Já existe um curso com este nome.');
      }

      throw error;
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.prisma.course.delete({
      where: { id },
    });

    return {
      success: true,
      message: 'Curso removido com sucesso.',
    };
  }
}