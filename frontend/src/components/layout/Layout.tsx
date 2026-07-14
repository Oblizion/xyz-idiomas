import type { ReactNode } from "react";

import Sidebar from "./Sidebar";
import Header from "./Header";

import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="flex min-h-screen">

      {/* Sidebar Desktop */}

      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="flex-1">

        {/* Topo Mobile */}

        <div className="flex items-center border-b p-4 md:hidden">

          <Sheet>

            <SheetTrigger>

              <Menu className="h-6 w-6" />

            </SheetTrigger>

            <SheetContent side="left" className="p-0 w-56">

              <Sidebar />

            </SheetContent>

          </Sheet>

          <h1 className="ml-4 font-bold">
            XYZ Idiomas
          </h1>

        </div>

        {/* Header Desktop */}

        <div className="hidden md:block">
          <Header />
        </div>

        <main className="p-4 md:p-6">
          {children}
        </main>

      </div>

    </div>
  );
}