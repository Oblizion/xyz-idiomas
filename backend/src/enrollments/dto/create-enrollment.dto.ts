import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  Min,
} from 'class-validator';
import { EnrollmentStatus } from '@prisma/client';

export class CreateEnrollmentDto {
  @ApiProperty({
    example: 1,
    description: 'ID do aluno',
  })
  @Type(() => Number)
  @IsNumber()
  studentId!: number;

  @ApiProperty({
    example: 1,
    description: 'ID do curso',
  })
  @Type(() => Number)
  @IsNumber()
  courseId!: number;

  @ApiProperty({
    example: '2026-07-11',
  })
  @IsDateString()
  startDate!: string;

  @ApiProperty({
    example: 1200,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  pricePaid!: number;

  @ApiProperty({
    enum: EnrollmentStatus,
  })
  @IsEnum(EnrollmentStatus)
  status!: EnrollmentStatus;
}