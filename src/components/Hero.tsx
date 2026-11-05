import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { demoTelemetry, calendar } from "../data";
import InterlagosMap from "./InterlagosMap";
import RaceHud from "./RaceHud";
import { CountdownPanel } from "./Countdown";
import { wa } from "../wa";

const BOOT_SESSION_KEY = "invracing_boot_seen";

// CTA principal → WhatsApp com mensagem pronta.
const WHATSAPP_CTA = wa(
  "Olá! Vi o site demonstrativo INV Racing e quero saber mais sobre a INV Devs."
);

// Mapa + HUD só existem a partir de lg (1024px). Escondidos por CSS no celular,
// eles continuavam montados e animando (rAF + tickers), pesando ~6s de JS no
// Lighthouse mobile. Mesmo breakpoint do `hidden lg:block` abaixo.
function useIsDesktop() {
  const [desktop, setDesktop] = useState(() => {
    try {
      return window.matchMedia("(min-width: 1024px)").matches;
    } catch {
      return true;
    }
  });
  useEffect(() => {
    try {
      const mq = window.matchMedia("(min-width: 1024px)");
      const handler = (e: MediaQueryListEvent) => setDesktop(e.matches);
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    } catch {
      /* sem matchMedia: mantém o mapa */
    }
  }, []);
  return desktop;
}

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

// Sequência de largada INV Racing — não reproduz a sequência oficial de
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
  const isDesktop = useIsDesktop();

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

        {/* ---- INTERLAGOS MAP (traçado real — ver src/track/interlagos.ts) ---- */}
        {isDesktop && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={booted ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ delay: 0.45, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-0 right-0 h-screen lg:w-[52%] pointer-events-none hidden lg:block"
        >
          {/* Camada de transmissão (AO VIVO, volta/líder, telemetria, setor).
              A margem vai no próprio inset: padding do pai não afeta filho
              absoluto, pois o bloco de contenção é o padding box. */}
          <RaceHud className="absolute left-[clamp(20px,2.6vw,40px)] right-[clamp(20px,2.6vw,40px)] bottom-[clamp(20px,2.6vw,40px)] top-[96px]" />

          {/* Traçado retrato (192×289). Altura presa à viewport (não à altura da
              seção, que é maior) para o circuito caber inteiro na primeira dobra.
              O SVG usa preserveAspectRatio padrão = contain, sem deformar. */}
          <div className="absolute inset-0 flex items-center justify-center p-[clamp(24px,4vw,64px)]">
            <div className="h-[68vh] max-h-full max-w-full aspect-[192/289] pointer-events-auto">
              <InterlagosMap animate={!reducedMotion} lapSeconds={30} />
            </div>
          </div>
        </motion.div>
        )}

        {/* pointer-events-none no contêiner: a metade direita dele fica sobre o
            mapa e bloqueava o hover das curvas. O conteúdo reativa os eventos. */}
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 w-full pt-24 pointer-events-none">
          <div className="lg:max-w-[56%] pointer-events-auto">
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
              className="font-display font-semibold uppercase leading-[0.88] tracking-[-0.015em] text-ivory text-[13vw] md:text-[8vw] lg:text-[clamp(52px,7.2vw,112px)]"
            >
              {/* Linhas explícitas: garantem as 4 linhas em qualquer largura,
                  sem depender de quebra natural (que forçava reduzir o corpo). */}
              <span className="block">Não criamos</span>
              <span className="block text-steel">pilotos.</span>
              <span className="block">Criamos</span>
              <span className="block metal-text">vencedores.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={booted ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-5 max-w-lg text-steel text-base md:text-lg"
            >
              Onde performance encontra competição. Onde cada volta aproxima você do pódio.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={booted ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="mt-7 flex flex-wrap items-center gap-4"
            >
              <a
                href={WHATSAPP_CTA}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2.5 bg-race-red text-ivory font-display tracking-wide px-7 md:px-8 py-3.5 md:py-4 text-sm md:text-base overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 shadow-[0_14px_32px_-14px_rgba(225,6,0,0.65)]"
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
