import { useQuery } from "@tanstack/react-query";

import Layout from "../../components/layout/Layout";
import { getStudents } from "../../services/students.service";
import StudentsTable from "../../components/table/StudentsTable";
import { useState } from "react";
import type { Student } from "@/types/student";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import StudentForm from "@/components/forms/StudentForm";

export default function Students() {
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>();
  const { data, isLoading, error } = useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
  });

  if (isLoading) {
    return (
      <Layout>
        <p>Carregando...</p>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <p>Erro ao carregar alunos.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-4 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold">Alunos</h1>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
              onClick={() => {
                setSelectedStudent(undefined);
              }}
            >
              <Button className="w-full md:w-auto">Novo Aluno</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg w-[95vw]">
              <DialogHeader>
                <DialogTitle>Novo Aluno</DialogTitle>
              </DialogHeader>

              <StudentForm
                student={selectedStudent}
                onSuccess={() => {
                  setOpen(false);
                  setSelectedStudent(undefined);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
        <StudentsTable
          students={data.data}
          onEdit={(student) => {
            setSelectedStudent(student);
            setOpen(true);
          }}
        />
      </div>
    </Layout>
  );
}
