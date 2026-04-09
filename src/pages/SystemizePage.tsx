import React from "react";
import { Systemize } from "../sections/Systemize";
import { Footer } from "../sections/Footer";

export const SystemizePage = () => {
  return (
    <main className="relative z-10 w-full overflow-x-hidden min-h-screen pt-12">
      <Systemize />
      <Footer />
    </main>
  );
};
