import { useEffect, useRef } from "react";

/**
 * Camada de transmissão do Hero — chip AO VIVO, volta/líder/gap, telemetria e
 * tempos de setor. É o que dá a sensação de "corrida acontecendo agora".
 *
 * Ticker próprio e isolado: atualiza o DOM por ref, sem setState, para não
 * re-renderizar o Hero a cada frame (§7 do CLAUDE.md).
 *
 * ⚠️ Valores são de demonstração — não vêm de cronometragem real.
 */

const pad = (n: number) => String(n).padStart(2, "0");

export default function RaceHud({ className = "" }: { className?: string }) {
  const el = useRef<Record<string, HTMLSpanElement | HTMLDivElement | null>>({});

  useEffect(() => {
    let lap = 12;
    let tick = 0;
    const set = (k: string, v: string) => {
      const n = el.current[k];
      if (n) n.textContent = v;
    };

    const id = setInterval(() => {
      tick++;
      // ciclo de ~26s por volta, com trechos "em curva" (mais lento)
      const phase = (tick % 210) / 210;
      const cornering = phase > 0.18 && phase < 0.32;
      const rpm = Math.round((cornering ? 6400 : 8500) + Math.sin(tick / 3) * 320);
      const kmh = Math.round((cornering ? 118 : 224) + Math.sin(tick / 5) * 9);
      const gap = (0.42 + Math.abs(Math.sin(tick / 22)) * 1.1).toFixed(3);
      const sector = phase < 1 / 3 ? 1 : phase < 2 / 3 ? 2 : 3;

      if (phase < 0.005) lap = (lap % 24) + 1;

      set("lap", `${pad(lap)} / 24`);
      set("gap", `+${gap}`);
      set("rpm", rpm.toLocaleString("pt-BR"));
      set("kmh", String(kmh));
      set("sector", `SETOR ${sector}`);
      set("stime", (22 + sector * 0.6 + (tick % 90) / 10).toFixed(3));
      set("drs", cornering ? "OFF" : "ATIVADO");

      const bar = el.current.rpmbar as HTMLDivElement | null;
      if (bar) bar.style.width = `${Math.round((rpm / 9200) * 100)}%`;
      const drs = el.current.drs as HTMLSpanElement | null;
      if (drs) drs.style.color = cornering ? "#8B94A3" : "#14D19A";
    }, 120);

    return () => clearInterval(id);
  }, []);

  const ref = (k: string) => (n: HTMLSpanElement | HTMLDivElement | null) => {
    el.current[k] = n;
  };

  return (
    <div className={`pointer-events-none font-mono ${className}`}>
      {/* AO VIVO */}
      <div className="absolute top-0 left-0 flex items-center gap-2">
        <span className="flex items-center gap-1.5 bg-race-red text-ivory text-[10px] tracking-[0.2em] px-2 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-ivory led-pulse" />
          AO VIVO
        </span>
        <span className="text-[10px] tracking-[0.2em] text-steel">GP INTERLAGOS · SP</span>
      </div>

      {/* volta / líder / gap / DRS */}
      <div className="absolute top-0 right-0 text-right text-[10px] tracking-[0.18em] leading-relaxed">
        <div className="flex justify-end gap-3">
          <span className="text-steel">VOLTA</span>
          <span ref={ref("lap")} className="text-ivory tabular-nums w-[54px]">12 / 24</span>
        </div>
        <div className="flex justify-end gap-3">
          <span className="text-steel">LÍDER</span>
          <span className="text-race-red w-[54px]">CAR 07</span>
        </div>
        <div className="flex justify-end gap-3">
          <span className="text-steel">GAP</span>
          <span ref={ref("gap")} className="text-ivory tabular-nums w-[54px]">+0.842</span>
        </div>
        <div className="flex justify-end gap-3">
          <span className="text-steel">DRS</span>
          <span ref={ref("drs")} className="tabular-nums w-[54px] text-[#14D19A]">ATIVADO</span>
        </div>
      </div>

      {/* telemetria */}
      <div className="absolute bottom-0 right-0 glass-panel px-4 py-3 w-[240px]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] tracking-[0.18em] text-ivory">TELEMETRIA · CAR 07</span>
          <span className="flex items-center gap-1.5 text-[9px] text-[#14D19A]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#14D19A] led-pulse" />
            LIVE
          </span>
        </div>
        <div className="flex justify-between text-[10px] mb-1">
          <span className="text-steel">RPM</span>
          <span ref={ref("rpm")} className="text-ivory tabular-nums">8.540</span>
        </div>
        <div className="h-1.5 bg-asphalt border border-steel-line mb-2.5 overflow-hidden">
          <div
            ref={ref("rpmbar")}
            className="h-full bg-gradient-to-r from-[#14D19A] via-electric-blue to-race-red transition-[width] duration-150"
            style={{ width: "82%" }}
          />
        </div>
        <div className="flex justify-between text-[10px]">
          <span className="text-steel">KM/H</span>
          <span ref={ref("kmh")} className="text-ivory tabular-nums text-base leading-none">224</span>
        </div>
      </div>

      {/* setor corrente */}
      <div className="absolute bottom-0 left-0 glass-panel px-3 py-2 text-[10px]">
        <span ref={ref("sector")} className="text-electric-blue tracking-[0.2em]">SETOR 1</span>
        <span className="text-steel mx-2">·</span>
        <span ref={ref("stime")} className="text-ivory tabular-nums">23.451</span>
      </div>
    </div>
  );
}
