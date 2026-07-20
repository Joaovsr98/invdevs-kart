import Reveal from "./Reveal";
import { steps, calendar } from "../data";

export default function HowItWorksCalendar() {
  return (
    <>
      <section className="relative bg-carbon py-24 md:py-32 cut-panel-t cut-panel-b -mt-1">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.3em] text-electric-blue mb-4">COMO FUNCIONA</p>
            <h2 className="font-display font-semibold uppercase text-2xl md:text-4xl text-ivory mb-16 max-w-xl">
              Da inscrição ao pódio, em seis passos.
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-px bg-steel-line">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.06} className="bg-carbon p-6">
                <div className="font-mono text-race-red text-sm mb-4">{s.n}</div>
                <h4 className="font-display uppercase text-ivory text-base mb-2">{s.title}</h4>
                <p className="text-steel text-xs leading-relaxed">{s.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="calendario" className="relative bg-asphalt py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.3em] text-race-red mb-4">CALENDÁRIO 2026</p>
            <h2 className="font-display font-semibold uppercase text-2xl md:text-4xl text-ivory mb-14 max-w-xl">
              Sete circuitos. Um caminho até o título.
            </h2>
          </Reveal>

          <div className="border-t border-steel-line">
            {calendar.map((c, i) => (
              <Reveal key={c.round} delay={i * 0.04}>
                {/* Mobile: duas linhas (nome inteiro + data/série). A partir de
                    sm, `contents` dissolve os wrappers e a grade de 4 colunas
                    volta a valer. */}
                <div className="flex flex-col gap-1.5 sm:grid sm:grid-cols-[80px_1fr_auto_180px] sm:items-center sm:gap-6 border-b border-steel-line py-4 sm:py-5 px-2 group hover:bg-carbon/50 transition-colors">
                  <div className="flex items-baseline gap-3 min-w-0 sm:contents">
                    <span className="font-mono text-steel text-sm shrink-0">R{c.round}</span>
                    <span className="font-display uppercase text-ivory text-base md:text-xl flex items-baseline gap-2 min-w-0">
                      <span className="font-mono text-[10px] tracking-widest text-electric-blue border border-electric-blue/40 px-1.5 py-0.5 rounded-sm shrink-0">
                        {c.country}
                      </span>
                      <span className="truncate">{c.track}</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3 pl-9 sm:pl-0 sm:contents">
                    <span className="font-mono text-steel text-xs sm:text-sm">{c.date}</span>
                    <span className="font-mono text-[10px] md:text-xs tracking-widest text-race-red sm:text-right">
                      {c.series.toUpperCase()}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
