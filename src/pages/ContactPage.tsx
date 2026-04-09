import React from "react";
import { Contact } from "../sections/Contact";
import { Footer } from "../sections/Footer";

export const ContactPage = () => {
  return (
    <main className="relative z-10 w-full overflow-x-hidden min-h-screen">
      <Contact />
      <Footer />
    </main>
  );
};
