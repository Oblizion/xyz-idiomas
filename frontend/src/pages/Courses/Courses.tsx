import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Layout from "../../components/layout/Layout";
import { getCourses } from "../../services/courses.service";

import CoursesTable from "../../components/table/CoursesTable";
import CourseForm from "../../components/forms/CourseForm";

import type { Course } from "@/types/course";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

export default function Courses() {
  const [open, setOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
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
        <p>Erro ao carregar cursos.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-4 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold">Cursos</h1>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger onClick={() => setSelectedCourse(undefined)}>
              <Button className="w-full md:w-auto">Novo Curso</Button>
            </DialogTrigger>

            <DialogContent className="max-w-lg w-[95vw]">
              <DialogHeader>
                <DialogTitle>Novo Curso</DialogTitle>
              </DialogHeader>

              <CourseForm
                course={selectedCourse}
                onSuccess={() => {
                  setOpen(false);
                  setSelectedCourse(undefined);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

        <CoursesTable
          courses={data.data}
          onEdit={(course) => {
            setSelectedCourse(course);
            setOpen(true);
          }}
        />
      </div>
    </Layout>
  );
}
