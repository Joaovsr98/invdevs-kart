import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { demoTelemetry, calendar } from "../data";
import LiveTrackMap from "./LiveTrackMap";
import { CountdownPanel, HudEta } from "./Countdown";

const BOOT_SESSION_KEY = "paddock22_boot_seen";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    try {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReduced(mq.matches);
      const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    } catch {
      setReduced(false);
    }
  }, []);
  return reduced;
}

// Sequência de largada Paddock 22 — não reproduz a sequência oficial de
// nenhuma categoria real; é uma identidade própria da marca, curta (~2.3s)
// e pulável a qualquer momento.
function BootSequence({ onDone }: { onDone: () => void }) {
  const [lit, setLit] = useState(0); // 0..5 luzes acesas, 6 = liberado
  const [label, setLabel] = useState("BOXES · MOTOR DESLIGADO");
  const [fading, setFading] = useState(false);

  // Fade-out feito com CSS puro (não via AnimatePresence do framer-motion, que
  // no StrictMode do React às vezes NÃO dispara a animação de saída e deixa a
  // tela travada). O guard `doneRef` garante que timer e clique não chamem
  // onDone duas vezes. onDone num ref para o efeito rodar uma vez só.
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;
  const doneRef = useRef(false);

  const dismiss = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setFading(true);
    setTimeout(() => onDoneRef.current(), 420);
  };
  const dismissRef = useRef(dismiss);
  dismissRef.current = dismiss;

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    try {
      timers.push(setTimeout(() => setLabel("IGNIÇÃO"), 250));
      for (let i = 1; i <= 5; i++) {
        timers.push(setTimeout(() => setLit(i), 400 + i * 200));
      }
      timers.push(setTimeout(() => setLabel("LARGADA LIBERADA"), 400 + 5 * 200 + 250));
      timers.push(setTimeout(() => setLit(6), 400 + 5 * 200 + 400));
      timers.push(setTimeout(() => dismissRef.current(), 400 + 5 * 200 + 950));
    } catch {
      dismissRef.current();
    }
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-asphalt flex flex-col items-center justify-center transition-opacity duration-[400ms] ease-out ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex gap-4 md:gap-6">
        {[1, 2, 3, 4, 5].map((n) => (
          <div
            key={n}
            className={`w-6 h-6 md:w-9 md:h-9 rounded-full border transition-colors duration-200 ${
              lit === 6
                ? "bg-[#3DDC97] border-[#3DDC97]"
                : lit >= n
                ? "bg-race-red border-race-red"
                : "bg-transparent border-steel-line"
            }`}
          />
        ))}
      </div>
      <p className="font-mono text-xs tracking-[0.3em] text-steel mt-8">{label}</p>
      <button
        onClick={dismiss}
        className="absolute bottom-8 right-8 font-mono text-[11px] tracking-widest text-steel hover:text-ivory transition-colors"
      >
        PULAR →
      </button>
    </div>
  );
}

export default function Hero() {
  const reducedMotion = usePrefersReducedMotion();

  // Fonte única de verdade: showBoot. `booted` é derivado — sem dois estados
  // que possam ficar dessincronizados. Decidido de forma síncrona na
  // inicialização para não haver "flash" nem efeito extra para começar.
  const [showBoot, setShowBoot] = useState(() => {
    try {
      return !sessionStorage.getItem(BOOT_SESSION_KEY);
    } catch {
      return false;
    }
  });
  const booted = !showBoot;

  const finishBoot = () => {
    try {
      sessionStorage.setItem(BOOT_SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
    setShowBoot(false);
  };
  const finishRef = useRef(finishBoot);
  finishRef.current = finishBoot;

  // Se o usuário prefere menos animação, pula a abertura de imediato.
  useEffect(() => {
    if (reducedMotion && showBoot) finishRef.current();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  const target = new Date(demoTelemetry.nextRaceDate);
  const nextRace = calendar[0];

  return (
    <>
      {showBoot && <BootSequence onDone={finishBoot} />}

      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-asphalt">
        {/* atmosphere */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 30% 10%, rgba(225,6,0,0.16), transparent 60%), radial-gradient(ellipse 55% 60% at 82% 55%, rgba(0,87,255,0.16), transparent 62%), radial-gradient(ellipse 60% 50% at 88% 92%, rgba(0,87,255,0.08), transparent 60%)",
            }}
          />
          {!reducedMotion &&
            [...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-px bg-gradient-to-r from-transparent via-ivory/20 to-transparent"
                style={{ top: `${14 + i * 16}%`, width: "140%", left: "-20%" }}
                initial={{ x: "-10%", opacity: 0 }}
                animate={booted ? { x: "10%", opacity: [0, 1, 0] } : {}}
                transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
              />
            ))}
          <div className="checker-bg absolute -bottom-10 -right-10 w-56 h-56 opacity-10 rotate-12" />
        </div>

        {/* ---- LIVE INTERLAGOS MAP on the right ---- */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-[50%] pointer-events-none">
          <div className="absolute inset-0 lg:-right-4 top-20 lg:top-8 flex items-center justify-center">
            <div className="w-[94%] h-[60%] lg:h-[84%]">
              <LiveTrackMap reducedMotion={reducedMotion} booted={booted} />
            </div>
          </div>
          {/* left-edge fade so the map doesn't collide with the type */}
          <div className="absolute inset-0 bg-gradient-to-r from-asphalt via-asphalt/60 lg:via-transparent to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-10 w-full pt-24">
          <div className="lg:max-w-[60%]">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={booted ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="font-mono text-xs md:text-sm tracking-[0.3em] text-electric-blue mb-6 flex items-center gap-3"
            >
              <span aria-hidden>🟢</span>
              TEMPORADA 2026 · GRID ABERTO
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={booted ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-semibold uppercase leading-[0.92] text-[13vw] md:text-[6.2vw] text-ivory"
            >
              Não criamos <span className="text-steel">pilotos.</span>
              <br />
              Criamos <span className="metal-text">vencedores.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={booted ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-6 max-w-xl text-steel text-base md:text-lg"
            >
              Onde performance encontra competição. Onde cada volta aproxima você do pódio.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={booted ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <a
                href="#campeonato"
                className="group relative inline-flex items-center gap-3 bg-race-red text-ivory font-display tracking-wide px-9 md:px-11 py-5 md:py-6 text-base md:text-lg overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 shadow-[0_18px_40px_-14px_rgba(225,6,0,0.7)]"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                <span className="relative">🏁 QUERO COMPETIR</span>
                <span className="relative transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
              <span className="font-mono text-[11px] tracking-widest text-steel">
                {nextRace.country} {nextRace.track.toUpperCase()} · {nextRace.date}
              </span>
            </motion.div>

            {/* ---- COUNTDOWN PANEL (contador isolado — ver Countdown.tsx) ---- */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={booted ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ delay: 0.75, duration: 0.6 }}
              className="mt-12"
            >
              <CountdownPanel target={target} round={nextRace.round} track={nextRace.track} />
            </motion.div>
          </div>
        </div>

        {/* ---- TELEMETRY HUD — dados em src/data.ts (demoTelemetry) ---- */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={booted ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ delay: 0.95, duration: 0.6 }}
          className="hidden lg:block absolute bottom-8 right-8 glass-panel px-5 py-4 font-mono text-[11px] text-steel w-[300px]"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="tracking-[0.2em] text-ivory">TELEMETRIA · CAR&nbsp;22</span>
            <span className="flex items-center gap-1.5 text-[#3DDC97]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3DDC97] led-pulse" />
              LIVE
            </span>
          </div>

          {/* RPM shift-light bar */}
          <div className="mb-1 flex justify-between">
            <span>RPM</span>
            <span className="text-ivory">8&nbsp;240</span>
          </div>
          <div className="h-2 bg-asphalt border border-steel-line mb-3 overflow-hidden">
            <div className="h-full rpm-run bg-gradient-to-r from-[#3DDC97] via-electric-blue to-race-red" />
          </div>

          {/* sector times */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-3">
            <div className="flex justify-between"><span>SETOR 1</span><span className="text-electric-blue">23.114</span></div>
            <div className="flex justify-between"><span>SETOR 2</span><span className="text-[#3DDC97]">31.008</span></div>
            <div className="flex justify-between"><span>GRIP</span><span className="text-ivory">98%</span></div>
            <div className="flex justify-between"><span>TEMP</span><span className="text-ivory">{demoTelemetry.temperature}</span></div>
          </div>

          <div className="h-px bg-steel-line my-2" />
          <div className="flex justify-between">
            <span>PRÓXIMA LARGADA</span>
            <HudEta target={target} />
          </div>
        </motion.div>

        <div className="absolute bottom-6 left-6 md:left-10 text-steel text-xs font-mono tracking-widest flex items-center gap-2">
          <motion.span
            animate={reducedMotion ? {} : { y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
          ROLE PARA BAIXO
        </div>
      </section>
    </>
  );
}
