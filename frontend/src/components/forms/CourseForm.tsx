import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { Course } from "@/types/course";

import {
  createCourse,
  updateCourse,
  type CreateCourseDto,
} from "@/services/courses.service";

interface Props {
  course?: Course;
  onSuccess?: () => void;
}

export default function CourseForm({ course, onSuccess }: Props) {
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, setValue } =
    useForm<CreateCourseDto>();

  useEffect(() => {
    if (!course) {
      reset();
      return;
    }

    setValue("name", course.name);
    setValue("description", course.description);
    setValue("workload", course.workload);
    setValue("price", course.price);
  }, [course, reset, setValue]);

  const mutation = useMutation({
    mutationFn: async (data: CreateCourseDto) => {
      if (course) {
        return updateCourse(course.id, data);
      }

      return createCourse(data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["courses"],
      });

      reset();

      onSuccess?.();
    },
  });

  function onSubmit(data: CreateCourseDto) {
    mutation.mutate({
      ...data,
      workload: Number(data.workload),
      price: Number(data.price),
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
      <input className="w-full" placeholder="Nome" {...register("name")} />
      <input
        className="w-full"
        type="number"
        placeholder="Carga Horária"
        {...register("workload", {
          valueAsNumber: true,
        })}
      />
      <input
        className="w-full"
        placeholder="Descrição"
        {...register("description")}
      />

      <input
        className="w-full"
        type="number"
        step="0.01"
        placeholder="Preço"
        {...register("price", {
          valueAsNumber: true,
        })}
      />

      <button type="submit" disabled={mutation.isPending}>
        Salvar
      </button>
    </form>
  );
}
