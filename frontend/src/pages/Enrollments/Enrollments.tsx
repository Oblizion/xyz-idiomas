import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Layout from "@/components/layout/Layout";
import EnrollmentsTable from "@/components/table/EnrollmentsTable";
import EnrollmentForm from "@/components/forms/EnrollmentForm";

import type { Enrollment } from "@/types/enrollment";

import { getEnrollments } from "@/services/enrollments.service";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

export default function Enrollments() {
  const [open, setOpen] = useState(false);
  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["enrollments"],
    queryFn: getEnrollments,
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
        <p>Erro ao carregar matrículas.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-4 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold">Matrículas</h1>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger onClick={() => setSelectedEnrollment(undefined)}>
              <Button className="w-full md:w-auto">Nova Matrícula</Button>
            </DialogTrigger>

            <DialogContent className="max-w-lg w-[95vw]">
              <DialogHeader>
                <DialogTitle>Nova Matrícula</DialogTitle>
              </DialogHeader>

              <EnrollmentForm
                enrollment={selectedEnrollment}
                onSuccess={() => {
                  setOpen(false);
                  setSelectedEnrollment(undefined);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

        <EnrollmentsTable
          enrollments={data.data}
          onEdit={(enrollment) => {
            setSelectedEnrollment(enrollment);
            setOpen(true);
          }}
        />
      </div>
    </Layout>
  );
}
