"use client";

import { usePathname } from "next/navigation";
import { NavButton } from "@/components/nav-button";

const routes = [
  { href: "/", label: "Visão Geral" },
  { href: "/transactions", label: "Transações" },
  { href: "/accounts", label: "Contas" },
  { href: "/categories", label: "Categorias" },
  { href: "/settings", label: "Configurações" },
];

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
      {routes.map((route) => (
        <NavButton
          key={route.href}
          href={route.href}
          label={route.label}
          isActive={pathname === route.href}
        />
      ))}
    </nav>
  );
};
