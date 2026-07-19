import { motion } from "framer-motion";

/**
 * GT3 cinematográfico — composição vetorial de um carro emergindo da sombra.
 * Não representa nenhum modelo real; é uma silhueta estilizada com faróis,
 * roda dianteira, disco de freio brilhando, fumaça de pneu e reflexos
 * vermelhos. Vetor puro: nítido em qualquer densidade de tela e leve.
 */
export default function HeroCar({ reducedMotion, booted }: { reducedMotion: boolean; booted: boolean }) {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, x: 60, scale: 1.04 }}
      animate={booted ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 60, scale: 1.04 }}
      transition={{ delay: 0.35, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none select-none w-full h-full"
    >
      <svg viewBox="0 0 760 620" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="carBody" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2a2f36" />
            <stop offset="0.45" stopColor="#15181c" />
            <stop offset="1" stopColor="#0b0d10" />
          </linearGradient>
          <linearGradient id="carHood" x1="0" y1="0" x2="0.6" y2="1">
            <stop offset="0" stopColor="#3a4048" />
            <stop offset="0.6" stopColor="#1a1e23" />
            <stop offset="1" stopColor="#0f1215" />
          </linearGradient>
          <linearGradient id="redReflect" x1="0" y1="0" x2="1" y2="0.4">
            <stop offset="0" stopColor="#E10600" stopOpacity="0" />
            <stop offset="0.7" stopColor="#E10600" stopOpacity="0.35" />
            <stop offset="1" stopColor="#ff3b33" stopOpacity="0.7" />
          </linearGradient>
          <radialGradient id="headlight" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.35" stopColor="#eaf2ff" />
            <stop offset="0.75" stopColor="#7aa2ff" stopOpacity="0.5" />
            <stop offset="1" stopColor="#7aa2ff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="brake" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#ffd9a0" />
            <stop offset="0.4" stopColor="#ff6a00" />
            <stop offset="0.8" stopColor="#E10600" stopOpacity="0.5" />
            <stop offset="1" stopColor="#E10600" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="floorShadow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#000000" stopOpacity="0.8" />
            <stop offset="1" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3a4a63" stopOpacity="0.9" />
            <stop offset="1" stopColor="#0d1016" stopOpacity="0.9" />
          </linearGradient>
          {/* carbon weave clip fill */}
          <pattern id="weave" width="6" height="6" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
            <rect width="6" height="6" fill="#12151a" />
            <rect width="3" height="3" fill="#191d23" />
            <rect x="3" y="3" width="3" height="3" fill="#191d23" />
          </pattern>
          <filter id="soft" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="9" />
          </filter>
        </defs>

        {/* ground contact shadow */}
        <ellipse cx="430" cy="520" rx="330" ry="46" fill="url(#floorShadow)" />

        {/* tyre smoke plumes behind the car */}
        {!reducedMotion && (
          <g>
            {[0, 1, 2].map((i) => (
              <circle
                key={i}
                className="smoke-drift"
                cx={250 - i * 40}
                cy={470}
                r={38 + i * 10}
                fill="#c9ccd1"
                opacity="0.12"
                filter="url(#soft)"
                style={{ animationDelay: `${i * 1.6}s` }}
              />
            ))}
          </g>
        )}

        {/* ---- CAR BODY (front three-quarter, emerging from right shadow) ---- */}
        {/* rear haunch / cockpit fading into darkness on the right */}
        <path
          d="M690 430 C700 360 690 300 630 270 L470 250 C430 300 430 380 450 440 Z"
          fill="url(#carBody)"
        />
        {/* main body side */}
        <path
          d="M150 460 C150 400 190 360 260 350 L470 250 C560 250 640 300 660 400 C665 430 660 470 640 500 L200 500 C165 500 150 485 150 460 Z"
          fill="url(#carBody)"
          stroke="#333a42"
          strokeWidth="1.5"
        />
        {/* carbon lower splitter */}
        <path
          d="M150 470 C150 490 170 500 200 500 L640 500 C655 490 660 478 660 466 L150 466 Z"
          fill="url(#weave)"
        />
        {/* hood plane */}
        <path
          d="M150 460 C150 405 190 366 258 356 L360 320 L300 470 Z"
          fill="url(#carHood)"
        />
        {/* red livery reflection sweeping the flank */}
        <path
          d="M300 470 L360 320 L470 258 C540 258 605 300 630 380 L300 470 Z"
          fill="url(#redReflect)"
          opacity="0.9"
        />
        {/* red + blue livery accent stripes (manual de marca) */}
        <path d="M158 452 L300 452 L286 476 L156 476 Z" fill="#E10600" opacity="0.92" />
        <path d="M300 452 L470 452 L470 476 L286 476 Z" fill="#E10600" opacity="0.5" />
        <path d="M158 476 L470 476 L470 486 L157 486 Z" fill="#0057FF" opacity="0.75" />

        {/* windscreen / cockpit glass */}
        <path
          d="M362 322 C410 292 470 286 512 300 C486 316 470 340 466 372 L372 400 Z"
          fill="url(#glass)"
          stroke="#4a5a72"
          strokeWidth="1"
          opacity="0.92"
        />
        {/* A-pillar highlight */}
        <path d="M362 322 L372 400" stroke="#5b6b84" strokeWidth="2.5" opacity="0.6" />
        {/* roof rim light */}
        <path d="M362 322 C410 292 470 286 512 300" stroke="#8a97a8" strokeWidth="2" fill="none" opacity="0.5" />

        {/* side mirror */}
        <path d="M356 356 l-22 -6 l-4 12 l20 6 Z" fill="#1a1e23" stroke="#3a4148" strokeWidth="1" />

        {/* front splitter tip */}
        <path d="M150 466 L120 476 L124 492 L170 492 L150 470 Z" fill="#0d0f12" stroke="#2a2f36" strokeWidth="1" />

        {/* ---- FRONT WHEEL with glowing brake ---- */}
        <g>
          {/* brake disc glow */}
          <circle className={reducedMotion ? "" : "brake-glow"} cx="250" cy="470" r="52" fill="url(#brake)" />
          {/* tyre */}
          <circle cx="250" cy="470" r="60" fill="#0a0c0f" stroke="#20242a" strokeWidth="2" />
          <circle cx="250" cy="470" r="60" fill="none" stroke="#000" strokeWidth="10" opacity="0.5" />
          {/* rim */}
          <circle cx="250" cy="470" r="34" fill="#14171b" stroke="#3a4148" strokeWidth="2" />
          <circle cx="250" cy="470" r="15" fill="#0d0f12" stroke="#4a525c" strokeWidth="1.5" />
          {/* spokes */}
          {[0, 72, 144, 216, 288].map((a) => (
            <line
              key={a}
              x1="250"
              y1="470"
              x2={250 + 30 * Math.cos((a * Math.PI) / 180)}
              y2={470 + 30 * Math.sin((a * Math.PI) / 180)}
              stroke="#464e58"
              strokeWidth="3"
            />
          ))}
          {/* brake caliper */}
          <rect x="268" y="452" width="12" height="26" rx="3" fill="#E10600" />
        </g>

        {/* ---- HEADLIGHTS ---- */}
        <g className={reducedMotion ? "" : "head-breathe"}>
          <ellipse cx="176" cy="430" rx="30" ry="16" fill="url(#headlight)" />
          <ellipse cx="176" cy="430" rx="12" ry="7" fill="#ffffff" />
          {/* light beam cast forward-left */}
          <path d="M150 424 L40 396 L44 470 L150 440 Z" fill="url(#headlight)" opacity="0.18" />
        </g>
        {/* daytime running light strip (signal yellow) */}
        <path d="M156 452 C168 448 182 448 196 452" stroke="#F5C400" strokeWidth="3" fill="none" strokeLinecap="round" />

        {/* rear wing hint in the shadow */}
        <path d="M636 300 L706 292 L706 302 L640 312 Z" fill="#1a1e23" stroke="#2f353c" strokeWidth="1" />
        <line x1="648" y1="304" x2="648" y2="360" stroke="#20242a" strokeWidth="4" />

        {/* subtle top rim light along the bodywork */}
        <path
          d="M258 356 C190 366 150 405 150 460"
          stroke="#6a7688"
          strokeWidth="2"
          fill="none"
          opacity="0.4"
        />

        {/* speed lines streaking off the front */}
        {!reducedMotion &&
          [0, 1, 2, 3].map((i) => (
            <motion.rect
              key={i}
              x={-120}
              y={360 + i * 26}
              width={90}
              height={2}
              rx={1}
              fill="#F2F0E9"
              opacity={0.14}
              animate={{ x: [-120, 220], opacity: [0, 0.22, 0] }}
              transition={{ duration: 1.1 + i * 0.15, repeat: Infinity, delay: i * 0.35, ease: "easeIn" }}
            />
          ))}
      </svg>
    </motion.div>
  );
}
