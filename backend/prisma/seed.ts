import { PrismaClient, EnrollmentStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Limpando banco...');

  await prisma.enrollment.deleteMany();
  await prisma.student.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  console.log('Criando administrador...');

  const password = await bcrypt.hash('123456', 10);

  const admin = await prisma.user.create({
    data: {
      name: 'Administrador',
      email: 'admin@xyz.com',
      password,
      role: 'ADMIN',
    },
  });

  console.log('Criando alunos...');

  const student1 = await prisma.student.create({
    data: {
      name: 'João Silva',
      email: 'joao@email.com',
      phone: '(41) 99999-9999',
    },
  });

  const student2 = await prisma.student.create({
    data: {
      name: 'Maria Oliveira',
      email: 'maria@email.com',
      phone: '(41) 98888-8888',
    },
  });

  console.log('Criando cursos...');

  const course1 = await prisma.course.create({
    data: {
      name: 'Inglês Básico',
      description: 'Curso de inglês para iniciantes.',
      price: 1200,
      workload: 60,
    },
  });

  const course2 = await prisma.course.create({
    data: {
      name: 'Espanhol Intermediário',
      description: 'Curso intermediário de espanhol.',
      price: 1500,
      workload: 80,
    },
  });

  console.log('Criando matrículas...');

  await prisma.enrollment.create({
    data: {
      studentId: student1.id,
      courseId: course1.id,
      startDate: new Date(),
      pricePaid: 1200,
      status: EnrollmentStatus.ACTIVE,
    },
  });

  await prisma.enrollment.create({
    data: {
      studentId: student2.id,
      courseId: course2.id,
      startDate: new Date(),
      pricePaid: 1500,
      status: EnrollmentStatus.ACTIVE,
    },
  });

  console.log('Seed concluído com sucesso!');
  console.log(`Administrador: ${admin.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
