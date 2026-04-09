import React from "react";
import { motion } from "framer-motion";
import { antigravityFadeUp, staggerContainer } from "../utils/animations";
import { Footer } from "../sections/Footer";

export const Manifesto = () => {
  return (
    <>
      {/* Background Effect for Manifesto */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] rounded-full bg-gradient-to-tr from-[#D97757]/5 to-transparent blur-[140px] mix-blend-multiply" />
      </div>

      <main className="relative z-10 pt-32 pb-24 max-w-4xl mx-auto px-6 md:px-12 w-full overflow-x-hidden min-h-screen">
        <motion.article 
          initial="hidden" animate="visible" variants={staggerContainer}
          className="space-y-12"
        >
          <motion.div variants={antigravityFadeUp} className="mb-20">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#D97757] mb-6">The Manifesto</p>
            <h1 className="font-serif text-5xl md:text-7xl leading-[1.1] tracking-tight text-[#111]">
              Zero-UI and the <br />Invisible Agent.
            </h1>
          </motion.div>

          <motion.div variants={antigravityFadeUp} className="max-w-none text-[#4A4A4A] text-lg font-medium">
            <p className="text-2xl md:text-3xl font-serif text-[#222] leading-relaxed mb-12">
              <span className="float-left text-6xl md:text-[84px] leading-[0.8] pr-4 pt-2 font-bold text-[#D97757]">W</span>e are entering an era where the interface is no longer a destination, but a conversational ether. For decades, we built software by forcing humans to learn the language of machines. Now, we are teaching machines the language of human intent.
            </p>

            <h2 className="font-sans text-2xl mt-16 mb-8 text-[#111]">The Death of the Dashboard</h2>
            <p className="text-[#4A4A4A] leading-[2.2]">
              When every application is a dashboard, nothing is truly intelligent. We have commoditized cognitive overload. A true ambient system evaluates context and surfaces only the necessary primitives. If a user has to click through three nested menus to execute a recurring workflow, the software has failed.
            </p>
            
            <div className="my-12 p-8 bg-[#F4F1EA] border-l-4 border-[#D97757] rounded-r-lg shadow-sm">
              <p className="font-mono text-sm tracking-wide text-[#2C2925] uppercase m-0 leading-relaxed">
                {">"} System Log: "The best UI is the one that dissolves upon task completion."
              </p>
            </div>

            <h2 className="font-sans text-2xl mt-16 mb-8 text-[#111]">Agentic Autonomy</h2>
            <p className="text-[#4A4A4A] leading-[2.2]">
              An agent is not a chatbot. An agent is a localized reasoning engine that traverses APIs, reads memory structures, and writes outputs without intermediate micro-management. By embedding Small Language Models (SLMs) directly into the environment, we bring intelligence closer to the iron—reducing latency and increasing context fidelity.
            </p>

            <h2 className="font-sans text-2xl mt-16 mb-8 text-[#111]">Aesthetic Durability</h2>
            <p className="text-[#4A4A4A] leading-[2.2]">
              Software should feel like an heirloom instrument. While backends evolve with the speed of Moore's Law, the frontal cortex of an application must remain grounded in typographical discipline and haptic physical truth. We do not design for the moment; we design systems that gracefully age.
            </p>
          </motion.div>

        </motion.article>
      </main>
      <Footer />
    </>
  );
};
