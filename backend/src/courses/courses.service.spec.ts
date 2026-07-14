import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service';
import { PrismaService } from '../prisma/prisma.service';

describe('CoursesService', () => {
  let service: CoursesService;

  const prismaMock = {
    course: {
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
        CoursesService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<CoursesService>(CoursesService);

    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  it('deve criar um curso', async () => {
    const dto = {
      name: 'Inglês Básico',
      description: 'Curso de inglês',
      workload: 60,
      price: 1200,
    };

    const course = {
      id: 1,
      ...dto,
    };

    prismaMock.course.create.mockResolvedValue(course);

    const result = await service.create(dto);

    expect(prismaMock.course.create).toHaveBeenCalledWith({
      data: dto,
    });

    expect(result).toEqual({
      success: true,
      message: 'Curso criado com sucesso.',
      data: course,
    });
  });

  it('deve lançar NotFoundException quando o curso não existir', async () => {
    prismaMock.course.findUnique.mockResolvedValue(null);

    await expect(service.findOne(999)).rejects.toThrow(
      'Curso não encontrado.',
    );
  });

  it('deve remover um curso', async () => {
    const course = {
      id: 1,
      name: 'Inglês Básico',
      description: 'Curso',
      workload: 60,
      price: 1200,
    };

    prismaMock.course.findUnique.mockResolvedValue(course);
    prismaMock.course.delete.mockResolvedValue(course);

    const result = await service.remove(1);

    expect(prismaMock.course.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });

    expect(result).toEqual({
      success: true,
      message: 'Curso removido com sucesso.',
    });
  });
});