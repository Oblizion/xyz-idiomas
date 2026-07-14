import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { QueryStudentDto } from './dto/query-student.dto';
import { NotFoundException } from '@nestjs/common';
import { ConflictException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createStudentDto: CreateStudentDto) {
    try {
      const student = await this.prisma.student.create({
        data: createStudentDto,
      });

      return {
        success: true,
        message: 'Aluno criado com sucesso.',
        data: student,
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Já existe um aluno com este e-mail.');
      }

      throw error;
    }
  }

  async findAll(query: QueryStudentDto) {
    const { page, limit, order, orderBy, name } = query;

    const where = {
      ...(name && {
        name: {
          contains: name,
        },
      }),
    };

    const [students, total] = await this.prisma.$transaction([
      this.prisma.student.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          [orderBy]: order,
        },
      }),

      this.prisma.student.count({
        where,
      }),
    ]);

    return {
      data: students,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const student = await this.prisma.student.findUnique({
      where: { id },
    });

    if (!student) {
      throw new NotFoundException('Aluno não encontrado.');
    }

    return {
      success: true,
      data: student,
    };
  }
  async update(id: number, dto: UpdateStudentDto) {
    await this.findOne(id);

    try {
      const student = await this.prisma.student.update({
        where: { id },
        data: dto,
      });

      return {
        success: true,
        message: 'Aluno atualizado com sucesso.',
        data: student,
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Já existe um aluno com este e-mail.');
      }

      throw error;
    }
  }
  async remove(id: number) {
    await this.findOne(id);

    await this.prisma.student.delete({
      where: { id },
    });

    return {
      success: true,
      message: 'Aluno removido com sucesso.',
    };
  }
}
