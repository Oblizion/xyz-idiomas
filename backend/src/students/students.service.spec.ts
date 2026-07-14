import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service';
import { PrismaService } from '../prisma/prisma.service';
import { ConflictException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

describe('StudentsService', () => {
  let service: StudentsService;

  const prismaMock = {
    student: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
    },
    $transaction: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<StudentsService>(StudentsService);

    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  it('deve criar um aluno', async () => {
    const dto = {
      name: 'João',
      email: 'joao@email.com',
      phone: '41999999999',
    };

    const student = {
      id: 1,
      ...dto,
    };

    prismaMock.student.create.mockResolvedValue(student);

    const result = await service.create(dto);

    expect(prismaMock.student.create).toHaveBeenCalledWith({
      data: dto,
    });

    expect(result).toEqual({
      success: true,
      message: 'Aluno criado com sucesso.',
      data: student,
    });
  });

  it('deve retornar um aluno pelo id', async () => {
    const student = {
      id: 1,
      name: 'João',
      email: 'joao@email.com',
      phone: '41999999999',
    };

    prismaMock.student.findUnique.mockResolvedValue(student);

    const result = await service.findOne(1);

    expect(prismaMock.student.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });

    expect(result).toEqual({
      success: true,
      data: student,
    });
  });

  it('deve remover um aluno', async () => {
    const student = {
      id: 1,
      name: 'João',
      email: 'joao@email.com',
      phone: '41999999999',
    };

    prismaMock.student.findUnique.mockResolvedValue(student);
    prismaMock.student.delete.mockResolvedValue(student);

    const result = await service.remove(1);

    expect(prismaMock.student.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });

    expect(result).toEqual({
      success: true,
      message: 'Aluno removido com sucesso.',
    });
  });

  it('deve lançar NotFoundException quando o aluno não existir', async () => {
    prismaMock.student.findUnique.mockResolvedValue(null);

    await expect(service.findOne(999)).rejects.toThrow('Aluno não encontrado.');

    expect(prismaMock.student.findUnique).toHaveBeenCalledWith({
      where: { id: 999 },
    });
  });

  it('deve atualizar um aluno', async () => {
    const dto = {
      name: 'João Atualizado',
    };

    const student = {
      id: 1,
      name: 'João',
      email: 'joao@email.com',
      phone: '41999999999',
    };

    const updated = {
      ...student,
      ...dto,
    };

    prismaMock.student.findUnique.mockResolvedValue(student);
    prismaMock.student.update.mockResolvedValue(updated);

    const result = await service.update(1, dto);

    expect(prismaMock.student.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: dto,
    });

    expect(result).toEqual({
      success: true,
      message: 'Aluno atualizado com sucesso.',
      data: updated,
    });
  });

  it('deve lançar NotFoundException ao remover aluno inexistente', async () => {
    prismaMock.student.findUnique.mockResolvedValue(null);

    await expect(service.remove(999)).rejects.toThrow('Aluno não encontrado.');
  });

  it('deve lançar ConflictException quando o e-mail já existir', async () => {
  const dto = {
    name: 'João',
    email: 'joao@email.com',
    phone: '41999999999',
  };

  const prismaError = new Prisma.PrismaClientKnownRequestError(
    'Unique constraint failed',
    {
      code: 'P2002',
      clientVersion: '6.19.3',
    },
  );

  prismaMock.student.create.mockRejectedValue(prismaError);

  await expect(service.create(dto)).rejects.toThrow(
    ConflictException,
  );

  await expect(service.create(dto)).rejects.toThrow(
    'Já existe um aluno com este e-mail.',
  );
});
});
