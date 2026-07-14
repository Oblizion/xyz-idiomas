#!/bin/sh

echo "Aguardando o PostgreSQL..."
sleep 5

echo "Executando migrations..."
npx prisma migrate deploy

echo "Gerando Prisma Client..."
npx prisma generate

echo "Iniciando aplicação..."
npm run start:prod