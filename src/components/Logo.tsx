/**
 * Logo Paddock 22 — marca com traçado de circuito + wordmark empilhado
 * ("22" sobre "PADDOCK"), conforme o manual de identidade visual.
 * `variant="compact"` renderiza a versão "P22" para espaços reduzidos.
 */
export default function Logo({
  variant = "full",
  className = "",
}: {
  variant?: "full" | "compact";
  className?: string;
}) {
  if (variant === "compact") {
    return (
      <span className={`font-display font-bold tracking-tight text-ivory ${className}`}>
        P<span className="text-race-red">22</span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <TrackMark className="w-9 h-9 shrink-0" />
      <span className="leading-none">
        <span className="block font-display font-semibold text-[0.7em] tracking-[0.35em] text-race-red">22</span>
        <span className="block font-display font-bold tracking-[0.12em] text-ivory text-[1.35em] leading-[0.85]">
          PADDOCK
        </span>
      </span>
    </span>
  );
}

/** Silhueta estilizada de circuito — traçado próprio, não é um autódromo real. */
export function TrackMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      <path
        d="M14 44 C6 40 6 28 16 26 C24 24 26 32 34 30 C46 27 40 14 50 14 C60 14 60 30 50 34 C42 37 40 30 32 32 C22 34 26 46 16 46 C13 46 13.5 44.4 14 44 Z"
        stroke="var(--color-ivory)"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* marca de largada/chegada */}
      <rect x="46" y="10" width="4" height="10" fill="var(--color-race-red)" />
    </svg>
  );
}
