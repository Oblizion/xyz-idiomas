import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Student } from "@/types/student";
import { updateStudent } from "@/services/students.service";
import { useEffect } from "react";

import {
  createStudent,
  type CreateStudentDto,
} from "@/services/students.service";

interface Props {
  student?: Student;
  onSuccess?: () => void;
}

export default function StudentForm({ student, onSuccess }: Props) {
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, setValue } =
    useForm<CreateStudentDto>();
  useEffect(() => {
    if (!student) {
      reset();
      return;
    }

    setValue("name", student.name);
    setValue("email", student.email);
    setValue("phone", student.phone ?? "");
  }, [student, reset, setValue]);
  const mutation = useMutation({
    mutationFn: async (data: CreateStudentDto) => {
      if (student) {
        return updateStudent(student.id, data);
      }

      return createStudent(data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["students"],
      });

      reset();

      onSuccess?.();
    },
  });

  function onSubmit(data: CreateStudentDto) {
    mutation.mutate(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
      <input className="w-full" placeholder="Nome" {...register("name")} />

      <input className="w-full" placeholder="Email" {...register("email")} />

      <input className="w-full" placeholder="Telefone" {...register("phone")} />

      <button type="submit" disabled={mutation.isPending}>
        Salvar
      </button>
    </form>
  );
}
