import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { Enrollment } from "@/types/enrollment";

import {
  createEnrollment,
  updateEnrollment,
  type CreateEnrollmentDto,
} from "@/services/enrollments.service";

import { getStudents } from "@/services/students.service";
import { getCourses } from "@/services/courses.service";
import type { Student } from "@/types/student";
import type { Course } from "@/types/course";

interface Props {
  enrollment?: Enrollment;
  onSuccess?: () => void;
}

export default function EnrollmentForm({ enrollment, onSuccess }: Props) {
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, setValue } =
    useForm<CreateEnrollmentDto>();

  const { data: students } = useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
  });

  const { data: courses } = useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
  });

  useEffect(() => {
    if (!enrollment) {
      reset();
      return;
    }

    setValue("studentId", enrollment.studentId);
    setValue("courseId", enrollment.courseId);
    setValue("startDate", enrollment.startDate.slice(0, 10));
    setValue("pricePaid", enrollment.pricePaid);
    setValue("status", enrollment.status);
  }, [enrollment, reset, setValue]);

  const mutation = useMutation({
    mutationFn: async (data: CreateEnrollmentDto) => {
      if (enrollment) {
        return updateEnrollment(enrollment.id, data);
      }

      return createEnrollment(data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["enrollments"],
      });

      reset();

      onSuccess?.();
    },
  });

  function onSubmit(data: CreateEnrollmentDto) {
    mutation.mutate({
      ...data,
      studentId: Number(data.studentId),
      courseId: Number(data.courseId),
      pricePaid: Number(data.pricePaid),
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
      <select
        {...register("studentId", {
          valueAsNumber: true,
        })}
      >
        <option value="">Selecione um aluno</option>

        {students?.data.map((student: Student) => (
          <option key={student.id} value={student.id}>
            {student.name}
          </option>
        ))}
      </select>

      <select
        {...register("courseId", {
          valueAsNumber: true,
        })}
      >
        <option value="">Selecione um curso</option>

        {courses?.data.map((course: Course) => (
          <option key={course.id} value={course.id}>
            {course.name}
          </option>
        ))}
      </select>

      <input className="w-full" type="date" {...register("startDate")} />

      <input
        className="w-full"
        type="number"
        step="0.01"
        placeholder="Valor Pago"
        {...register("pricePaid", {
          valueAsNumber: true,
        })}
      />

      <select {...register("status")}>
        <option value="ACTIVE">ACTIVE</option>

        <option value="COMPLETED">COMPLETED</option>

        <option value="CANCELLED">CANCELLED</option>
      </select>

      <button type="submit" disabled={mutation.isPending}>
        Salvar
      </button>
    </form>
  );
}
