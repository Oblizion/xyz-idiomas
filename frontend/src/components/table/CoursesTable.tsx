import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { Course } from "@/types/course";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteCourse } from "@/services/courses.service";

interface Props {
  courses: Course[];
  onEdit(course: Course): void;
}

export default function CoursesTable({ courses, onEdit }: Props) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteCourse,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["courses"],
      });
    },
  });

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-[700px]">
        <TableHeader>
          <TableRow>
            <TableHead className="whitespace-nowrap">ID</TableHead>
            <TableHead className="whitespace-nowrap">Nome</TableHead>
            <TableHead className="whitespace-nowrap">Carga Horária</TableHead>
            <TableHead className="whitespace-nowrap">Descrição</TableHead>
            <TableHead className="whitespace-nowrap">Preço</TableHead>
            <TableHead className="whitespace-nowrap">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id}>
              <TableCell className="whitespace-nowrap">{course.id}</TableCell>

              <TableCell className="whitespace-nowrap">{course.name}</TableCell>
              <TableCell className="whitespace-nowrap">{course.description}</TableCell>
              <TableCell className="whitespace-nowrap">{course.workload}</TableCell>

              <TableCell className="whitespace-nowrap">R$ {course.price.toFixed(2)}</TableCell>

              <TableCell className="space-x-2">
                <Button size="sm" onClick={() => onEdit(course)}>
                  Editar
                </Button>

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    if (confirm("Deseja excluir este curso?")) {
                      mutation.mutate(course.id);
                    }
                  }}
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
