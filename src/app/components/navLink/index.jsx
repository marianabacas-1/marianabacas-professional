"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

function NavLinkContent({ text, to }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.toString();
  const toPath = to.split('?')[0];
  const toQuery = to.includes('?') ? to.split('?')[1] : '';
  
  // Verificar si la ruta coincide y los parámetros de consulta coinciden
  const isActive = pathname === toPath && 
    (toQuery ? searchParams.toString() === toQuery : !currentQuery);

  return (
    <Link
      href={to}
      className={`hidden md:inline-flex items-center justify-center tracking-wide mx-0.5
        px-5 py-2 rounded-lg transition-all duration-200
        ${isActive 
          ? "bg-gradient-to-r from-primary to-primaryWithOp text-gray-700 shadow-lg"
          : "bg-transparent text-gray-900 hover:bg-gradient-to-r hover:from-primaryWithOp hover:to-primaryWithOp2 hover:text-white hover:shadow-lg"
        }`}
    >
      {text}
    </Link>
  );
}

export default function NavLink({ text, to }) {
  return (
    <Suspense fallback={
      <div className="hidden md:inline-flex items-center justify-center tracking-wide mx-0.5 px-5 py-2 rounded-lg bg-gray-200 animate-pulse">
        {text}
      </div>
    }>
      <NavLinkContent text={text} to={to} />
    </Suspense>
  );
}