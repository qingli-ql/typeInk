
import { motion } from "framer-motion";
import { useTypewriter } from "../context/typewriter";
import { antigravityFadeUp, staggerContainer } from "../utils/animations";
import { IconArrow } from "../components/icons";
import { contactLinks, profile } from "../data/profile";

export const Contact = () => {
  const { triggerTypewriter } = useTypewriter();

  return (
    <section id="now" className="py-32 bg-[#EFECE5] text-[#111]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-2 gap-16">

          <motion.div variants={antigravityFadeUp}>
            <h2 className="font-serif text-3xl mb-8 flex items-center gap-3">
              <span className="w-2 h-2 bg-[#D97757] rounded-full animate-pulse" /> Now
            </h2>
            <div className="space-y-6 text-[#555] leading-relaxed">
              <p>
                <strong>Building: </strong> Interactive stories and useful AI-native tools through TypeInk.
              </p>
              <p>
                <strong>Thinking about: </strong> How motion, narrative, and agentic workflows can make digital experiences feel more direct and human.
              </p>
            </div>
          </motion.div>

          <motion.div variants={antigravityFadeUp}>
            <h2 className="font-serif text-3xl mb-8">Connect</h2>
            <div className="flex flex-col gap-4 font-mono text-sm uppercase tracking-widest">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center justify-between border-b border-[#CCC] pb-4 hover:text-[#D97757] hover:border-[#D97757] transition-all w-full text-left"
                  onClick={link.href.startsWith("http")
                    ? undefined
                    : (event) => triggerTypewriter(
                        event,
                        "external",
                        `Opening mail client...\nWriting to ${profile.email}`,
                        () => window.location.assign(link.href),
                      )}
                >
                  <span>{link.label}<span className="ml-3 normal-case tracking-normal text-[#777]">{link.handle}</span></span>
                  <IconArrow />
                </a>
              ))}
            </div>
            <div className="mt-8 flex items-center gap-5 rounded-lg border border-[#D8D2C7] bg-white/60 p-4">
              <img
                src={profile.wechatQrImage}
                alt={`WeChat QR code for ${profile.wechatName}`}
                className="w-28 shrink-0 rounded-md border border-[#EAE5D9] bg-white"
                loading="lazy"
              />
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-[#D97757]">WeChat</p>
                <p className="mt-2 font-sans font-medium text-[#222]">{profile.wechatName}</p>
                <p className="mt-1 text-sm leading-relaxed text-[#777]">Scan to add me as a friend.</p>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};
