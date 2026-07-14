import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({
    example: 'Inglês Básico',
    description: 'Nome do curso',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;

  @ApiProperty({
    example: 'Curso para iniciantes.',
    description: 'Descrição do curso',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  description!: string;

  @ApiProperty({
    example: 1200,
    description: 'Preço do curso',
  })
  @IsNumber()
  @Min(0)
  price!: number;

  @ApiProperty({
    example: 60,
    description: 'Carga horária em horas',
  })
  @IsNumber()
  @Min(1)
  workload!: number;
}