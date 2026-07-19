import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Camada ambiente global, discreta por design: 2 feixes de luz muito sutis,
// nenhuma partícula. Desativada em mobile e quando o sistema pede menos
// movimento, para não pesar na leitura nem no desempenho.
export default function AmbientMotion() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    try {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      setEnabled(!reducedMotion && !isMobile);
    } catch {
      setEnabled(false);
    }
  }, []);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-60">
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          className="absolute h-px w-[160%] -left-[30%] bg-gradient-to-r from-transparent via-race-red/[0.06] to-transparent"
          style={{ top: `${28 + i * 40}%` }}
          animate={{ x: ["-4%", "4%", "-4%"] }}
          transition={{ duration: 14 + i * 3, repeat: Infinity, ease: "easeInOut", delay: i * 1.5 }}
        />
      ))}
    </div>
  );
}
