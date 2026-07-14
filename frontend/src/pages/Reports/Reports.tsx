import { useQuery } from "@tanstack/react-query";

import Layout from "@/components/layout/Layout";
import { getDashboard } from "@/services/reports.service";
import type { Dashboard } from "@/types/dashboard";

export default function Reports() {
  const { data, isLoading } = useQuery<Dashboard>({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
  });

  if (isLoading) {
    return (
      <Layout>
        <p>Carregando...</p>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout>
        <p>Nenhum dado encontrado.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-8">Relatórios</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
          <div className="border rounded-lg p-4">
            <h2>Alunos</h2>
            <p className="text-3xl">{data.students}</p>
          </div>

          <div className="border rounded-lg p-4">
            <h2>Cursos</h2>
            <p className="text-3xl">{data.courses}</p>
          </div>

          <div className="border rounded-lg p-4">
            <h2>Matrículas</h2>
            <p className="text-3xl">{data.enrollments}</p>
          </div>

          <div className="border rounded-lg p-4">
            <h2>Faturamento</h2>
            <p className="text-3xl">R$ {data.totalRevenue.toFixed(2)}</p>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-4">Total investido por aluno</h2>

        <table className="w-full mb-10">
          <tbody>
            {data.investmentByStudent.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>R$ {student.totalInvested.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className="text-xl font-bold mb-4">Cursos com mais alunos</h2>

        <table className="w-full mb-10">
          <tbody>
            {data.studentsByCourse.map((course) => (
              <tr key={course.id}>
                <td>{course.name}</td>
                <td>{course.totalStudents}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className="text-xl font-bold mb-4">Faturamento por curso</h2>

        <table className="w-full">
          <tbody>
            {data.revenueByCourse.map((course) => (
              <tr key={course.id}>
                <td>{course.name}</td>
                <td>R$ {course.totalRevenue.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
