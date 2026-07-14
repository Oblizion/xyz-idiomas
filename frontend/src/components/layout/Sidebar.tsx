import { NavLink } from "react-router-dom";

interface Props {
  onNavigate?: () => void;
}

export default function Sidebar({ onNavigate }: Props) {
  const links = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/students", label: "Alunos" },
    { to: "/courses", label: "Cursos" },
    { to: "/enrollments", label: "Matrículas" },
    { to: "/reports", label: "Relatórios" },
  ];

  return (
    <aside className="w-56 bg-slate-800 text-white h-full p-5">
      <h2 className="text-xl font-bold">
        XYZ Idiomas
      </h2>

      <nav className="mt-8 flex flex-col gap-3">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              isActive
                ? "font-bold"
                : ""
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}