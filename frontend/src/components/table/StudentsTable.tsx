import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { Student } from "@/types/student";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStudent } from "@/services/students.service";

interface Props {
  students: Student[];
  onEdit(student: Student): void;
}

export default function StudentsTable({ students, onEdit }: Props) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteStudent,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["students"],
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
            <TableHead className="whitespace-nowrap">Email</TableHead>
            <TableHead className="whitespace-nowrap">Telefone</TableHead>
            <TableHead className="whitespace-nowrap">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="whitespace-nowrap">{student.id}</TableCell>

              <TableCell className="whitespace-nowrap">{student.name}</TableCell>

              <TableCell className="whitespace-nowrap">{student.email}</TableCell>

              <TableCell className="whitespace-nowrap">{student.phone ?? "-"}</TableCell>

              <TableCell className="space-x-2">
                <Button size="sm" onClick={() => onEdit(student)}>
                  Editar
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    if (confirm("Deseja excluir este aluno?")) {
                      mutation.mutate(student.id);
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
