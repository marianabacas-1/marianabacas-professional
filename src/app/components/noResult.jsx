import React from "react";
import PrimaryButton from "./primaryButton";
import Image from "next/image";

export default function NoResults({
  results = [],
  searchTerm = "",
  onRetry = null,
  children = null,
}) {
  if (results.length > 0) {
    return <>{children}</>; // muestra lo que venga si hay resultados
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center text-primary">
        <Image src="/sad_face.png" alt="No results" className="mb-6" width={150} height={150} />
      <h2 className="text-2xl font-semibold mb-2">
        No se encontraron resultados
      </h2>
      {searchTerm && (
        <p className="mb-6 text-primary">
          para <span className="font-semibold">&quot;{searchTerm}&quot;</span>
        </p>
      )}

      {onRetry ? (<div className="text-white">
        <PrimaryButton onClick={onRetry} actionText="Intentar de nuevo" />
      </div>) : (
        <p className="text-gray-400 italic">Intenta con otro término o modifica los filtros.</p>
      )}
    </div>
  );
}
