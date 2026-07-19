import { useEffect, useState } from "react";

export function useCountdown(target: Date) {
  const [left, setLeft] = useState(target.getTime() - Date.now());
  useEffect(() => {
    const id = setInterval(() => setLeft(target.getTime() - Date.now()), 1000);
    return () => clearInterval(id);
    // target vem de uma string estável (data fixa); recriar o Date a cada
    // render não deve reiniciar o intervalo, então dependemos só do timestamp.
  }, [target.getTime()]);
  const clamp = Math.max(left, 0);
  return {
    days: Math.floor(clamp / 86400000),
    hours: Math.floor((clamp % 86400000) / 3600000),
    minutes: Math.floor((clamp % 3600000) / 60000),
    seconds: Math.floor((clamp % 60000) / 1000),
  };
}

/**
 * Painel "PRÓXIMA ETAPA" — isolado num componente próprio para que o tique de
 * 1s NÃO re-renderize o Hero inteiro (o que interrompia a animação de saída da
 * tela de largada). Aqui só este bloco re-renderiza a cada segundo.
 */
export function CountdownPanel({
  target,
  round,
  track,
}: {
  target: Date;
  round: string;
  track: string;
}) {
  const { days, hours, minutes, seconds } = useCountdown(target);
  const cells: [string, number][] = [
    ["DIAS", days],
    ["HORAS", hours],
    ["MIN", minutes],
    ["SEG", seconds],
  ];
  return (
    <div className="glass-panel max-w-md">
      <div className="flex items-center justify-between px-4 py-2 border-b border-steel-line">
        <span className="font-mono text-[10px] tracking-[0.28em] text-electric-blue">PRÓXIMA ETAPA</span>
        <span className="font-mono text-[10px] tracking-widest text-steel">
          R{round} · {track}
        </span>
      </div>
      <div className="grid grid-cols-4 divide-x divide-steel-line">
        {cells.map(([label, val]) => (
          <div key={label} className="px-2 py-4 text-center">
            <div className="font-display font-semibold text-3xl md:text-4xl text-ivory tabular-nums leading-none">
              {String(val).padStart(2, "0")}
            </div>
            <div className="font-mono text-[9px] tracking-[0.2em] text-steel mt-2">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** ETA compacto para o HUD de telemetria, também isolado do Hero. */
export function HudEta({ target }: { target: Date }) {
  const { days, hours } = useCountdown(target);
  return (
    <span className="text-race-red">
      {days}D {String(hours).padStart(2, "0")}H
    </span>
  );
}
