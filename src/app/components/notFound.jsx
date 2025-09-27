import React from "react";
import PrimaryButton from "./primaryButton";
import Image from "next/image";

export default function NotFoundComponent() {

  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center text-primary">
        <Image src="/sad_face.png" alt="No results" className="mb-6" width={150} height={150} />
      <h2 className="text-2xl font-semibold mb-2">
        404 - Página no encontrada
      </h2>
    </div>
  );
}
