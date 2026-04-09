import React from "react";
import { Builds } from "../sections/Builds";
import { Footer } from "../sections/Footer";

export const BuildsPage = () => {
  return (
    <main className="relative z-10 w-full overflow-x-hidden min-h-screen pt-12">
      <Builds />
      <Footer />
    </main>
  );
};
