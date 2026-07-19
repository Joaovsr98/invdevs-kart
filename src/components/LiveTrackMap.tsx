import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

/**
 * Mapa vivo de Interlagos — traçado estilizado do Autódromo José Carlos Pace
 * com 10 carros estilo F1 correndo em tempo real (5 equipes, 2 carros cada).
 * O líder P22 (vermelho) anda mais rápido e vai ultrapassando os demais.
 *
 * A animação é feita em JS via requestAnimationFrame + getPointAtLength — o
 * SMIL/offset-path não é confiável neste ambiente, então movemos cada carro
 * ao longo do path a cada frame (respeitando prefers-reduced-motion).
 */

const CIRCUIT =
  "M 273 48 C 240 44 205 50 185 64 C 168 76 172 88 176 96 C 158 108 146 110 132 120 " +
  "C 100 150 70 240 44 288 C 34 306 44 330 62 328 C 92 326 116 348 132 344 " +
  "C 158 340 180 324 176 312 C 172 300 156 288 150 280 C 168 284 186 290 194 296 " +
  "C 214 306 244 300 242 320 C 240 300 232 288 229 280 C 244 272 258 258 264 264 " +
  "C 272 278 268 300 255 312 C 280 300 300 270 308 240 C 318 200 320 150 317 120 " +
  "C 314 92 300 60 273 48 Z";

const TEAMS = ["#E10600", "#0057FF", "#14D19A", "#FF8A00", "#D7DBE0"];
// 10 carros: 2 por equipe. id 0 = líder (ultrapassador).
const CARS = TEAMS.flatMap((color, t) => [0, 1].map((k) => ({ color, id: t * 2 + k })));

function Car({ color, glow }: { color: string; glow?: boolean }) {
  return (
    <g filter={glow ? "url(#carGlow)" : undefined}>
      <rect x="-7" y="-3" width="14" height="6" rx="2" fill={color} />
      <rect x="-7" y="-3" width="3.5" height="6" rx="1" fill="rgba(0,0,0,0.35)" />
      <rect x="3.5" y="-1.6" width="4" height="3.2" rx="1" fill="rgba(255,255,255,0.6)" />
    </g>
  );
}

export default function LiveTrackMap({
  reducedMotion,
  booted,
}: {
  reducedMotion: boolean;
  booted: boolean;
}) {
  const carRefs = useRef<(SVGGElement | null)[]>([]);

  useEffect(() => {
    // path de medição fora do DOM — getPointAtLength funciona mesmo sem render
    const measure = document.createElementNS("http://www.w3.org/2000/svg", "path");
    measure.setAttribute("d", CIRCUIT);
    const len = measure.getTotalLength();

    // progresso inicial espalhado pela pista + velocidade por carro
    const prog = CARS.map((c) => c.id / CARS.length);
    const speed = CARS.map((c) =>
      c.id === 0 ? 1 / 6 : (1 / 8.5) * (1 + ((c.id % 3) - 1) * 0.04)
    ); // voltas por segundo (líder mais rápido)

    const place = (i: number) => {
      const l = prog[i] * len;
      const p = measure.getPointAtLength(l);
      const p2 = measure.getPointAtLength((l + 2) % len);
      const ang = (Math.atan2(p2.y - p.y, p2.x - p.x) * 180) / Math.PI;
      const g = carRefs.current[i];
      if (g) g.setAttribute("transform", `translate(${p.x} ${p.y}) rotate(${ang})`);
    };

    // posição inicial de todos
    CARS.forEach((_, i) => place(i));

    if (reducedMotion) return; // estático

    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      for (let i = 0; i < CARS.length; i++) {
        prog[i] = (prog[i] + speed[i] * dt) % 1;
        place(i);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion]);

  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, scale: 0.96, y: 10 }}
      animate={booted ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.96, y: 10 }}
      transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full h-full"
    >
      {/* chips de transmissão ao vivo */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2 font-mono">
        <span className="flex items-center gap-1.5 bg-race-red/90 text-ivory text-[10px] tracking-widest px-2 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-ivory led-pulse" />
          AO VIVO
        </span>
        <span className="text-[10px] tracking-widest text-steel">INTERLAGOS · SP</span>
      </div>
      <div className="absolute top-3 right-3 z-10 font-mono text-[10px] tracking-widest text-steel text-right leading-relaxed">
        VOLTA 12 / 24
        <br />
        <span className="text-race-red">LÍDER · P22</span>
      </div>

      <svg viewBox="0 0 360 380" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="carGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#E10600" floodOpacity="0.9" />
          </filter>
          <linearGradient id="asphaltStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3a4048" />
            <stop offset="1" stopColor="#22262c" />
          </linearGradient>
        </defs>

        <ellipse cx="185" cy="210" rx="170" ry="180" fill="rgba(0,87,255,0.05)" />

        {/* leito da pista */}
        <path d={CIRCUIT} fill="none" stroke="#0e1116" strokeWidth="16" strokeLinejoin="round" />
        <path d={CIRCUIT} fill="none" stroke="url(#asphaltStroke)" strokeWidth="12" strokeLinejoin="round" />
        <path d={CIRCUIT} fill="none" stroke="rgba(242,240,233,0.25)" strokeWidth="1.2" strokeDasharray="3 7" />

        {/* largada/chegada */}
        <g transform="translate(273 48)">
          <rect x="-2" y="-9" width="4" height="18" fill="#F2F0E9" />
          <rect x="-2" y="-9" width="2" height="3" fill="#0e1116" />
          <rect x="0" y="-6" width="2" height="3" fill="#0e1116" />
          <rect x="-2" y="-3" width="2" height="3" fill="#0e1116" />
          <rect x="0" y="0" width="2" height="3" fill="#0e1116" />
          <rect x="-2" y="3" width="2" height="3" fill="#0e1116" />
          <rect x="0" y="6" width="2" height="3" fill="#0e1116" />
        </g>

        {/* setores vermelho/azul */}
        <circle cx="44" cy="288" r="3" fill="#E10600" />
        <circle cx="308" cy="240" r="3" fill="#0057FF" />

        {/* rótulo do circuito */}
        <text
          x="185"
          y="205"
          textAnchor="middle"
          className="font-display"
          fontSize="15"
          letterSpacing="4"
          fill="rgba(242,240,233,0.20)"
        >
          INTERLAGOS
        </text>

        {/* carros (posicionados por JS) */}
        {CARS.map(({ color, id }) => (
          <g key={id} ref={(el) => { carRefs.current[id] = el; }}>
            <Car color={color} glow={id === 0} />
          </g>
        ))}
      </svg>
    </motion.div>
  );
}
