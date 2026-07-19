import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function Reveal({
  children,
  delay = 0,
  y = 18,
  x = 0,
  className = "",
  accent = false,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  className?: string;
  accent?: boolean;
}) {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y, x, clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ opacity: 1, y: 0, x: 0, clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {accent && (
        <motion.span
          className="absolute -left-4 top-0 w-0.5 bg-race-red"
          initial={{ height: 0 }}
          whileInView={{ height: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: delay + 0.1 }}
        />
      )}
      {children}
    </motion.div>
  );
}
