import { Test, TestingModule } from '@nestjs/testing';
import { EnrollmentsService } from './enrollments.service';
import { PrismaService } from '../prisma/prisma.service';
import { EnrollmentStatus } from '@prisma/client';

describe('EnrollmentsService', () => {
  let service: EnrollmentsService;

  const prismaMock = {
    student: {
      findUnique: jest.fn(),
    },
    course: {
      findUnique: jest.fn(),
    },
    enrollment: {
      create: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
    },
    $transaction: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnrollmentsService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<EnrollmentsService>(EnrollmentsService);

    jest.clearAllMocks();
  });
  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });
  it('criar uma matrícula', async () => {
    prismaMock.student.findUnique.mockResolvedValue({
      id: 1,
    });

    prismaMock.course.findUnique.mockResolvedValue({
      id: 2,
    });

    prismaMock.enrollment.create.mockResolvedValue({
      id: 10,
    });

    prismaMock.$transaction.mockImplementation(async (callback) =>
      callback(prismaMock),
    );

    const dto = {
      studentId: 1,
      courseId: 2,
      startDate: '2026-07-12',
      pricePaid: 1200,
      status: EnrollmentStatus.ACTIVE,
    };

    const result = await service.create(dto);

    expect(result.id).toBe(10);
  });
  it('erro quando aluno não existir', async () => {
    prismaMock.student.findUnique.mockResolvedValue(null);

    prismaMock.$transaction.mockImplementation(async (callback) =>
      callback(prismaMock),
    );

    await expect(
      service.create({
        studentId: 99,
        courseId: 1,
        startDate: '2026-07-12',
        pricePaid: 100,
        status: EnrollmentStatus.ACTIVE,
      }),
    ).rejects.toThrow('Aluno não encontrado.');
  });
  it('erro quando curso não existir', async () => {
    prismaMock.student.findUnique.mockResolvedValue({
      id: 1,
    });

    prismaMock.course.findUnique.mockResolvedValue(null);

    prismaMock.$transaction.mockImplementation(async (callback) =>
      callback(prismaMock),
    );

    await expect(
      service.create({
        studentId: 1,
        courseId: 99,
        startDate: '2026-07-12',
        pricePaid: 100,
        status: EnrollmentStatus.ACTIVE,
      }),
    ).rejects.toThrow('Curso não encontrado.');
  });
  it('erro ao buscar matrícula inexistente', async () => {
    prismaMock.enrollment.findUnique.mockResolvedValue(null);

    await expect(service.findOne(999)).rejects.toThrow(
      'Matrícula não encontrada.',
    );
  });
  it('remover uma matrícula', async () => {
    prismaMock.enrollment.findUnique.mockResolvedValue({
      id: 1,
    });

    prismaMock.enrollment.delete.mockResolvedValue({});

    const result = await service.remove(1);

    expect(result.message).toBe('Matrícula removida com sucesso.');
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
