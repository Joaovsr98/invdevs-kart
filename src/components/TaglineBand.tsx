import { motion } from "framer-motion";

/**
 * Faixa-manifesto com a assinatura da marca. Primeira batida de identidade
 * depois da dobra — reproduz o tratamento de citação em destaque do manual,
 * com as faixas diagonais vermelho+azul (padrão visual oficial).
 */
export default function TaglineBand() {
  return (
    <section className="relative bg-asphalt border-y border-steel-line overflow-hidden">
      {/* padrão diagonal vermelho + azul */}
      <div className="absolute inset-0 speed-stripes opacity-[0.06]" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 120% at 15% 50%, rgba(225,6,0,0.12), transparent 60%), radial-gradient(ellipse 60% 120% at 85% 50%, rgba(0,87,255,0.12), transparent 60%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center gap-5"
        >
          <span className="flex items-center gap-3 font-mono text-[11px] tracking-[0.35em] text-steel">
            <span className="h-3 w-0.5 bg-race-red" />
            A ASSINATURA DA CASA
            <span className="h-3 w-0.5 bg-electric-blue" />
          </span>

          <h2 className="font-display font-semibold uppercase leading-[0.95] text-ivory text-[8vw] md:text-6xl">
            Todo sonho merece
            <br className="hidden md:block" /> a chance de{" "}
            <span className="text-race-red">acelerar.</span>
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
