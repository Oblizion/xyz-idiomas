import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({
    example: 'João Silva',
    description: 'Nome completo do aluno',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;

  @ApiProperty({
    example: 'joao@email.com',
    description: 'E-mail do aluno',
  })
  @IsEmail()
  @MaxLength(100)
  email!: string;

  @ApiProperty({
    example: '(41) 99999-9999',
    description: 'Telefone do aluno',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  phone!: string;
}