import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteEnrollment } from "@/services/enrollments.service";

import type { Enrollment } from "@/types/enrollment";

interface Props {
  enrollments: Enrollment[];
  onEdit(enrollment: Enrollment): void;
}

export default function EnrollmentsTable({ enrollments, onEdit }: Props) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteEnrollment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["enrollments"],
      });
    },
  });

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Aluno</TableHead>
            <TableHead>Curso</TableHead>
            <TableHead>Início</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {enrollments.map((enrollment) => (
            <TableRow key={enrollment.id}>
              <TableCell>{enrollment.student.name}</TableCell>

              <TableCell>{enrollment.course.name}</TableCell>

              <TableCell>
                {new Date(enrollment.startDate).toLocaleDateString("pt-BR")}
              </TableCell>

              <TableCell>R$ {enrollment.pricePaid.toFixed(2)}</TableCell>

              <TableCell>{enrollment.status}</TableCell>

              <TableCell className="space-x-2">
                <Button size="sm" onClick={() => onEdit(enrollment)}>
                  Editar
                </Button>

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    if (confirm("Deseja excluir esta matrícula?")) {
                      mutation.mutate(enrollment.id);
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
