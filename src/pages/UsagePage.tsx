import React from "react";
import { Usage } from "../sections/Usage";
import { Footer } from "../sections/Footer";

export const UsagePage = () => {
  return (
    <main className="relative z-10 w-full overflow-x-hidden min-h-screen">
      <Usage />
      <div className="bg-[#1C1A18] text-[#999] opacity-80">
        <Footer />
      </div>
    </main>
  );
};
