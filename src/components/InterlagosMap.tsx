import { useCallback, useEffect, useRef, useState } from "react";
import { POIS, SECTORS, TRACK_D, TRACK_VIEWBOX, type Poi } from "../track/interlagos";
import "./interlagos-map.css";

/**
 * Painel interativo do circuito de Interlagos.
 *
 * - Geometria vem de `src/track/interlagos.ts` (fonte única).
 * - Setores destacáveis por hover/clique, com legenda.
 * - Pontos de interesse posicionados por `getPointAtLength` (coordenadas
 *   derivadas do traçado, não digitadas à mão).
 * - Tooltip em HTML, fora do SVG.
 * - Marcador animado opcional (rAF), desligado sob prefers-reduced-motion.
 * - Navegação por teclado: Tab entra nos pontos, ←/→ percorre, Esc limpa.
 *
 * Não depende do Hero nem o altera.
 */

type Props = {
  /** Anima os carros percorrendo a volta. */
  animate?: boolean;
  /** Duração de uma volta do líder, em segundos. */
  lapSeconds?: number;
  className?: string;
};

/** Grid: 3 equipes × 2 carros. O índice 0 é o líder (CAR 22). */
const GRID = [
  { n: 22, color: "#E10600" },
  { n: 7, color: "#0057FF" },
  { n: 13, color: "#FF8A00" },
  { n: 9, color: "#E10600" },
  { n: 11, color: "#0057FF" },
  { n: 4, color: "#FF8A00" },
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    try {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReduced(mq.matches);
      const on = (e: MediaQueryListEvent) => setReduced(e.matches);
      mq.addEventListener("change", on);
      return () => mq.removeEventListener("change", on);
    } catch {
      setReduced(false);
    }
  }, []);
  return reduced;
}

export default function InterlagosMap({ animate = true, lapSeconds = 26, className = "" }: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const carRefs = useRef<(SVGGElement | null)[]>([]);
  const sectorRefs = useRef<(SVGPathElement | null)[]>([]);
  const hitRefs = useRef<(SVGPathElement | null)[]>([]);

  const reduced = usePrefersReducedMotion();
  const [poiPts, setPoiPts] = useState<{ id: string; x: number; y: number }[]>([]);
  const [activePoi, setActivePoi] = useState<Poi | null>(null);
  const [activeSector, setActiveSector] = useState<string | null>(null);
  const [tip, setTip] = useState<{ left: number; top: number } | null>(null);

  /* --- posiciona POIs e setores a partir do comprimento real do path ----- */
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();

    setPoiPts(
      POIS.map((p) => {
        const pt = path.getPointAtLength(p.t * len);
        return { id: p.id, x: pt.x, y: pt.y };
      })
    );

    SECTORS.forEach((s, i) => {
      const seg = (s.to - s.from) * len;
      [sectorRefs.current[i], hitRefs.current[i]].forEach((el) => {
        if (!el) return;
        el.setAttribute("stroke-dasharray", `${seg} ${len}`);
        el.setAttribute("stroke-dashoffset", `${-s.from * len}`);
      });
    });
  }, []);

  /* --- carros animados ---------------------------------------------------- */
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();

    // grid espalhado pela volta; líder mais rápido → ultrapassa os demais
    const t = GRID.map((_, i) => 0.0769 - i * 0.055);
    const speed = GRID.map((_, i) => (i === 0 ? 1 / lapSeconds : 1 / (lapSeconds * (1.14 + (i % 3) * 0.05))));

    const put = (i: number) => {
      const g = carRefs.current[i];
      if (!g) return;
      const pt = path.getPointAtLength(((((t[i] % 1) + 1) % 1)) * len);
      g.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
    };

    GRID.forEach((_, i) => put(i));
    if (!animate || reduced) return; // grid parado na largada

    let raf = 0;
    let last = performance.now();
    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      for (let i = 0; i < GRID.length; i++) {
        t[i] += speed[i] * dt;
        put(i);
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [animate, reduced, lapSeconds]);

  /* --- tooltip: posiciona em px relativos ao contêiner -------------------- */
  const showTip = useCallback((poi: Poi, el: SVGGElement | null) => {
    const root = rootRef.current;
    if (!root || !el) return;
    const r = el.getBoundingClientRect();
    const b = root.getBoundingClientRect();
    setActivePoi(poi);
    setTip({ left: r.left - b.left + r.width / 2, top: r.top - b.top });
  }, []);

  const clear = useCallback(() => {
    setActivePoi(null);
    setTip(null);
  }, []);

  /* --- teclado ----------------------------------------------------------- */
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") return clear();
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const i = activePoi ? POIS.findIndex((p) => p.id === activePoi.id) : -1;
    const next = e.key === "ArrowRight" ? (i + 1) % POIS.length : (i - 1 + POIS.length) % POIS.length;
    const node = rootRef.current?.querySelector<SVGGElement>(`[data-poi="${POIS[next].id}"]`);
    node?.focus();
    showTip(POIS[next], node ?? null);
  };

  return (
    <div
      ref={rootRef}
      className={`imap ${activeSector ? "is-focusing" : ""} ${className}`}
      onKeyDown={onKeyDown}
    >
      <svg
        className="imap__svg"
        viewBox={TRACK_VIEWBOX}
        fill="none"
        role="img"
        aria-label="Mapa do circuito de Interlagos com curvas interativas"
      >
        <defs>
          <path id="imap-track" ref={pathRef} d={TRACK_D} />
          <filter id="imap-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#0057FF" floodOpacity="0.28" />
          </filter>
        </defs>

        {/* camadas do traçado */}
        <use href="#imap-track" className="imap__shadow" />
        <use href="#imap-track" className="imap__edge" />
        <use href="#imap-track" className="imap__asphalt" />
        <use href="#imap-track" className="imap__center" />

        {/* setores */}
        <g filter="url(#imap-glow)">
          {SECTORS.map((s, i) => (
            <path
              key={s.id}
              ref={(el) => {
                sectorRefs.current[i] = el;
              }}
              d={TRACK_D}
              className={`imap__sector ${activeSector === s.id ? "is-active" : ""}`}
              stroke={s.color}
            />
          ))}
        </g>

        {/* alvos de hover dos setores (invisíveis, mais largos) */}
        {SECTORS.map((s, i) => (
          <path
            key={`hit-${s.id}`}
            ref={(el) => {
              hitRefs.current[i] = el;
            }}
            d={TRACK_D}
            className="imap__sector--hit"
            onMouseEnter={() => setActiveSector(s.id)}
            onMouseLeave={() => setActiveSector(null)}
          />
        ))}

        {/* carros */}
        {GRID.map((car, i) => (
          <g
            key={car.n}
            ref={(el) => {
              carRefs.current[i] = el;
            }}
          >
            {i === 0 && <circle className="imap__marker-halo" r="4.6" />}
            <circle r="2.5" fill={car.color} stroke="#0B0D10" strokeWidth="0.8" />
          </g>
        ))}

        {/* pontos de interesse */}
        {poiPts.map((pt) => {
          const poi = POIS.find((p) => p.id === pt.id)!;
          const isActive = activePoi?.id === poi.id;
          return (
            <g
              key={poi.id}
              data-poi={poi.id}
              className={`imap__poi ${isActive ? "is-active" : ""}`}
              tabIndex={0}
              role="button"
              aria-label={`${poi.name}. ${poi.desc}`}
              transform={`translate(${pt.x} ${pt.y})`}
              onMouseEnter={(e) => showTip(poi, e.currentTarget)}
              onMouseLeave={clear}
              onFocus={(e) => showTip(poi, e.currentTarget)}
              onBlur={clear}
            >
              <circle r="9" fill="transparent" />
              <circle className="imap__poi-ring" r="5.5" />
              <circle className="imap__poi-dot" r="2.6" />
            </g>
          );
        })}
      </svg>

      {/* tooltip em HTML */}
      {activePoi && tip && (
        <div className="imap__tip" style={{ left: tip.left, top: tip.top }} role="status">
          <p className="imap__tip-name">{activePoi.name}</p>
          <p className="imap__tip-meta">INTERLAGOS · SP</p>
          <p className="imap__tip-desc">{activePoi.desc}</p>
        </div>
      )}

      {/* legenda / seleção de setor */}
      <div className="imap__legend">
        {SECTORS.map((s) => (
          <button
            key={s.id}
            type="button"
            className={activeSector === s.id ? "is-active" : ""}
            onMouseEnter={() => setActiveSector(s.id)}
            onMouseLeave={() => setActiveSector(null)}
            onFocus={() => setActiveSector(s.id)}
            onBlur={() => setActiveSector(null)}
            onClick={() => setActiveSector((v) => (v === s.id ? null : s.id))}
          >
            <i style={{ background: s.color }} />
            {s.name.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
