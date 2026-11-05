import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import Reveal from "./Reveal";
import { stats } from "../data";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.floor(v).toLocaleString("pt-BR"));

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, { duration: 1.6, ease: [0.22, 1, 0.36, 1] });
      return controls.stop;
    }
  }, [inView, value, count]);

  return (
    <span ref={ref} className="font-mono">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export default function AboutStats() {
  return (
    <section id="sobre" className="relative bg-carbon py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.3em] text-race-red mb-4">O QUE É A INV RACING</p>
            <h2 className="font-display font-semibold uppercase text-3xl md:text-5xl leading-tight text-ivory">
              Não somos uma comunidade.
              <br />
              Somos um lugar onde pilotos evoluem.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-5 text-steel text-base md:text-lg pt-2">
              <p>
                Aqui, amizade se constrói em briga de roda e treino de sexta-feira. A competição é levada a
                sério — regulamento aplicado, replay revisado, sem "foi sem querer" quando o replay mostra o
                contrário.
              </p>
              <p>
                Todo campeão da casa começou como rookie perdido no primeiro treino. A diferença entre os dois
                é temporada, disciplina e vontade de aparecer toda semana.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-20 md:mt-28 grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-6">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="text-3xl md:text-4xl text-ivory font-semibold">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="text-steel text-xs md:text-sm mt-2 leading-snug">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
