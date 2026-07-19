import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

/**
 * Mapa vivo de Interlagos — traçado do Autódromo José Carlos Pace (Senna S,
 * Curva do Sol, Reta Oposta, Ferradura, Pinheirinho, Bico de Pato, Mergulho,
 * Junção e Subida dos Boxes) com 10 carros estilo F1 correndo em tempo real
 * (5 equipes, 2 carros cada). O líder P22 (vermelho) anda mais rápido e vai
 * ultrapassando os demais.
 *
 * A animação é feita em JS via requestAnimationFrame + getPointAtLength — o
 * SMIL/offset-path não é confiável, então movemos cada carro ao longo do path
 * a cada frame (rAF pausa sozinho fora da tela e sob prefers-reduced-motion).
 */

// Traçado (centerline) — silhueta aproximada de Interlagos, laço único.
const CIRCUIT =
  "M 150 60 C 132 60 122 64 118 72 C 112 82 106 88 108 96 C 110 108 118 114 120 120 " +
  "C 116 132 108 138 100 150 C 84 176 66 190 62 210 C 58 230 60 244 70 250 " +
  "C 84 262 96 268 110 268 C 130 268 150 264 165 262 C 185 259 200 262 215 268 " +
  "C 236 276 252 266 255 250 C 257 236 250 230 240 225 C 250 216 260 210 270 210 " +
  "C 288 210 300 214 305 220 C 314 225 318 208 315 198 C 312 190 300 186 290 188 " +
  "C 296 178 300 172 300 165 C 300 156 286 160 272 168 C 288 158 296 144 300 130 " +
  "C 308 112 320 102 330 95 C 342 86 340 70 300 62 C 270 56 250 52 230 52 " +
  "C 200 50 170 54 150 60 Z";

const TEAMS = ["#E10600", "#0057FF", "#FF8A00"];
// 6 carros: 2 por equipe. id 0 = líder (ultrapassador).
const CARS = TEAMS.flatMap((color, t) => [0, 1].map((k) => ({ color, id: t * 2 + k })));

function Car({ color, glow }: { color: string; glow?: boolean }) {
  return (
    <g filter={glow ? "url(#carGlow)" : undefined}>
      <rect x="-6" y="-2.6" width="12" height="5.2" rx="2" fill={color} />
      <rect x="-6" y="-2.6" width="3" height="5.2" rx="1" fill="rgba(0,0,0,0.35)" />
      <rect x="3" y="-1.4" width="3.4" height="2.8" rx="1" fill="rgba(255,255,255,0.6)" />
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
    const measure = document.createElementNS("http://www.w3.org/2000/svg", "path");
    measure.setAttribute("d", CIRCUIT);
    const len = measure.getTotalLength();

    const prog = CARS.map((c) => c.id / CARS.length);
    // voltas por segundo — ritmo calmo. Líder mais rápido (ultrapassa).
    const speed = CARS.map((c) =>
      c.id === 0 ? 1 / 19 : (1 / 26) * (1 + ((c.id % 3) - 1) * 0.03)
    );

    const place = (i: number) => {
      const l = prog[i] * len;
      const p = measure.getPointAtLength(l);
      const p2 = measure.getPointAtLength((l + 2) % len);
      const ang = (Math.atan2(p2.y - p.y, p2.x - p.x) * 180) / Math.PI;
      const g = carRefs.current[i];
      if (g) g.setAttribute("transform", `translate(${p.x} ${p.y}) rotate(${ang})`);
    };

    CARS.forEach((_, i) => place(i));

    if (reducedMotion) return;

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

      <svg viewBox="0 0 390 320" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="carGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#E10600" floodOpacity="0.9" />
          </filter>
          <linearGradient id="asphaltStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3a4048" />
            <stop offset="1" stopColor="#22262c" />
          </linearGradient>
        </defs>

        <ellipse cx="195" cy="165" rx="180" ry="150" fill="rgba(0,87,255,0.05)" />

        {/* leito da pista */}
        <path d={CIRCUIT} fill="none" stroke="#0e1116" strokeWidth="14" strokeLinejoin="round" strokeLinecap="round" />
        <path d={CIRCUIT} fill="none" stroke="url(#asphaltStroke)" strokeWidth="10.5" strokeLinejoin="round" strokeLinecap="round" />
        <path d={CIRCUIT} fill="none" stroke="rgba(242,240,233,0.25)" strokeWidth="1.1" strokeDasharray="3 7" />

        {/* largada/chegada */}
        <g transform="translate(150 60) rotate(-8)">
          <rect x="-2" y="-8" width="4" height="16" fill="#F2F0E9" />
          <rect x="-2" y="-8" width="2" height="2.7" fill="#0e1116" />
          <rect x="0" y="-5.3" width="2" height="2.7" fill="#0e1116" />
          <rect x="-2" y="-2.6" width="2" height="2.7" fill="#0e1116" />
          <rect x="0" y="0.1" width="2" height="2.7" fill="#0e1116" />
          <rect x="-2" y="2.8" width="2" height="2.7" fill="#0e1116" />
          <rect x="0" y="5.5" width="2" height="2.7" fill="#0e1116" />
        </g>

        {/* setores vermelho/azul */}
        <circle cx="62" cy="210" r="2.8" fill="#E10600" />
        <circle cx="305" cy="220" r="2.8" fill="#0057FF" />

        {/* rótulo do circuito */}
        <text
          x="195"
          y="175"
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
          <g
            key={id}
            ref={(el) => {
              carRefs.current[id] = el;
            }}
          >
            <Car color={color} glow={id === 0} />
          </g>
        ))}
      </svg>
    </motion.div>
  );
}
