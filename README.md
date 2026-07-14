# 🎓 XYZ Idiomas

Sistema Full Stack para gerenciamento de alunos, cursos e matrículas, desenvolvido como teste técnico utilizando **NestJS**, **React**, **PostgreSQL** e **Docker**.

---

# 📖 Sobre o projeto

O sistema permite que administradores realizem o gerenciamento completo da escola fictícia **XYZ Idiomas**, incluindo:

- Login utilizando JWT
- Cadastro de alunos
- Cadastro de cursos
- Cadastro de matrículas
- Dashboard com indicadores
- Relatórios financeiros
- CRUD completo
- API documentada com Swagger

É necessário Node, PostgreSQL e Docker, para testas as funcionalidades esse projeto.

---

# 🚀 Tecnologias utilizadas

## Backend

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT
- Passport
- Swagger
- class-validator
- Prisma Migrations
- Jest
- Pino Logger

## Frontend

- React 19
- Vite
- TypeScript
- React Router
- React Query
- Axios
- React Hook Form
- Zod
- TailwindCSS
- shadcn/ui

## DevOps

- Docker
- Docker Compose

---

# 📂 Estrutura do projeto

```
xyz-idiomas/

├── backend/
├── frontend/
├── docs/
├── README.md
└── .gitattributes
```

---

# Funcionalidades

## 🔐 Autenticação

- Login utilizando JWT
- Rotas protegidas
- Persistência do token
- Logout

---

## 👨‍🎓 Alunos

- Listagem
- Cadastro
- Edição
- Exclusão

---

## 📚 Cursos

- Listagem
- Cadastro
- Edição
- Exclusão

---

## 📝 Matrículas

- Cadastro
- Edição
- Exclusão

Relacionando:

- Aluno
- Curso
- Status
- Data de início
- Valor pago

---

## 📊 Dashboard

Indicadores:

- Total de alunos
- Total de cursos
- Total de matrículas
- Faturamento total

---

## 📈 Relatórios

- Total investido por aluno
- Cursos com mais alunos
- Faturamento por curso

---

# Banco de Dados

Entidades principais:

```
User
Student
Course
Enrollment
```

Relacionamentos:

```
Student
    │
    └──────── Enrollment ───────── Course
```

---

# Backend

## Recursos implementados

- JWT Authentication
- Guards
- DTO Validation
- Exception Filter
- Swagger
- Prisma ORM
- Migrations
- Seed
- Transactions
- Logging estruturado
- Testes automatizados com Jest

---

# Frontend

## Recursos implementados

- React Query
- Axios
- React Hook Form
- Layout Responsivo
- CRUD completo
- Dialogs (shadcn/ui)
- Componentização
- Consumo da API REST

---

# Como executar localmente

## 1. Clone o repositório

```bash
git clone https://github.com/Oblizion/xyz-idiomas.git

cd xyz-idiomas
```

---

# Configuração

Entre na pasta do backend:

```bash
cd backend
```

Copie os arquivos de configuração:

### Linux / macOS

```bash
cp .env.example .env
cp .env.docker.example .env.docker
```

### Windows (PowerShell)

```powershell
Copy-Item .env.example .env
Copy-Item .env.docker.example .env.docker
```
Após copiar os arquivos, é necessário configurar as credenciais do banco de dados.

Abra o arquivo .env e altere os valores de exemplo, principalmente a senha do PostgreSQL:
```bash
DATABASE_URL="postgresql://postgres:sua_senha@localhost:5432/xyz_idiomas"
```

Substitua:

```bash
sua_senha
```
pela senha configurada no seu PostgreSQL local.

Exemplo:

```bash
DATABASE_URL="postgresql://postgres:123456@localhost:5432/xyz_idiomas"
```

Caso utilize Docker, faça a mesma configuração no arquivo .env.docker, garantindo que usuário, senha, porta e nome do banco estejam de acordo com o ambiente configurado.

Após ajustar as variáveis de ambiente, o projeto estará pronto para executar as migrations e iniciar a aplicação.

---

# Executando o Backend

Instale as dependências:

```bash
npm install
```

Execute as migrations:

```bash
npx prisma migrate deploy
```
Gere o Prisma Client:

```bash
npx prisma generate
```

Popule o banco:

```bash
npx prisma db seed
```

Inicie a aplicação:

```bash
npm run start:dev
```

---

# Executando o Frontend

Entre na pasta:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Execute:

```bash
npm run dev
```

Disponível em:

```bash
http://localhost:5174/
```

Não esqueça de permanecer com dois terminais abertos, rodando tanto o Backend, quanto o Frontend, para que a aplicação funcione.

---

# Executando com Docker

Na pasta **backend** execute:

```bash
docker compose up --build
```

O container executa automaticamente:

- Migrations
- Prisma Generate
- Seed
- Inicialização da aplicação

Caso deseje obter uma tabela com dados já inseridos:

```bash
docker exec -it xyz_backend npx prisma db seed
```

---

# Login

Administrador criado automaticamente pela Seed.

Email

```
admin@xyz.com
```

Senha

```
123456
```

---

# Swagger

A documentação da API está disponível em:

```text
http://localhost:3000/api
```

## Como utilizar

A maior parte dos endpoints exige autenticação via JWT.

### 1. Realize o login

Utilize o endpoint:

```
POST /auth/login
```

Credenciais criadas automaticamente pela Seed:

Email

```
admin@xyz.com
```

Senha

```
123456
```

A resposta será semelhante a:

```json
{
  "accessToken": "eyJhbGc..."
}
```
---
### 2. Autorize no Swagger

Clique no botão **Authorize** localizado no canto superior direito da página.

Cole apenas o valor do **accessToken** retornado pelo login.

Não é necessário escrever "Bearer", pois o Swagger adiciona esse prefixo automaticamente.

Após autorizar, todos os endpoints protegidos poderão ser utilizados normalmente.

# Testes

Backend

```bash
npm test
```

Cobertura de testes

```bash
npm run test:cov
```

---

# Linting e Formatação

O projeto utiliza ferramentas para manter a qualidade e padronização do código.

### ESLint

Análise estática do código.

```bash
npm run lint
```

### Prettier

Formatação automática do código.

```bash
npm run format
```

---

# Screenshots

## Login

![Login](docs/login.png)

---

## Dashboard

![Dashboard](docs/dashboard.png)

---

## Alunos

![Students](docs/students.png)

---

## Cursos

![Courses](docs/courses.png)

---

## Matrículas

![Enrollments](docs/enrollments.png)

---

## Relatórios

![Reports](docs/reports.png)

---

## Swagger

![Swagger](docs/swagger.png)

---

# Diferenciais implementados

- JWT Authentication
- Guards
- Prisma ORM
- Docker
- Docker Compose
- Swagger/OpenAPI
- React Query
- TailwindCSS
- shadcn/ui
- DTO Validation
- Global Exception Filter
- Logging estruturado (Pino)
- Migrations
- Seed
- Transações com Prisma
- Testes automatizados com Jest
- Interface responsiva

---

# Autor

**Luan Martins Rodrigues Ananias**

Desenvolvido como teste técnico para a **MM Tecnologia da Informação LTDA**.